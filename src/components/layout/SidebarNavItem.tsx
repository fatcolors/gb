import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SidebarNavItemProps {
  label: string
  icon: LucideIcon
  path: string
  badge?: number
  active?: boolean
  collapsed?: boolean
}

export default function SidebarNavItem({ label, icon: Icon, path, badge, active, collapsed }: SidebarNavItemProps) {
  if (collapsed) {
    return (
      <Link
        to={path}
        title={label}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150',
          active
            ? 'bg-brand-25 shadow-card'
            : 'hover:bg-brand-25/50'
        )}
      >
        <Icon className="w-5 h-5 text-brand-600" />
      </Link>
    )
  }

  return (
    <Link
      to={path}
      className={cn(
        'flex items-center justify-between h-12 px-3.5 py-2 rounded-xl transition-all duration-150',
        active
          ? 'bg-brand-25 shadow-card'
          : 'hover:bg-brand-25/50'
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-brand-600" />
        <span
          className={cn(
            'text-base text-brand-600 whitespace-nowrap',
            active ? 'font-medium' : 'font-normal'
          )}
        >
          {label}
        </span>
      </div>
      {badge !== undefined && (
        <span className="bg-error-50 text-error-700 text-xs font-medium px-2 py-0.5 rounded-2xl">
          {badge}
        </span>
      )}
    </Link>
  )
}
