
import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import StrategyInfo from "@/components/StrategyInfo";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "strategy" && <StrategyInfo />}
      </main>
      
      <footer className="border-t border-slate-800 p-4">
        <div className="container mx-auto text-center text-xs text-muted-foreground">
          Contrarian Volatility Whisperer &copy; {new Date().getFullYear()} - Trading strategies are for educational purposes only
        </div>
      </footer>
    </div>
  );
};

export default Index;
