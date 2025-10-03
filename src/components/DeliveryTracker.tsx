import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, RefreshCw } from "lucide-react";

interface DeliveryRecord {
  id: string;
  participantName: string;
  email: string;
  eventName: string;
  status: "delivered" | "pending" | "bounced" | "failed";
  sentAt: string;
  deliveredAt?: string;
}

const mockData: DeliveryRecord[] = [
  {
    id: "CERT-ABC123",
    participantName: "Alice Johnson",
    email: "alice@example.com",
    eventName: "Web Development Workshop",
    status: "delivered",
    sentAt: "2024-03-15 10:30 AM",
    deliveredAt: "2024-03-15 10:31 AM",
  },
  {
    id: "CERT-DEF456",
    participantName: "Bob Smith",
    email: "bob@example.com",
    eventName: "Data Science Summit",
    status: "pending",
    sentAt: "2024-03-15 11:45 AM",
  },
  {
    id: "CERT-GHI789",
    participantName: "Carol Williams",
    email: "carol@invalid.com",
    eventName: "Design Thinking Session",
    status: "bounced",
    sentAt: "2024-03-15 09:15 AM",
  },
  {
    id: "CERT-JKL012",
    participantName: "David Brown",
    email: "david@example.com",
    eventName: "AI & ML Conference",
    status: "delivered",
    sentAt: "2024-03-15 02:20 PM",
    deliveredAt: "2024-03-15 02:21 PM",
  },
  {
    id: "CERT-MNO345",
    participantName: "Eva Martinez",
    email: "eva@example.com",
    eventName: "Blockchain Basics",
    status: "failed",
    sentAt: "2024-03-15 03:30 PM",
  },
];

const statusConfig = {
  delivered: { label: "Delivered", className: "bg-green-500/10 text-green-600 hover:bg-green-500/20" },
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20" },
  bounced: { label: "Bounced", className: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20" },
  failed: { label: "Failed", className: "bg-red-500/10 text-red-600 hover:bg-red-500/20" },
};

export const DeliveryTracker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredData = mockData.filter((record) => {
    const matchesSearch =
      record.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Delivery Tracking</h2>
          <p className="text-muted-foreground">
            Monitor certificate delivery status in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or certificate ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="bounced">Bounced</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Certificate ID</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead>Delivered At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">{record.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.participantName}</p>
                      <p className="text-sm text-muted-foreground">{record.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{record.eventName}</TableCell>
                  <TableCell>
                    <Badge className={statusConfig[record.status].className}>
                      {statusConfig[record.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{record.sentAt}</TableCell>
                  <TableCell className="text-sm">
                    {record.deliveredAt || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No records found</p>
          </div>
        )}
      </Card>
    </div>
  );
};
