
import { OptionData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, AlertTriangle } from "lucide-react";

interface KeyMetricsProps {
  data: OptionData[];
}

const KeyMetrics = ({ data }: KeyMetricsProps) => {
  const latestData = data.length > 0 ? data[data.length - 1] : null;
  
  if (!latestData) {
    return null;
  }
  
  // Status indicators
  const pcrActive = latestData.pcr_oi_270 < 0.7;
  const ivDiffPositive = latestData.iv_diff > 0;
  const sellSignalActive = latestData.signal === -1;
  
  return (
    <Card className="col-span-2">
      <CardContent className="p-6">
        <div className="text-lg font-medium mb-4">Strategy Status</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col space-y-2 p-4 bg-secondary rounded-lg">
            <div className="text-sm text-muted-foreground">PCR Condition</div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold font-mono">
                {latestData.pcr_oi_270.toFixed(2)}
              </span>
              <div className={`flex items-center ${pcrActive ? 'text-yellow-400' : 'text-blue-400'}`}>
                {pcrActive ? (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Active {'<'} 0.7</span>
                  </>
                ) : (
                  <span className="text-xs font-medium">Inactive</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 p-4 bg-secondary rounded-lg">
            <div className="text-sm text-muted-foreground">IV Difference</div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold font-mono">
                {latestData.iv_diff > 0 ? "+" : ""}{latestData.iv_diff.toFixed(2)}%
              </span>
              <div className={`flex items-center ${ivDiffPositive ? 'text-yellow-400' : 'text-blue-400'}`}>
                {ivDiffPositive ? (
                  <>
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Call {'>'} Put</span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Call {'<'} Put</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 p-4 bg-secondary rounded-lg">
            <div className="text-sm text-muted-foreground">Signal</div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold font-mono">
                {sellSignalActive ? "SELL" : "HOLD"}
              </span>
              <div className={`flex items-center ${sellSignalActive ? 'text-red-500' : 'text-blue-400'}`}>
                {sellSignalActive ? (
                  <>
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Bearish</span>
                  </>
                ) : (
                  <span className="text-xs font-medium">Neutral</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <div className="text-sm font-medium mb-2">Strategy Formula:</div>
          <div className="font-mono text-xs bg-slate-900 p-2 rounded">
            <span className="text-blue-400">trade_when</span>
            <span className="text-white">(</span>
            <span className="text-yellow-400">pcr_oi_270 {'<'} 0.7</span>
            <span className="text-white">, </span>
            <span className="text-green-400">(implied_volatility_call_270 - implied_volatility_put_270)</span>
            <span className="text-white">, </span>
            <span className="text-red-500">-1</span>
            <span className="text-white">)</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            When PCR {'<'} 0.7 (market is bullish), go short when call IV is greater than put IV
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyMetrics;
