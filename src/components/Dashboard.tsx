
import { OptionData } from "@/lib/types";
import { mockData } from "@/lib/mock-data";
import PCRChart from "./PCRChart";
import IVDiffChart from "./IVDiffChart";
import SignalChart from "./SignalChart";
import KeyMetrics from "./KeyMetrics";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <KeyMetrics data={mockData} />
      
      <div className="grid grid-cols-2 gap-6">
        <PCRChart data={mockData} />
        <IVDiffChart data={mockData} />
      </div>
      
      <SignalChart data={mockData} />
    </div>
  );
};

export default Dashboard;
