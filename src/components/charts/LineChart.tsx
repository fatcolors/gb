import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from 'recharts'

interface LineChartProps {
  data: Record<string, unknown>[]
  lines: { dataKey: string; color: string; name?: string; areaFill?: boolean }[]
  xAxisKey: string
  height?: number
  showGrid?: boolean
  yAxisFormatter?: (value: number) => string
}

export default function LineChart({
  data,
  lines,
  xAxisKey,
  height = 258,
  showGrid = true,
  yAxisFormatter,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF0" vertical={false} />}
        <XAxis
          dataKey={xAxisKey}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#5C7790' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#5C7790' }}
          tickFormatter={yAxisFormatter}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #E8ECF0',
            boxShadow: '0px 1px 2px rgba(10,13,18,0.05)',
            fontSize: 12,
          }}
        />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: line.color }}
            name={line.name || line.dataKey}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
