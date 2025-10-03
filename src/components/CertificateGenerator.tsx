import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CertificatePreview } from "./CertificatePreview";
import { Upload, Download, Send, FileText } from "lucide-react";
import { toast } from "sonner";

export const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    participantName: "John Doe",
    eventName: "Web Development Masterclass",
    eventDate: "2024-03-15",
    organizerName: "EventEye Academy",
  });

  const [bulkMode, setBulkMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    toast.success("Certificate generated successfully!", {
      description: "You can now download or send it to the participant.",
    });
  };

  const handleBulkUpload = () => {
    toast.info("Bulk upload feature", {
      description: "Upload a CSV file with participant details to generate certificates in bulk.",
    });
  };

  const handleSend = () => {
    toast.success("Certificate sent!", {
      description: `Email sent to ${formData.participantName}`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Certificate Generator</h2>
        <p className="text-muted-foreground">
          Create personalized certificates for your event participants
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="glass-card p-6 space-y-6 h-fit">
          <div className="flex gap-2">
            <Button
              variant={!bulkMode ? "default" : "outline"}
              className="flex-1"
              onClick={() => setBulkMode(false)}
            >
              <FileText className="h-4 w-4" />
              Single
            </Button>
            <Button
              variant={bulkMode ? "default" : "outline"}
              className="flex-1"
              onClick={() => setBulkMode(true)}
            >
              <Upload className="h-4 w-4" />
              Bulk Upload
            </Button>
          </div>

          {!bulkMode ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="participantName">Participant Name</Label>
                <Input
                  id="participantName"
                  value={formData.participantName}
                  onChange={(e) => handleInputChange("participantName", e.target.value)}
                  placeholder="Enter participant name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  value={formData.eventName}
                  onChange={(e) => handleInputChange("eventName", e.target.value)}
                  placeholder="Enter event name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange("eventDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizerName">Organizer Name</Label>
                <Input
                  id="organizerName"
                  value={formData.organizerName}
                  onChange={(e) => handleInputChange("organizerName", e.target.value)}
                  placeholder="Enter organizer name"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="gradient" className="flex-1" onClick={handleGenerate}>
                  <Download className="h-4 w-4" />
                  Generate
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4 hover:border-primary transition-smooth cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-medium">Upload CSV File</p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to browse
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>CSV Format</Label>
                <Textarea
                  readOnly
                  value="name,email,event,date,organizer\nJohn Doe,john@example.com,Workshop,2024-03-15,EventEye\nJane Smith,jane@example.com,Conference,2024-03-16,EventEye"
                  className="font-mono text-xs"
                  rows={4}
                />
              </div>

              <Button variant="gradient" className="w-full" onClick={handleBulkUpload}>
                <Upload className="h-4 w-4" />
                Process Bulk Upload
              </Button>
            </div>
          )}
        </Card>

        {/* Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Live Preview</h3>
            <Badge className="gradient-accent text-accent-foreground">Real-time</Badge>
          </div>
          <CertificatePreview
            participantName={formData.participantName}
            eventName={formData.eventName}
            eventDate={new Date(formData.eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            organizerName={formData.organizerName}
          />
        </div>
      </div>
    </div>
  );
};
