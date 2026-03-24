import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

interface HorizontalBarChartProps {
  data: Record<string, unknown>[]
  bars: { dataKey: string; color: string; name?: string }[]
  yAxisKey: string
  height?: number
  xAxisFormatter?: (value: number) => string
}

export default function HorizontalBarChart({
  data,
  bars,
  yAxisKey,
  height = 200,
  xAxisFormatter,
}: HorizontalBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF0" horizontal={false} />
        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#5C7790' }}
          tickFormatter={xAxisFormatter}
        />
        <YAxis
          type="category"
          dataKey={yAxisKey}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#5C7790' }}
          width={100}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #E8ECF0',
            boxShadow: '0px 1px 2px rgba(10,13,18,0.05)',
            fontSize: 12,
          }}
        />
        {bars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            fill={bar.color}
            radius={[0, 4, 4, 0]}
            name={bar.name || bar.dataKey}
            barSize={20}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
