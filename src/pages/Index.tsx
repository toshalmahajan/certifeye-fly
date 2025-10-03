import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { DeliveryTracker } from "@/components/DeliveryTracker";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "generator":
        return <CertificateGenerator />;
      case "tracking":
        return <DeliveryTracker />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
