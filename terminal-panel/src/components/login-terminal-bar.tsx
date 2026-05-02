"use client";

import { useEffect, useMemo, useState } from "react";
import { MarketSessionStrip } from "@/components/market-session-strip";

const IST_TZ = "Europe/Istanbul";

function formatIstanbulClock(at: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(at);
  const map = Object.fromEntries(
    parts.filter((p) => p.type !== "literal").map((p) => [p.type, p.value])
  );
  return `${map.hour}:${map.minute}:${map.second}`;
}

export function LoginTerminalBar() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const id = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const now = useMemo(() => new Date(), [tick]);
  const clock = mounted ? formatIstanbulClock(now) : "–:–:–";

  return (
    <div className="login-terminal-bar">
      <div className="login-terminal-bar-markets">
        <MarketSessionStrip now={now} />
      </div>
      <time className="login-terminal-bar-clock" dateTime={now.toISOString()} suppressHydrationWarning>
        IST {clock}
      </time>
    </div>
  );
}
