
import { OptionData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";

interface IVDiffChartProps {
  data: OptionData[];
}

const IVDiffChart = ({ data }: IVDiffChartProps) => {
  const latestData = data.length > 0 ? data[data.length - 1] : null;
  const ivDiff = latestData ? latestData.iv_diff : 0;
  const ivDiffColor = ivDiff > 0 ? "text-yellow-400" : "text-blue-400";
  const ivDiffStatus = ivDiff > 0 ? "Call IV > Put IV (Bearish Signal)" : "Call IV ≤ Put IV (No Signal)";
  
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          IV Difference (Call - Put)
        </CardTitle>
        <div className="flex items-center">
          <div className={`text-sm font-bold ${ivDiffColor}`}>
            {ivDiffStatus}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold font-mono">{ivDiff.toFixed(2)}%</div>
          <div className="text-xs text-muted-foreground">
            <span className="text-muted-foreground">Call IV - Put IV (270 days)</span>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={{ stroke: '#4b5563' }}
                tickFormatter={(value) => value.substring(5)}
              />
              <YAxis 
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={{ stroke: '#4b5563' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#374151', 
                  borderColor: '#4b5563',
                  color: '#f9fafb',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                }} 
                formatter={(value: any) => [`${value.toFixed(2)}%`, "IV Difference"]}
              />
              <Bar 
                dataKey="iv_diff" 
                fill={(entry) => entry.iv_diff > 0 ? "#ec4899" : "#3b82f6"}
              />
              <Line 
                type="monotone" 
                dataKey={() => 0} 
                stroke="#6b7280" 
                strokeDasharray="3 3"
                dot={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Pink: Call IV {`>`} Put IV (Bearish)</span>
          <span>Blue: Put IV {`>`} Call IV (Bullish)</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default IVDiffChart;

