import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

// --- Configuration ---
const BASE_URL = "https://www.okx.com";
const API_KEY = process.env.ULTRON_API_KEY!;
const API_SECRET = process.env.ULTRON_API_SECRET!;
const PASSPHRASE = process.env.ULTRON_PASSPHRASE!;
const ALGO_ID = process.env.ULTRON_ALGO_ID!;

// Cache for hourly updates
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// --- Helper: OKX Signature ---
function generateSignature(timestamp: string, method: string, requestPath: string, body: string = "") {
  const message = timestamp + method + requestPath + body;
  const hmac = CryptoJS.HmacSHA256(message, API_SECRET);
  return CryptoJS.enc.Base64.stringify(hmac);
}

async function fetchOkx(path: string) {
  const timestamp = new Date().toISOString(); // UTC format
  const method = "GET";
  const sign = generateSignature(timestamp, method, path);

  const headers = {
    "OK-ACCESS-KEY": API_KEY,
    "OK-ACCESS-SIGN": sign,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": PASSPHRASE,
    "Content-Type": "application/json",
    "x-simulated-trading": "0",
  };

  const res = await fetch(BASE_URL + path, { headers });
  if (!res.ok) throw new Error(`OKX API Error: ${res.statusText}`);
  const data = await res.json();
  if (data.code !== "0") throw new Error(`OKX Error: ${data.msg}`);
  return data.data;
}

// --- Main Logic ---
export async function GET() {
  try {
    // Check cache first (hourly refresh)
    const now = Date.now();
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
      console.log('[Ultron API] Serving from cache');
      return NextResponse.json(cachedData);
    }

    console.log('[Ultron API] Fetching fresh data from OKX...');

    // 1. Fetch History concurrently for speed (increased limits for more data)
    const [positions, events, btcHistory] = await Promise.all([
      fetchOkx(`/api/v5/tradingBot/signal/positions-history?algoId=${ALGO_ID}&limit=500`),
      fetchOkx(`/api/v5/tradingBot/signal/event-history?algoId=${ALGO_ID}&limit=500`),
      fetchOkx(`/api/v5/market/history-candles?instId=BTC-USDT-SWAP&bar=1D&limit=500`),
    ]);

    // DEBUG: Log raw data
    console.log('[Ultron API] Total positions fetched:', positions?.length || 0);
    console.log('[Ultron API] Total events fetched:', events?.length || 0);
    console.log('[Ultron API] Sample position data:', positions?.[0]);
    console.log('[Ultron API] Sample event data:', events?.[0]);

    // 2. Process Data for Charts
    // Format BTC Data (Comparison Baseline)
    const btcData = btcHistory.reverse().map((candle: any) => ({
      timestamp: parseInt(candle[0]),
      date: new Date(parseInt(candle[0])).toISOString().split('T')[0],
      price: parseFloat(candle[4]), // Close price
    }));

    // Sort positions by close time (uTime)
    // All positions returned by positions-history are closed positions
    const sortedPositions = positions
      .filter((p: any) => p.uTime && p.pnlRatio) // Has close time and PnL
      .sort((a: any, b: any) => parseInt(a.uTime) - parseInt(b.uTime));

    console.log('[Ultron API] Closed positions with uTime:', sortedPositions.length);
    console.log('[Ultron API] Sample closed position:', sortedPositions[0]);

    // Find the earliest trade to determine when Ultron started
    const firstTradeTime = sortedPositions.length > 0 ? parseInt(sortedPositions[0].cTime) : btcData[0].timestamp;
    console.log('[Ultron API] First trade timestamp:', firstTradeTime, 'Date:', new Date(firstTradeTime).toISOString());

    // Find BTC price at the time Ultron started trading
    let startBtcPrice = btcData[0].price;
    for (let i = 0; i < btcData.length; i++) {
      if (btcData[i].timestamp >= firstTradeTime) {
        startBtcPrice = btcData[i].price;
        break;
      }
    }
    console.log('[Ultron API] Starting BTC price:', startBtcPrice);

    // Use positions data (they have pnlRatio which is what we need)
    const tradeData = sortedPositions;

    console.log('[Ultron API] Using trade data from: positions');
    console.log('[Ultron API] Total trade data points:', tradeData.length);

    let currentNav = 1.0;
    let tradeIndex = 0;

    // Build full equity curve
    const fullChartData = btcData.map((day: any) => {
      // Apply all trade PnLs that closed on or before this day
      while (
        tradeIndex < tradeData.length &&
        parseInt(tradeData[tradeIndex].uTime) <= day.timestamp
      ) {
        const trade = tradeData[tradeIndex];
        const pnl = parseFloat(trade.pnlRatio);
        if (tradeIndex < 5) { // Only log first 5 trades to avoid spam
          console.log(`[Ultron API] Trade ${tradeIndex}: PnL = ${pnl} (${(pnl * 100).toFixed(2)}%), Date = ${new Date(parseInt(trade.uTime)).toISOString()}`);
        }
        currentNav = currentNav * (1 + pnl);
        tradeIndex++;
      }

      return {
        date: day.date,
        ultronNav: currentNav,
        btcNav: day.price / startBtcPrice, // Normalize BTC to start at 1.0 when Ultron started
        timestamp: day.timestamp,
      };
    });

    // Filter to only show data from when Ultron started trading
    const chartData = fullChartData.filter((d: any) => d.timestamp >= firstTradeTime);

    console.log('[Ultron API] Chart data points:', chartData.length);
    console.log('[Ultron API] First chart point - Ultron NAV:', chartData[0]?.ultronNav, 'BTC NAV:', chartData[0]?.btcNav);
    console.log('[Ultron API] Final NAV:', currentNav);

    // 3. Calculate Metrics
    const totalDays = chartData.length;
    const finalNav = chartData[chartData.length - 1].ultronNav;

    // CAGR calculation
    const cagr = Math.pow(finalNav, 365 / totalDays) - 1;

    // Calculate Max Drawdown for Ultron
    let peak = -Infinity;
    let maxDrawdown = 0;
    chartData.forEach((d: { date: string; ultronNav: number; btcNav: number }) => {
      if (d.ultronNav > peak) peak = d.ultronNav;
      const dd = (peak - d.ultronNav) / peak;
      if (dd > maxDrawdown) maxDrawdown = dd;
    });

    // Calculate daily returns for Sharpe Ratio
    const dailyReturns: number[] = [];
    for (let i = 1; i < chartData.length; i++) {
      const dailyReturn = (chartData[i].ultronNav - chartData[i - 1].ultronNav) / chartData[i - 1].ultronNav;
      dailyReturns.push(dailyReturn);
    }

    // Calculate Sharpe Ratio (annualized)
    const avgDailyReturn = dailyReturns.reduce((sum, r) => sum + r, 0) / dailyReturns.length;
    const variance = dailyReturns.reduce((sum, r) => sum + Math.pow(r - avgDailyReturn, 2), 0) / dailyReturns.length;
    const stdDev = Math.sqrt(variance);
    const annualizedReturn = avgDailyReturn * 365;
    const annualizedVolatility = stdDev * Math.sqrt(365);
    const riskFreeRate = 0.04; // 4% risk-free rate
    const sharpe = (annualizedReturn - riskFreeRate) / annualizedVolatility;

    // Calculate Calmar Ratio
    const calmar = maxDrawdown > 0 ? cagr / maxDrawdown : 0;

    // Calculate win rate from trade data
    const winningTrades = tradeData.filter((t: any) => parseFloat(t.pnlRatio) > 0).length;
    const totalTrades = tradeData.length;
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

    console.log(`[Ultron API] Win Rate: ${winningTrades}/${totalTrades} = ${winRate.toFixed(2)}%`);

    const result = {
      chartData,
      metrics: {
        cagr: (cagr * 100).toFixed(1) + "%",
        maxDrawdown: "-" + (maxDrawdown * 100).toFixed(1) + "%",
        sharpe: sharpe.toFixed(2),
        calmar: calmar.toFixed(2),
        runningDays: totalDays,
        winRate: winRate.toFixed(2) + "%",
        totalTrades: totalTrades,
      }
    };

    // Update cache
    cachedData = result;
    lastFetchTime = now;

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('[Ultron API Error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}