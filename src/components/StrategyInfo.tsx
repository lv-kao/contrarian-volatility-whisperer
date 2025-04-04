
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const StrategyInfo = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Contrarian Volatility Strategy Explanation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">Strategy Formula</h3>
            <div className="bg-slate-800 p-4 rounded-md font-mono text-sm mb-4">
              trade_when(pcr_oi_270 {'<'} 0.7, (implied_volatility_call_270 - implied_volatility_put_270), -1)
            </div>
            
            <h3 className="font-bold text-lg text-primary mb-2">Strategy Summary</h3>
            <p className="text-muted-foreground mb-2">
              This is a contrarian volatility strategy that takes a bearish position when:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
              <li>The market sentiment is overly bullish (Put/Call Ratio {'<'} 0.7)</li>
              <li>Call options have higher implied volatility than put options</li>
            </ol>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">Key Components Explained</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-yellow-400">pcr_oi_270 {'<'} 0.7</h4>
                <p className="text-muted-foreground ml-4">
                  Put/Call Ratio (Open Interest) measures market sentiment by comparing bearish (puts) vs. bullish (calls) positions.
                </p>
                <p className="text-muted-foreground ml-4 mt-1">
                  When PCR is below 0.7, it indicates strong bullish sentiment, potentially signaling market overoptimism.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-green-400">(IV_call_270 - IV_put_270)</h4>
                <p className="text-muted-foreground ml-4">
                  This measures the difference between implied volatility of call options vs. put options with 270 days to expiration.
                </p>
                <p className="text-muted-foreground ml-4 mt-1">
                  When call IV exceeds put IV, the market expects more upside volatility risk, which often occurs near market tops.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-red-500">-1 (Signal)</h4>
                <p className="text-muted-foreground ml-4">
                  Taking a short position (-1) when the conditions are met, betting against the prevailing bullish sentiment.
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">Trading Logic</h3>
            <p className="text-muted-foreground">
              This strategy implements a contrarian approach to market sentiment and volatility skew:
            </p>
            
            <div className="mt-2 space-y-2 text-muted-foreground ml-4">
              <p>
                <span className="font-bold">1.</span> When the market is highly optimistic (low PCR), there's potential for disappointment and reversal.
              </p>
              <p>
                <span className="font-bold">2.</span> When call options have higher implied volatility than puts (positive IV difference), it suggests 
                traders are paying a premium for upside exposure, often seen near market tops.
              </p>
              <p>
                <span className="font-bold">3.</span> The combination of these factors creates a potential setup for disappointment, triggering a SELL signal.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">Implementation Notes</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Strategy uses 270-day options for more stable signals</li>
              <li>Best applied to broad market indices or highly liquid ETFs</li>
              <li>Consider combining with price action confirmation</li>
              <li>Typically used for medium-term positions (weeks to months)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyInfo;
