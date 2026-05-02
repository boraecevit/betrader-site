"use client";

import { useEffect, useMemo, useState } from "react";
import { MarketSessionStrip } from "@/components/market-session-strip";

type ClockItem = {
  label: string;
  timeZone: string;
};

const clocks: ClockItem[] = [
  { label: "New York", timeZone: "America/New_York" },
  { label: "Londra", timeZone: "Europe/London" },
  { label: "İstanbul", timeZone: "Europe/Istanbul" }
];

export function StatusBar() {
  const [now, setNow] = useState<Date | null>(null);
  const isReady = now !== null;

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formattedClocks = useMemo(
    () =>
      clocks.map((clock) => ({
        ...clock,
        time: new Intl.DateTimeFormat("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: clock.timeZone
        }).format(now ?? new Date(0))
      })),
    [now]
  );

  return (
    <section className="status-bar" aria-label="Sistem durum çubuğu">
      <p className="status-left">
        SİSTEM: GÜVENLİ | ŞİFRELEME: AKTİF |{" "}
        <MarketSessionStrip now={now ?? new Date()} />
      </p>
      <div className="status-right">
        {formattedClocks.map((clock) => (
          <span key={clock.label}>
            {clock.label}: {isReady ? clock.time : "--:--:--"}
          </span>
        ))}
      </div>
    </section>
  );
}
