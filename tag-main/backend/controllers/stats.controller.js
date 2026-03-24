import { broadcastStats, getStatsCache } from "../lib/statsBroadcaster.js";
import sequelize from "../lib/db.js";
import { QueryTypes } from "sequelize";

export const getStats = async (req, res) => {
  try {
    await broadcastStats(false); 
    const data = await getStatsCache();
    res.status(200).json(data); 
  } catch (error) {
    console.error("Stats Controller Error:", error);
    res.status(500).json({ message: "Error" });
  }
};

export const getPostgresStats = async (req, res) => {
  try {
    const dbName =
      (sequelize.config && sequelize.config.database) ? sequelize.config.database : null;

    const [
      statStatements,
      statDatabase,
      statActivity,
      waitEvents,
      bloatCandidates,
      replicationLagRow,
    ] = await Promise.all([
      sequelize
        .query(
          `
          SELECT
            SUM(total_time) AS total_time_ms,
            SUM(calls) AS total_calls
          FROM pg_stat_statements
        `,
          { type: QueryTypes.SELECT }
        )
        .catch(() => []),
      sequelize
        .query(
          `
          SELECT
            SUM(blks_hit) AS blks_hit,
            SUM(blks_read) AS blks_read,
            SUM(xact_commit) AS xact_commit,
            SUM(xact_rollback) AS xact_rollback,
            MIN(stats_reset) AS stats_reset
          FROM pg_stat_database
          WHERE datname = :dbName
             OR :dbName IS NULL
        `,
          {
            type: QueryTypes.SELECT,
            replacements: { dbName },
          }
        )
        .catch(() => []),
      sequelize
        .query(
          `
          SELECT
            SUM(CASE WHEN state = 'active' THEN 1 ELSE 0 END) AS active,
            SUM(CASE WHEN state <> 'active' OR state IS NULL THEN 1 ELSE 0 END) AS idle
          FROM pg_stat_activity
          WHERE datname = :dbName
        `,
          {
            type: QueryTypes.SELECT,
            replacements: { dbName },
          }
        )
        .catch(() => []),
      sequelize
        .query(
          `
          SELECT
            COALESCE(wait_event_type || ':' || wait_event, 'NONE') AS event,
            COUNT(*) AS count
          FROM pg_stat_activity
          WHERE datname = :dbName
            AND wait_event IS NOT NULL
          GROUP BY COALESCE(wait_event_type || ':' || wait_event, 'NONE')
          ORDER BY count DESC
          LIMIT 5
        `,
          {
            type: QueryTypes.SELECT,
            replacements: { dbName },
          }
        )
        .catch(() => []),
      sequelize
        .query(
          `
          SELECT
            schemaname,
            relname,
            n_live_tup,
            n_dead_tup,
            CASE
              WHEN n_live_tup + n_dead_tup = 0 THEN 0
              ELSE n_dead_tup::decimal / (n_live_tup + n_dead_tup)
            END AS dead_tuple_ratio
          FROM pg_stat_user_tables
          WHERE n_dead_tup > 0
          ORDER BY dead_tuple_ratio DESC
          LIMIT 5
        `,
          { type: QueryTypes.SELECT }
        )
        .catch(() => []),
      sequelize
        .query(
          `
          SELECT
            CASE
              WHEN COUNT(*) = 0 THEN NULL
              ELSE MAX(pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn))
            END AS lag_bytes
          FROM pg_stat_replication
        `,
          { type: QueryTypes.SELECT }
        )
        .catch(() => []),
    ]);

    const stmt = Array.isArray(statStatements) && statStatements[0] ? statStatements[0] : {};
    const db = Array.isArray(statDatabase) && statDatabase[0] ? statDatabase[0] : {};
    const activity = Array.isArray(statActivity) && statActivity[0] ? statActivity[0] : {};
    const repl = Array.isArray(replicationLagRow) && replicationLagRow[0] ? replicationLagRow[0] : {};

    const totalTimeMs = Number(stmt.total_time_ms) || 0;
    const totalCalls = Number(stmt.total_calls) || 0;
    const meanExecTimeMs = totalCalls > 0 ? totalTimeMs / totalCalls : null;

    const blksHit = Number(db.blks_hit) || 0;
    const blksRead = Number(db.blks_read) || 0;
    const sharedBufferHitRatio =
      blksHit + blksRead > 0 ? blksHit / (blksHit + blksRead) : null;

    const xactCommit = Number(db.xact_commit) || 0;
    const xactRollback = Number(db.xact_rollback) || 0;
    const totalXacts = xactCommit + xactRollback;
    const statsReset = db.stats_reset ? new Date(db.stats_reset) : null;
    let transactionThroughputTps = null;
    if (statsReset && !Number.isNaN(statsReset.getTime())) {
      const secondsSinceReset = (Date.now() - statsReset.getTime()) / 1000;
      if (secondsSinceReset > 0 && totalXacts > 0) {
        transactionThroughputTps = totalXacts / secondsSinceReset;
      }
    }

    const activeConnections = Number(activity.active) || 0;
    const idleConnections = Number(activity.idle) || 0;

    const lagBytes =
      repl && repl.lag_bytes !== null && repl.lag_bytes !== undefined
        ? Number(repl.lag_bytes)
        : null;

    res.status(200).json({
      essential: {
        meanExecTimeMs,
        totalCalls,
        sharedBufferHitRatio,
        transactionThroughputTps,
      },
      deepHealth: {
        activeConnections,
        idleConnections,
        waitEvents: Array.isArray(waitEvents) ? waitEvents : [],
        tableBloat: Array.isArray(bloatCandidates) ? bloatCandidates : [],
        replicationLagBytes: lagBytes,
        replicationLagMb: lagBytes !== null ? lagBytes / (1024 * 1024) : null,
      },
      meta: {
        database: dbName,
        statsReset: statsReset ? statsReset.toISOString() : null,
      },
    });
  } catch (error) {
    console.error("Postgres Stats Error:", error);
    res.status(500).json({ message: "Failed to load Postgres stats" });
  }
};
