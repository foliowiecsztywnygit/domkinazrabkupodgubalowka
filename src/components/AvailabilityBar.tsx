import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { createBookingWidgetUrl, getDefaultBookingDates } from "@/data/site-content";

const weekdayLabels = ["pon", "wt", "sr", "czw", "pt", "sob", "niedz"] as const;

const monthFormatter = new Intl.DateTimeFormat("pl-PL", {
  month: "long",
  year: "numeric",
});

const parseDateValue = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const formatDisplayDate = (value: string) => {
  const date = parseDateValue(value);
  return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
};

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const addDaysToValue = (value: string, days: number) => formatDateValue(addDays(parseDateValue(value), days));

const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const isSameMonth = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();

const buildCalendarDays = (viewDate: Date) => {
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const firstWeekdayOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const gridStartDate = addDays(firstDayOfMonth, -firstWeekdayOffset);

  return Array.from({ length: 42 }, (_, index) => addDays(gridStartDate, index));
};

type BookingDatePickerProps = {
  label: string;
  value: string;
  min: string;
  onChange: (value: string) => void;
};

function BookingDatePicker({ label, value, min, onChange }: BookingDatePickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selectedDate = useMemo(() => parseDateValue(value), [value]);
  const minDate = useMemo(() => parseDateValue(min), [min]);
  const todayDate = useMemo(() => {
    const { arrival } = getDefaultBookingDates();
    return parseDateValue(arrival);
  }, []);
  const [viewDate, setViewDate] = useState(selectedDate);
  const calendarDays = useMemo(() => buildCalendarDays(viewDate), [viewDate]);

  useEffect(() => {
    setViewDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const pickDate = (date: Date) => {
    if (date < minDate) {
      return;
    }

    onChange(formatDateValue(date));
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="availability-bar__input availability-bar__input--trigger flex w-full items-center justify-between gap-3 text-left"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{formatDisplayDate(value)}</span>
        <CalendarDays size={18} strokeWidth={1.7} className="shrink-0 text-[var(--color-accent)]" />
      </button>

      {open ? (
        <div
          className="absolute left-0 top-[calc(100%+0.6rem)] z-30 w-[min(100vw-3rem,21rem)] rounded-[1.5rem] border border-[rgba(221,182,111,0.22)] bg-[linear-gradient(180deg,rgba(27,17,13,0.98),rgba(17,11,9,0.98))] p-4 shadow-[0_26px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          role="dialog"
          aria-label={`${label} kalendarz`}
        >
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(221,182,111,0.18)] bg-white/[0.04] text-[var(--color-cream)] transition hover:bg-white/[0.08]"
              aria-label="Poprzedni miesiąc"
              onClick={() => setViewDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
            >
              <ChevronLeft size={18} />
            </button>
            <p className="text-sm font-semibold capitalize tracking-[0.08em] text-[var(--color-cream)]">{monthFormatter.format(viewDate)}</p>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(221,182,111,0.18)] bg-white/[0.04] text-[var(--color-cream)] transition hover:bg-white/[0.08]"
              aria-label="Następny miesiąc"
              onClick={() => setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(255,243,226,0.54)]">
            {weekdayLabels.map((dayLabel) => (
              <span key={dayLabel}>{dayLabel}</span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              const disabled = day < minDate;
              const selected = isSameDay(day, selectedDate);
              const today = isSameDay(day, todayDate);
              const outsideMonth = !isSameMonth(day, viewDate);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => pickDate(day)}
                  className={cn(
                    "inline-flex h-10 items-center justify-center rounded-[0.95rem] border text-sm font-semibold transition",
                    selected && "border-[rgba(233,197,134,0.42)] bg-[linear-gradient(180deg,#8c6437_0%,#6f4b27_100%)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]",
                    !selected && !disabled && "border-transparent bg-white/[0.03] text-[var(--color-cream)] hover:border-[rgba(221,182,111,0.2)] hover:bg-white/[0.07]",
                    today && !selected && "border-[rgba(221,182,111,0.28)] text-[var(--color-accent)]",
                    outsideMonth && !selected && "text-[rgba(255,243,226,0.34)]",
                    disabled && "cursor-not-allowed border-transparent bg-transparent text-[rgba(255,243,226,0.18)]",
                  )}
                  aria-label={`Wybierz ${formatDisplayDate(formatDateValue(day))}`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[rgba(221,182,111,0.14)] pt-4">
            <button
              type="button"
              className="text-sm font-medium text-[rgba(255,243,226,0.72)] transition hover:text-[var(--color-cream)]"
              onClick={() => pickDate(todayDate < minDate ? minDate : todayDate)}
            >
              Dzisiaj
            </button>
            <button
              type="button"
              className="text-sm font-medium text-[var(--color-accent)] transition hover:text-[var(--color-cream)]"
              onClick={() => setOpen(false)}
            >
              Zamknij
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type AvailabilityBarProps = {
  variant?: "hero" | "contact";
};

export function AvailabilityBar({ variant = "hero" }: AvailabilityBarProps) {
  const defaultDates = useMemo(() => getDefaultBookingDates(), []);
  const [arrival, setArrival] = useState(defaultDates.arrival);
  const [departure, setDeparture] = useState(defaultDates.departure);
  const [guests, setGuests] = useState("2");
  const minDeparture = useMemo(() => addDaysToValue(arrival, 1), [arrival]);
  const availabilityHref = useMemo(
    () =>
      createBookingWidgetUrl({
        header: 1,
        arrival,
        departure,
        guests,
      }),
    [arrival, departure, guests],
  );

  useEffect(() => {
    if (!departure || departure < minDeparture) {
      setDeparture(addDaysToValue(arrival, 2));
    }
  }, [arrival, departure, minDeparture]);

  return (
    <div className={cn("availability-bar", variant === "contact" && "availability-bar--contact")}>
      <label className="availability-bar__field">
        <span>Przyjazd</span>
        <BookingDatePicker label="Przyjazd" value={arrival} min={defaultDates.arrival} onChange={setArrival} />
      </label>

      <label className="availability-bar__field">
        <span>Wyjazd</span>
        <BookingDatePicker label="Wyjazd" value={departure} min={minDeparture} onChange={setDeparture} />
      </label>

      <label className="availability-bar__field">
        <span>Goście</span>
        <select aria-label="Goście" value={guests} onChange={(event) => setGuests(event.target.value)} className="availability-bar__input">
          {[1, 2, 3, 4, 5, 6].map((guestCount) => (
            <option key={guestCount} value={guestCount}>
              {guestCount}
            </option>
          ))}
        </select>
      </label>

      <a
        href={availabilityHref}
        target="_blank"
        rel="noreferrer"
        className={cn("availability-bar__submit", variant === "contact" && "availability-bar__submit--contact")}
      >
        <CalendarDays size={18} strokeWidth={1.7} />
        <span>Sprawdź wolny termin</span>
      </a>
    </div>
  );
}
