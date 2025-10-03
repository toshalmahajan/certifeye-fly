import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface CertificatePreviewProps {
  participantName?: string;
  eventName?: string;
  eventDate?: string;
  organizerName?: string;
}

export const CertificatePreview = ({
  participantName = "John Doe",
  eventName = "Web Development Masterclass",
  eventDate = "March 15, 2024",
  organizerName = "EventEye Academy",
}: CertificatePreviewProps) => {
  const certificateId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <Card className="glass-card p-8 max-w-4xl mx-auto">
      <div className="relative border-8 border-accent/20 rounded-xl p-12 bg-gradient-to-br from-background to-muted/30">
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-accent rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-accent rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-accent rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-accent rounded-br-lg" />

        <div className="text-center space-y-8">
          {/* Header */}
          <div className="flex justify-center">
            <div className="gradient-primary p-4 rounded-full shadow-glow">
              <Award className="h-16 w-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Badge className="gradient-accent text-accent-foreground px-4 py-1 text-sm">
              Certificate of Achievement
            </Badge>
            <h2 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
              {participantName}
            </h2>
          </div>

          {/* Body */}
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg text-muted-foreground">
              Has successfully completed
            </p>
            <h3 className="text-3xl font-semibold text-foreground">
              {eventName}
            </h3>
            <p className="text-muted-foreground">
              Awarded on {eventDate}
            </p>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-6">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Organized by</p>
              <p className="font-semibold text-lg">{organizerName}</p>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <QRCodeSVG
                  value={`https://eventeye.com/verify/${certificateId}`}
                  size={80}
                  level="H"
                  className="border-2 border-border rounded-lg p-1 bg-background"
                />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Certificate ID</p>
                <p className="text-sm font-mono font-semibold">{certificateId}</p>
                <p className="text-xs text-primary">Scan to verify</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
