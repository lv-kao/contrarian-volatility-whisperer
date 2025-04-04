
import { ArrowLeftRight, BarChart2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center py-4 px-6 border-b border-slate-800">
      <div className="flex items-center space-x-2">
        <ArrowLeftRight className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Contrarian Volatility Whisperer</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="strategy" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Strategy Info</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Header;
