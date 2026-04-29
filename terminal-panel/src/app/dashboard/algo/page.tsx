import { CodeBlock } from "@/components/code-block";

const pineCode = `//@version=5
strategy("BETrader V6 Skeleton", overlay=true, initial_capital=100000)
emaFast = ta.ema(close, 21)
emaSlow = ta.ema(close, 55)
longSignal = ta.crossover(emaFast, emaSlow)
if longSignal
    strategy.entry("Long", strategy.long)
`;

const pythonCode = `import pandas as pd

def risk_position_size(capital: float, risk_pct: float, stop_distance: float) -> float:
    risk_amount = capital * risk_pct
    return risk_amount / stop_distance

print(risk_position_size(1_000_000, 0.01, 2.5))
`;

export default function AlgoPage() {
  return (
    <>
      <section className="panel-card">
        <h3>BETrader ALGO & V6 Kod Arşivi</h3>
        <p>
          Bu bölüm yalnızca yetkili kullanıcılar içindir. Kodları kopyalayıp kendi
          test ortamlarınızda çalıştırabilirsiniz.
        </p>
      </section>
      <CodeBlock title="Pine Script - V6 Iskeleti" language="pine" code={pineCode} />
      <CodeBlock title="Python - Risk Motoru Yardımcısı" language="python" code={pythonCode} />
    </>
  );
}
