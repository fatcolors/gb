import { useState, useRef, useEffect, useMemo } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  isWithinInterval,
} from 'date-fns'

interface DateRangePickerProps {
  startDate?: string
  endDate?: string
  onChange?: (start: string, end: string) => void
}

function CalendarMonth({
  month,
  rangeStart,
  rangeEnd,
  hoverDate,
  onDateClick,
  onDateHover,
}: {
  month: Date
  rangeStart: Date | null
  rangeEnd: Date | null
  hoverDate: Date | null
  onDateClick: (d: Date) => void
  onDateHover: (d: Date | null) => void
}) {
  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
    const rows: Date[][] = []
    let day = start
    while (!isAfter(day, end)) {
      const week: Date[] = []
      for (let i = 0; i < 7; i++) {
        week.push(day)
        day = addDays(day, 1)
      }
      rows.push(week)
    }
    return rows
  }, [month])

  const effectiveEnd = rangeEnd || hoverDate

  return (
    <div className="w-[260px]">
      <div className="text-sm font-semibold text-brand-800 text-center mb-3">
        {format(month, 'MMMM yyyy')}
      </div>
      <div className="grid grid-cols-7 mb-1">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <div key={d} className="text-xs text-brand-300 text-center py-1 font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {weeks.flat().map((day, i) => {
          const inMonth = isSameMonth(day, month)
          const isStart = rangeStart && isSameDay(day, rangeStart)
          const isEnd = effectiveEnd && isSameDay(day, effectiveEnd)
          const inRange =
            rangeStart &&
            effectiveEnd &&
            !isBefore(effectiveEnd, rangeStart) &&
            isWithinInterval(day, { start: rangeStart, end: effectiveEnd })
          const isEdge = isStart || isEnd

          return (
            <button
              key={i}
              onClick={() => inMonth && onDateClick(day)}
              onMouseEnter={() => inMonth && onDateHover(day)}
              onMouseLeave={() => onDateHover(null)}
              className={`
                h-8 text-sm border-none cursor-pointer transition-colors
                ${!inMonth ? 'text-brand-50 cursor-default' : ''}
                ${inMonth && !isEdge && !inRange ? 'text-brand-800 hover:bg-brand-25' : ''}
                ${inRange && !isEdge ? 'bg-brand-25 text-brand-800' : ''}
                ${isEdge ? 'bg-brand-600 text-white' : ''}
                ${isStart && !isEnd ? 'rounded-l-full' : ''}
                ${isEnd && !isStart ? 'rounded-r-full' : ''}
                ${isStart && isEnd ? 'rounded-full' : ''}
                ${inRange && !isEdge && i % 7 === 0 ? 'rounded-l-md' : ''}
                ${inRange && !isEdge && i % 7 === 6 ? 'rounded-r-md' : ''}
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function DateRangePicker({
  startDate = '2025-02-15',
  endDate = '2025-03-15',
  onChange,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [rangeStart, setRangeStart] = useState<Date | null>(new Date(startDate))
  const [rangeEnd, setRangeEnd] = useState<Date | null>(new Date(endDate))
  const [selecting, setSelecting] = useState(false)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [leftMonth, setLeftMonth] = useState(() => startOfMonth(new Date(startDate)))
  const ref = useRef<HTMLDivElement>(null)

  const rightMonth = addMonths(leftMonth, 1)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSelecting(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleDateClick(day: Date) {
    if (!selecting) {
      setRangeStart(day)
      setRangeEnd(null)
      setSelecting(true)
    } else {
      if (rangeStart && isBefore(day, rangeStart)) {
        setRangeEnd(rangeStart)
        setRangeStart(day)
      } else {
        setRangeEnd(day)
      }
      setSelecting(false)
    }
  }

  function handleApply() {
    if (rangeStart && rangeEnd) {
      onChange?.(format(rangeStart, 'yyyy-MM-dd'), format(rangeEnd, 'yyyy-MM-dd'))
    }
    setOpen(false)
  }

  const displayStart = rangeStart ? format(rangeStart, 'yyyy-MM-dd') : startDate
  const displayEnd = rangeEnd ? format(rangeEnd, 'yyyy-MM-dd') : endDate

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-brand-50 rounded-lg text-base text-brand-800 shadow-card cursor-pointer hover:border-brand-300 transition-colors"
      >
        <span>{displayStart} - {displayEnd}</span>
        <Calendar className="w-5 h-5 text-brand-300" />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-brand-50 rounded-xl shadow-lg p-5 z-50">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setLeftMonth(subMonths(leftMonth, 1))}
              className="p-1 rounded-md hover:bg-brand-25 border-none bg-transparent cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-brand-300" />
            </button>
            <div className="flex-1" />
            <button
              onClick={() => setLeftMonth(addMonths(leftMonth, 1))}
              className="p-1 rounded-md hover:bg-brand-25 border-none bg-transparent cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-brand-300" />
            </button>
          </div>

          <div className="flex gap-6">
            <CalendarMonth
              month={leftMonth}
              rangeStart={rangeStart}
              rangeEnd={selecting ? null : rangeEnd}
              hoverDate={selecting ? hoverDate : null}
              onDateClick={handleDateClick}
              onDateHover={setHoverDate}
            />
            <div className="w-px bg-brand-50" />
            <CalendarMonth
              month={rightMonth}
              rangeStart={rangeStart}
              rangeEnd={selecting ? null : rangeEnd}
              hoverDate={selecting ? hoverDate : null}
              onDateClick={handleDateClick}
              onDateHover={setHoverDate}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-brand-50">
            <button
              onClick={() => { setOpen(false); setSelecting(false) }}
              className="px-4 py-2 text-sm font-medium text-brand-300 bg-transparent border border-brand-50 rounded-lg hover:bg-brand-25 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!rangeStart || !rangeEnd}
              className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 border-none rounded-lg hover:bg-brand-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
