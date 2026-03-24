import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { systemApi, SystemLog } from "@/api/modules/system";
import { toast } from "sonner";
import { Loader2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SystemContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [isLogsLoading, setIsLogsLoading] = useState(false);

  const fetchLogs = async () => {
    setIsLogsLoading(true);
    try {
      const res = await systemApi.getLogs();
      if (res.success) {
        setLogs(res.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setIsLogsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handlePurgeCache = async () => {
    setIsLoading(true);
    try {
      const res = await systemApi.purgeCache();
      if (res.success) {
        toast.success("Cache purged successfully via Cloudflare");
        fetchLogs(); // Refresh logs to show the new action
      } else {
        toast.error("Failed to purge cache: " + res.message);
      }
    } catch (error: any) {
      toast.error("Error purging cache: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Manage system-level configurations and maintenance.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cloudflare Cache Management</CardTitle>
          <CardDescription>
            Purge the entire Cloudflare cache for this zone. Use this when you've deployed critical updates that aren't reflecting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              variant="destructive" 
              onClick={handlePurgeCache} 
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Purging Cache...
                </>
              ) : (
                "Clear Cache"
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              Action will be logged with your admin ID.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>System Action Logs</CardTitle>
            <CardDescription>History of system-level actions performed by admins.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchLogs} disabled={isLogsLoading}>
            <RefreshCw className={`h-4 w-4 ${isLogsLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No logs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">
                        {new Date(log.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{log.admin_email}</span>
                          <span className="text-xs text-muted-foreground">{log.admin_id}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === "SUCCESS" ? "default" : "destructive"}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.ip_address}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemContent;
