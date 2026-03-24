import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-brand-50 rounded-2xl p-5',
        className
      )}
    >
      {children}
    </div>
  )
}
