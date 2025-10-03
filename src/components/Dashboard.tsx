import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Send, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <Card className="glass-card p-6 transition-smooth hover:shadow-lg">
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-xs text-primary flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {change}
        </p>
      </div>
      <div className="gradient-primary p-3 rounded-lg text-white">
        {icon}
      </div>
    </div>
  </Card>
);

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Certificates",
      value: "12,485",
      change: "+18% from last month",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Delivered",
      value: "11,892",
      change: "95.2% success rate",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Pending",
      value: "421",
      change: "Processing...",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Sent Today",
      value: "2,847",
      change: "+24% from yesterday",
      icon: <Send className="h-6 w-6" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Certificate Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage your certificate delivery system
          </p>
        </div>
        <Button variant="gradient" size="lg">
          <Send className="h-5 w-5" />
          New Batch
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};
