import { cn } from '../../lib/utils'

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex flex-col items-center justify-center h-10 cursor-pointer bg-transparent border-none',
            )}
          >
            <span
              className={cn(
                'px-1 pb-4 text-sm font-semibold leading-5 whitespace-nowrap',
                activeTab === tab.id ? 'text-brand-700' : 'text-brand-300'
              )}
            >
              {tab.label}
            </span>
            <div
              className={cn(
                'h-0.5 w-full',
                activeTab === tab.id ? 'bg-orange-500' : 'bg-transparent'
              )}
            />
          </button>
        ))}
      </div>
      <div className="h-px bg-brand-50" />
    </div>
  )
}
