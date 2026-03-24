-- Migration: Fix FK constraints on Users table + add ownership transfer columns
-- Run once on production database.

DO $$
DECLARE
    r RECORD;
BEGIN

    -- =========================================================
    -- PART 1: Fix FK constraints referencing "Users"
    -- =========================================================

    -- ---- CommunityForums.creator_id -> SET NULL --------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'CommunityForums' AND kcu.column_name = 'creator_id'
    LOOP EXECUTE 'ALTER TABLE "CommunityForums" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "CommunityForums" ALTER COLUMN "creator_id" DROP NOT NULL;
    ALTER TABLE "CommunityForums" ADD CONSTRAINT "CommunityForums_creator_id_fkey"
        FOREIGN KEY ("creator_id") REFERENCES "Users"("id") ON DELETE SET NULL;

    -- ---- Comments.user_id -> SET NULL --------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'Comments' AND kcu.column_name = 'user_id'
    LOOP EXECUTE 'ALTER TABLE "Comments" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "Comments" ALTER COLUMN "user_id" DROP NOT NULL;
    ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL;

    -- ---- communities.created_by -> SET NULL ------------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'communities' AND kcu.column_name = 'created_by'
    LOOP EXECUTE 'ALTER TABLE "communities" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "communities" ALTER COLUMN "created_by" DROP NOT NULL;
    ALTER TABLE "communities" ADD CONSTRAINT "communities_created_by_fkey"
        FOREIGN KEY ("created_by") REFERENCES "Users"("id") ON DELETE SET NULL;

    -- ---- community_messages.user_id -> SET NULL -------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'community_messages' AND kcu.column_name = 'user_id'
    LOOP EXECUTE 'ALTER TABLE "community_messages" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "community_messages" ADD CONSTRAINT "community_messages_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL;

    -- ---- VideoGuides.submittedBy -> SET NULL ----------------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'VideoGuides' AND kcu.column_name = 'submittedBy'
    LOOP EXECUTE 'ALTER TABLE "VideoGuides" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "VideoGuides" ADD CONSTRAINT "VideoGuides_submittedBy_fkey"
        FOREIGN KEY ("submittedBy") REFERENCES "Users"("id") ON DELETE SET NULL;

    -- ---- PersonalMessages.sender_id -> SET NULL ---------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'PersonalMessages' AND kcu.column_name = 'sender_id'
    LOOP EXECUTE 'ALTER TABLE "PersonalMessages" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "PersonalMessages" ALTER COLUMN "sender_id" DROP NOT NULL;
    ALTER TABLE "PersonalMessages" ADD CONSTRAINT "PersonalMessages_sender_id_fkey"
        FOREIGN KEY ("sender_id") REFERENCES "Users"("id") ON DELETE SET NULL;

    -- ---- support_chat_messages.sender_id -> SET NULL ------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'support_chat_messages' AND kcu.column_name = 'sender_id'
    LOOP EXECUTE 'ALTER TABLE "support_chat_messages" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "support_chat_messages" ADD CONSTRAINT "support_chat_messages_sender_id_fkey"
        FOREIGN KEY ("sender_id") REFERENCES "Users"("id") ON DELETE SET NULL;

    -- ---- FAQs.created_by -> SET NULL --------------------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'FAQs' AND kcu.column_name = 'created_by'
    LOOP EXECUTE 'ALTER TABLE "FAQs" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "FAQs" ADD CONSTRAINT "FAQs_created_by_fkey"
        FOREIGN KEY ("created_by") REFERENCES "Users"("id") ON DELETE SET NULL;

    -- ---- community_members.user_id -> CASCADE -----------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'community_members' AND kcu.column_name = 'user_id'
    LOOP EXECUTE 'ALTER TABLE "community_members" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "community_members" ADD CONSTRAINT "community_members_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE;

    -- ---- ConversationParticipants.user_id -> CASCADE ----------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'ConversationParticipants' AND kcu.column_name = 'user_id'
    LOOP EXECUTE 'ALTER TABLE "ConversationParticipants" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "ConversationParticipants" ADD CONSTRAINT "ConversationParticipants_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE;

    -- ---- support_members.user_id -> CASCADE -------------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'support_members' AND kcu.column_name = 'user_id'
    LOOP EXECUTE 'ALTER TABLE "support_members" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "support_members" ADD CONSTRAINT "support_members_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE;

    -- ---- support_chats.initiated_by -> SET NULL ----------------------------------
    FOR r IN SELECT tc.constraint_name FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'support_chats' AND kcu.column_name = 'initiated_by'
    LOOP EXECUTE 'ALTER TABLE "support_chats" DROP CONSTRAINT "' || r.constraint_name || '"'; END LOOP;
    ALTER TABLE "support_chats" ADD CONSTRAINT "support_chats_initiated_by_fkey"
        FOREIGN KEY ("initiated_by") REFERENCES "Users"("id") ON DELETE SET NULL;

    -- =========================================================
    -- PART 2: Add ownership transfer columns
    -- =========================================================

    -- CommunityForums
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='CommunityForums' AND column_name='is_ownership_transferred') THEN
        ALTER TABLE "CommunityForums" ADD COLUMN "is_ownership_transferred" BOOLEAN NOT NULL DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='CommunityForums' AND column_name='original_owner_name') THEN
        ALTER TABLE "CommunityForums" ADD COLUMN "original_owner_name" VARCHAR(255);
    END IF;

    -- Comments
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Comments' AND column_name='is_ownership_transferred') THEN
        ALTER TABLE "Comments" ADD COLUMN "is_ownership_transferred" BOOLEAN NOT NULL DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Comments' AND column_name='original_owner_name') THEN
        ALTER TABLE "Comments" ADD COLUMN "original_owner_name" VARCHAR(255);
    END IF;

    -- communities
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='communities' AND column_name='is_ownership_transferred') THEN
        ALTER TABLE "communities" ADD COLUMN "is_ownership_transferred" BOOLEAN NOT NULL DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='communities' AND column_name='original_owner_name') THEN
        ALTER TABLE "communities" ADD COLUMN "original_owner_name" VARCHAR(255);
    END IF;

    -- community_messages
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='community_messages' AND column_name='is_ownership_transferred') THEN
        ALTER TABLE "community_messages" ADD COLUMN "is_ownership_transferred" BOOLEAN NOT NULL DEFAULT false;
    END IF;

    -- VideoGuides
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='VideoGuides' AND column_name='is_ownership_transferred') THEN
        ALTER TABLE "VideoGuides" ADD COLUMN "is_ownership_transferred" BOOLEAN NOT NULL DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='VideoGuides' AND column_name='original_owner_name') THEN
        ALTER TABLE "VideoGuides" ADD COLUMN "original_owner_name" VARCHAR(255);
    END IF;

END $$;