import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  badge?: number
}

export default function PageHeader({ title, description, actions, badge }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold leading-8 text-brand-800">{title}</h1>
          {badge !== undefined && (
            <span className="bg-error-100 text-error-700 text-sm font-medium px-2.5 py-0.5 rounded-2xl">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-brand-300 leading-5">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  )
}
