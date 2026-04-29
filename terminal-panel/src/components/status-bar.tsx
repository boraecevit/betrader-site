"use client";

import { useEffect, useMemo, useState } from "react";

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

  const bistStatus = useMemo(() => {
    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: "Europe/Istanbul"
    }).format(now ?? new Date(0));

    const timeParts = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul"
    }).formatToParts(now ?? new Date(0));

    const hour = Number(timeParts.find((part) => part.type === "hour")?.value || "0");
    const minute = Number(timeParts.find((part) => part.type === "minute")?.value || "0");
    const totalMinutes = hour * 60 + minute;
    const isWeekday = weekday !== "Sat" && weekday !== "Sun";
    const isOpenSession = totalMinutes >= 9 * 60 + 40 && totalMinutes <= 18 * 60 + 10;
    const isOpen = isWeekday && isOpenSession;

    return {
      isOpen,
      label: isOpen ? "AÇIK" : "KAPALI"
    };
  }, [now]);

  return (
    <section className="status-bar" aria-label="Sistem durum çubuğu">
      <p className="status-left">
        SİSTEM: GÜVENLİ | ŞİFRELEME: AKTİF |{" "}
        <span className={`status-market ${bistStatus.isOpen ? "open" : "closed"}`}>
          BIST: {isReady ? bistStatus.label : "--"}
          <span className="status-dot" aria-hidden="true" />
        </span>
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
