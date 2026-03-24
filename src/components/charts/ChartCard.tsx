import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export default function ChartCard({ title, subtitle, actions, children, className }: ChartCardProps) {
  return (
    <div className={`bg-white border border-brand-50 rounded-2xl p-5 ${className || ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-brand-800 leading-6">{title}</h3>
          {subtitle && <p className="text-xs text-brand-300 mt-0.5">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  )
}
