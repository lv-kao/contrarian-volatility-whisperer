
export interface OptionData {
  date: string;
  symbol: string;
  pcr_oi_270: number;
  iv_call_270: number;
  iv_put_270: number;
  iv_diff: number;
  signal: number; // 1 for buy, -1 for sell, 0 for hold
  close_price: number;
}
