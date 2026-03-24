import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface DonutChartProps {
  data: { name: string; value: number; color: string }[]
  centerLabel?: string
  centerValue?: string
  size?: number
  innerRadius?: number
  outerRadius?: number
}

export default function DonutChart({
  data,
  centerLabel,
  centerValue,
  size = 200,
  innerRadius = 60,
  outerRadius = 85,
}: DonutChartProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            strokeWidth={2}
            stroke="#fff"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && (
            <span className="text-xs text-brand-300">{centerLabel}</span>
          )}
          {centerValue && (
            <span className="text-xl font-semibold text-brand-800">{centerValue}</span>
          )}
        </div>
      )}
    </div>
  )
}
