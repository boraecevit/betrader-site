"use client";

import { useEffect, useMemo, useState } from "react";
import { isBistSessionOpen } from "@/lib/market-clock";

type MarketSessionStripProps = {
  /** Verilirse dahili saniye interval’i başlatılmaz (ör. LoginTerminalBar tek interval). */
  now?: Date;
};

export function MarketSessionStrip({ now: controlledNow }: MarketSessionStripProps) {
  const internalTick = controlledNow === undefined;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!internalTick) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, [internalTick]);

  const now = useMemo(
    () => (internalTick ? new Date(tick) : controlledNow!),
    [internalTick, tick, controlledNow]
  );

  const bistOpen = isBistSessionOpen(now);
  const dotClass = bistOpen
    ? "login-bist-dot login-bist-dot--open"
    : "login-bist-dot login-bist-dot--closed";

  return (
    <span className="market-session-strip">
      <span className="market-session-seg">
        <span className={dotClass} aria-hidden />
        <span>BIST: {bistOpen ? "AÇIK" : "KAPALI"}</span>
      </span>
    </span>
  );
}
