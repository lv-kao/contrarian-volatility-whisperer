
import { OptionData } from "./types";
import { format, subDays } from "date-fns";

// Generate mock data for the last 60 days
export const generateMockData = (): OptionData[] => {
  const data: OptionData[] = [];
  const today = new Date();

  for (let i = 60; i >= 0; i--) {
    const date = subDays(today, i);
    const formattedDate = format(date, "yyyy-MM-dd");
    
    // Generate realistic-looking values
    const pcr_oi_270 = 0.4 + Math.random() * 0.8; // Between 0.4 and 1.2
    const iv_call_270 = 20 + Math.random() * 15; // Between 20 and 35
    const iv_put_270 = 15 + Math.random() * 15; // Between 15 and 30
    const iv_diff = iv_call_270 - iv_put_270;
    
    // Base price starts at 100
    const previousPrice = i < 60 ? data[60 - i - 1].close_price : 100;
    const priceChange = (Math.random() - 0.45) * 2; // Slight downward bias
    const close_price = parseFloat((previousPrice * (1 + priceChange / 100)).toFixed(2));
    
    // Determine signal based on our strategy
    let signal = 0;
    if (pcr_oi_270 < 0.7) {
      signal = iv_diff > 0 ? -1 : 0; // Sell signal if IV difference is positive
    }
    
    data.push({
      date: formattedDate,
      symbol: "SPY",
      pcr_oi_270,
      iv_call_270,
      iv_put_270,
      iv_diff,
      signal,
      close_price
    });
  }
  
  return data;
};

export const mockData = generateMockData();
