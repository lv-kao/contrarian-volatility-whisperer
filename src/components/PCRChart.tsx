
import { OptionData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PCRChartProps {
  data: OptionData[];
}

const PCRChart = ({ data }: PCRChartProps) => {
  const latestPCR = data.length > 0 ? data[data.length - 1].pcr_oi_270 : 0;
  const pcrStatus = latestPCR < 0.7 ? "Bullish Sentiment (Market Optimistic)" : "Neutral/Bearish Sentiment";
  const pcrStatusColor = latestPCR < 0.7 ? "text-yellow-400" : "text-blue-400";
  
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          Put/Call Ratio (270 Days)
        </CardTitle>
        <div className="flex items-center">
          <div className={`text-sm font-bold ${pcrStatusColor}`}>
            {pcrStatus}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold font-mono">{latestPCR.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">
            <span className={latestPCR < 0.7 ? "text-yellow-400" : "text-blue-400"}>
              {latestPCR < 0.7 ? "Below 0.7 (Strategy Active)" : "Above 0.7 (No Signal)"}
            </span>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="pcrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={{ stroke: '#4b5563' }}
                tickFormatter={(value) => value.substring(5)}
              />
              <YAxis 
                domain={[0.4, 1.2]} 
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
              />
              <Area 
                type="monotone" 
                dataKey="pcr_oi_270" 
                stroke="#3b82f6" 
                fill="url(#pcrGradient)"
              />
              <Line 
                type="monotone" 
                dataKey={() => 0.7} 
                stroke="#fbbf24" 
                strokeDasharray="3 3"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Yellow line indicates PCR threshold (0.7)
        </div>
      </CardContent>
    </Card>
  );
};

export default PCRChart;
