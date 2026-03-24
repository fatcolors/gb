import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  icon?: ReactNode
  children?: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-lg border transition-colors duration-150 cursor-pointer whitespace-nowrap',
        size === 'md' && 'px-4 py-2.5 text-sm leading-5',
        size === 'sm' && 'px-3 py-2 text-sm leading-5',
        variant === 'primary' &&
          'bg-brand-600 border-brand-600 text-white hover:bg-brand-700 shadow-card',
        variant === 'secondary' &&
          'bg-white border-brand-50 text-brand-700 hover:bg-brand-25 shadow-card',
        variant === 'ghost' &&
          'bg-transparent border-transparent text-brand-700 hover:bg-brand-25',
        className
      )}
      {...props}
    >
      {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  )
}
