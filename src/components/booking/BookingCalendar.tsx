import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface BookingCalendarProps {
  selectedDate: string;
  selectedTimeSlot?: string;
  onSelectDate: (date: string) => void;
  onSelectTimeSlot?: (slot: string) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const { settings } = useSiteConfig();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Days in month
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Mock a few booked/busy dates to simulate realistic availability
  const isBooked = (day: number) => {
    // A couple of weekend dates reserved
    const dateObj = new Date(year, month, day);
    const dayOfWeek = dateObj.getDay();
    // Simulate some Saturdays as booked
    return (dayOfWeek === 6 && (day === 7 || day === 21));
  };

  const isPast = (day: number) => {
    const checkDate = new Date(year, month, day, 23, 59, 59);
    return checkDate < today;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    if (isPast(day) || isBooked(day)) return;
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSelectDate(formattedDate);
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingArray = Array.from({ length: firstDayIndex }, (_, i) => i);

  return (
    <div className="border border-[var(--border-line)] bg-[var(--card-bg)] p-6 sm:p-8 transition-colors">
      {/* Calendar Header with sync notification */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-line)]">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} className="text-[var(--primary-accent)]" />
            <h3 className="text-lg font-editorial font-normal text-[var(--text-main)]">
              Interactive Availability Calendar
            </h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Official availability for weddings, portraits & private commissions
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={month === today.getMonth() && year === today.getFullYear()}
            className="p-2 border border-[var(--border-line)] rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-main)] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Previous Month"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-main)] font-semibold min-w-[130px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 border border-[var(--border-line)] rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-main)] cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center py-3 border-b border-[var(--border-line)] text-[11px] font-mono uppercase text-[var(--text-muted)]">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1.5 pt-3 pb-6">
        {paddingArray.map((_, i) => (
          <div key={`pad-${i}`} className="h-10 sm:h-12" />
        ))}

        {daysArray.map((day) => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;
          const past = isPast(day);
          const booked = isBooked(day);

          let stateClasses = 'hover:border-[var(--text-main)] text-[var(--text-main)] cursor-pointer bg-[var(--bg-surface)]/50';

          if (past) {
            stateClasses = 'text-[var(--text-muted)]/40 opacity-40 cursor-not-allowed bg-transparent';
          } else if (booked) {
            stateClasses = 'text-rose-400/80 bg-rose-500/10 cursor-not-allowed line-through';
          } else if (isSelected) {
            stateClasses = 'bg-[var(--text-main)] text-[var(--bg-base)] font-bold shadow-xs';
          }

          return (
            <button
              key={day}
              type="button"
              disabled={past || booked}
              onClick={() => handleDateClick(day)}
              className={`h-10 sm:h-12 flex flex-col items-center justify-center rounded-sm text-xs font-mono transition-all border border-transparent ${stateClasses}`}
              title={booked ? 'Date already committed for shoot' : past ? 'Past date' : `Select ${dateStr}`}
            >
              <span>{day}</span>
              {isSelected && <span className="w-1 h-1 bg-[var(--primary-accent)] rounded-full mt-0.5" />}
              {booked && <span className="text-[8px] uppercase tracking-tighter text-rose-500 font-sans">Booked</span>}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-line)] text-xs text-[var(--text-muted)] font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[var(--bg-surface)] border border-[var(--border-line)]" />
            <span>Available</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500/20 text-rose-400" />
            <span>Booked / Retained</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[var(--text-main)]" />
            <span>Selected</span>
          </span>
        </div>
        {selectedDate && (
          <div className="text-[var(--text-main)] font-semibold">
            Date chosen: <span className="text-[var(--primary-accent)]">{selectedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};
