
import { OptionData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";

interface SignalChartProps {
  data: OptionData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-chart-tooltip p-2 border border-slate-600 rounded shadow text-xs font-mono">
        <p className="font-semibold">{`Date: ${data.date}`}</p>
        <p className="text-blue-400">{`Price: $${data.close_price?.toFixed(2)}`}</p>
        <p className={data.signal === -1 ? "text-red-400" : data.signal === 1 ? "text-green-400" : "text-gray-400"}>
          {data.signal === -1 ? "SELL Signal" : data.signal === 1 ? "BUY Signal" : "No Signal"}
        </p>
      </div>
    );
  }
  return null;
};

const SignalChart = ({ data }: SignalChartProps) => {
  const latestData = data.length > 0 ? data[data.length - 1] : null;
  const latestSignal = latestData?.signal || 0;
  const statusColor = latestSignal === -1 ? "text-red-500" : latestSignal === 1 ? "text-green-500" : "text-blue-400";
  const signalText = latestSignal === -1 ? "SELL" : latestSignal === 1 ? "BUY" : "HOLD";
  
  // Count active signals in the last 10 days
  const last10Days = data.slice(-10);
  const sellSignals = last10Days.filter(d => d.signal === -1).length;
  
  return (
    <Card className="col-span-2 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Price & Strategy Signals</CardTitle>
        <div className="flex items-center space-x-2">
          <div className={`text-sm font-bold ${statusColor}`}>
            Current: {signalText}
          </div>
          <div className="text-xs text-muted-foreground">
            ({sellSignals} sell signals in last 10 days)
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={{ stroke: '#4b5563' }}
                tickFormatter={(value) => value.substring(5)}
              />
              <YAxis 
                yAxisId="left" 
                domain={['auto', 'auto']} 
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={{ stroke: '#4b5563' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="close_price" 
                stroke="#3b82f6" 
                dot={false}
                strokeWidth={2}
              />
              {data.map((entry, index) => {
                if (entry.signal === -1) {
                  return (
                    <ReferenceLine 
                      key={`ref-${index}`}
                      x={entry.date} 
                      yAxisId="left"
                      stroke="#ef4444" 
                      strokeDasharray="3 3"
                    />
                  );
                }
                return null;
              })}
              {data.map((entry, index) => {
                if (entry.signal === -1) {
                  return (
                    <svg key={`signal-${index}`}>
                      <circle 
                        cx={0} // This will be positioned by recharts
                        cy={0} // This will be positioned by recharts
                        r={5}
                        fill="#ef4444"
                        className="recharts-dot"
                        data-date={entry.date}
                        data-price={entry.close_price}
                        data-signal="sell"
                      />
                    </svg>
                  );
                }
                return null;
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 p-2 bg-secondary rounded">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="text-xs flex items-center">
              <ArrowDown className="h-3 w-3 mr-1 text-red-500" /> 
              <span>Sell Signal (PCR {'<'} 0.7 & IV Diff {'>'} 0)</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-secondary rounded">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="text-xs">Price Movement</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalChart;
