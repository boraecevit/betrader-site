/**
 * BIST piyasa saati — Europe/Istanbul bazlı Intl hesaplama.
 * Kullanıcı yerel saati kullanılmaz.
 */

export const BIST_HOLIDAYS = [
  "01-01",
  "04-23",
  "05-01",
  "05-19",
  "07-15",
  "08-30",
  "10-29"
] as const;

/** Kurban Bayramı kapanış günleri (İstanbul günü). Arife ayrı (yarım gün). */
export const BIST_CLOSED_DATES = [
  "2026-05-27",
  "2026-05-28",
  "2026-05-29",
  "2026-05-30"
] as const;

/** 2026 Kurban arifesi — yarım seans (İstanbul 10:00–12:30, sonra kapalı). */
const BIST_ARIFE_HALF_DAY = "2026-05-26";

const TZ_IST = "Europe/Istanbul";

function getYmdInTz(date: Date, timeZone: string): string {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = dtf.formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value ?? "1970";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d}`;
}

function getMmDdInTz(date: Date, timeZone: string): string {
  const ymd = getYmdInTz(date, timeZone);
  return ymd.slice(5);
}

function getWeekdayShortInTz(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short"
  }).format(date);
}

/** İlgili zaman diliminde günün 00:00’ından itibaren geçen dakika */
function getMinutesSinceMidnightInTz(date: Date, timeZone: string): number {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      hour12: false
    }).format(date)
  );
  const minute = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      minute: "2-digit"
    }).format(date)
  );
  return hour * 60 + minute;
}

function isWeekdayInTz(date: Date, timeZone: string): boolean {
  const w = getWeekdayShortInTz(date, timeZone);
  return w !== "Sat" && w !== "Sun";
}

const BIST_LIST = new Set<string>([...BIST_HOLIDAYS]);
const BIST_CLOSED = new Set<string>([...BIST_CLOSED_DATES]);

export function isBistSessionOpen(at: Date): boolean {
  const ymdIst = getYmdInTz(at, TZ_IST);
  const mmddIst = getMmDdInTz(at, TZ_IST);

  if (BIST_LIST.has(mmddIst)) return false;
  if (BIST_CLOSED.has(ymdIst)) return false;

  if (!isWeekdayInTz(at, TZ_IST)) return false;

  const mins = getMinutesSinceMidnightInTz(at, TZ_IST);

  if (ymdIst === BIST_ARIFE_HALF_DAY) {
    return mins >= 10 * 60 && mins < 12 * 60 + 30;
  }

  return mins >= 10 * 60 && mins < 18 * 60;
}
