import type { LucideIcon } from 'lucide-react'

interface KpiTileProps {
  title: string
  value: string
  icon: LucideIcon
  suffix?: string
}

export default function KpiTile({ title, value, icon: Icon, suffix }: KpiTileProps) {
  return (
    <div className="bg-white border border-brand-50 rounded-2xl p-5 flex-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-brand-300 leading-5 whitespace-nowrap">{title}</p>
          <p className="text-2xl font-semibold text-brand-800 leading-8">
            {value}
            {suffix && <span className="text-sm font-medium ml-1">{suffix}</span>}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-brand-600" />
        </div>
      </div>
    </div>
  )
}
