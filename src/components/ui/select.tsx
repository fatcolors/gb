import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
}

export default function Select({ value, onChange, options, placeholder = 'Select...' }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 4, left: rect.left, width: rect.width })
    }
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (open) {
      updatePosition()
    }
  }, [open, updatePosition])

  const selected = options.find((o) => o.value === value)

  return (
    <div className="relative" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg border bg-white cursor-pointer transition-colors
          ${open ? 'border-brand-500 shadow-[0_0_0_3px_rgba(46,144,250,0.1)]' : 'border-brand-50 hover:border-brand-300'}
          ${selected ? 'text-brand-800' : 'text-brand-300'}
        `}
      >
        <span>{selected ? selected.label : placeholder}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-brand-300 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-brand-300 shrink-0" />
        )}
      </button>

      {open && (
        <div
          className="fixed bg-white border border-brand-50 rounded-xl shadow-lg z-[200] py-1 overflow-hidden"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`
                  w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm cursor-pointer border-none transition-colors
                  ${isSelected ? 'bg-brand-25 text-brand-800 font-medium' : 'bg-white text-brand-800 hover:bg-brand-25'}
                `}
              >
                <div className="flex items-center gap-2">
                  {option.icon && <span className="w-5 h-5 flex items-center justify-center">{option.icon}</span>}
                  <span>{option.label}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
