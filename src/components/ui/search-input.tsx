import { Search } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export default function SearchInput({
  placeholder = 'Search...',
  value,
  onChange,
  className,
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-300" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 text-base text-brand-800 bg-white border border-brand-50 rounded-lg placeholder:text-brand-300 focus:outline-none focus:border-brand-300 transition-colors"
      />
    </div>
  )
}
