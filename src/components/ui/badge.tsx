import { cn } from '../../lib/utils'

type BadgeVariant =
  | 'default'
  | 'bio-fuel'
  | 'mgo'
  | 'lsfo'
  | 'vlsfo'
  | 'hsfo'
  | 'hfo'
  | 'live'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-brand-50 text-brand-700',
  'bio-fuel': 'bg-success-50 text-success-700',
  mgo: 'bg-[#EFF8FF] text-[#175CD3]',
  lsfo: 'bg-orange-500/10 text-orange-600',
  vlsfo: 'bg-[#F0F9FF] text-[#026AA2]',
  hsfo: 'bg-[#FFF6ED] text-[#C4320A]',
  hfo: 'bg-[#FDF2FA] text-[#C11574]',
  live: 'bg-success-50 text-success-700',
  success: 'bg-success-50 text-success-700',
  error: 'bg-error-50 text-error-700',
  warning: 'bg-warning-50 text-warning-700',
  info: 'bg-[#EFF8FF] text-[#175CD3]',
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function getFuelBadgeVariant(fuelType: string): BadgeVariant {
  const type = fuelType.toUpperCase()
  if (type.includes('BIO')) return 'bio-fuel'
  if (type.includes('MGO')) return 'mgo'
  if (type.includes('VLSFO')) return 'vlsfo'
  if (type.includes('LSFO')) return 'lsfo'
  if (type.includes('HSFO')) return 'hsfo'
  if (type.includes('HFO')) return 'hfo'
  if (type.includes('LIVE')) return 'live'
  return 'default'
}
