import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface BarChartProps {
  data: Record<string, unknown>[]
  bars: { dataKey: string; color: string; name?: string }[]
  xAxisKey: string
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  yAxisFormatter?: (value: number) => string
}

export default function BarChart({
  data,
  bars,
  xAxisKey,
  height = 258,
  showGrid = true,
  showLegend = false,
  yAxisFormatter,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} barGap={4}>
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
        {showLegend && <Legend iconType="circle" iconSize={8} />}
        {bars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            fill={bar.color}
            radius={[4, 4, 0, 0]}
            name={bar.name || bar.dataKey}
            barSize={bars.length > 1 ? 16 : 32}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
