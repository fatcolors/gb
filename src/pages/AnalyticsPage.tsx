import { Download } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import DateRangePicker from '../components/ui/date-range-picker'
import KpiTile from '../components/dashboard/KpiTile'
import ChartCard from '../components/charts/ChartCard'
import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChart'
import DonutChart from '../components/charts/DonutChart'
import HorizontalBarChart from '../components/charts/HorizontalBarChart'
import Button from '../components/ui/button'
import { Users, Wallet, CircleCheck } from 'lucide-react'
import {
  deliveriesData,
  topCustomersData,
  evolutionData,
  volumeSoldData,
  quoteValueTrendData,
  customerPortfolioData,
  paymentMethodData,
  competitorsData,
  acceptedVsRejectedData,
  productMixData,
  renewableVsFossilData,
} from '../data/analytics'

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 overflow-y-auto pb-4">
      <PageHeader
        title="Analytics Dashboard"
        description="Comprehensive business insights and performance analytics"
        actions={
          <>
            <DateRangePicker />
            <Button variant="secondary" icon={<Download className="w-5 h-5" />}>Download Fleet Report</Button>
          </>
        }
      />

      {/* KPI Tiles */}
      <div className="flex gap-4">
        <KpiTile title="Total Quotes" value="72" icon={Users} />
        <KpiTile title="Accepted Quotes" value="64" icon={CircleCheck} />
        <KpiTile title="Total Volume Supplied" value="10 000" suffix="MT" icon={Users} />
        <KpiTile title="Active Customers" value="168" icon={Users} />
      </div>

      {/* Deliveries + Top Customers */}
      <div className="flex gap-4">
        <ChartCard title="Deliveries" subtitle="per Port" className="flex-1"
          actions={<Button variant="secondary" size="sm">All Fuel Types</Button>}
        >
          <BarChart
            data={deliveriesData}
            bars={[{ dataKey: 'value', color: '#0B3E65' }]}
            xAxisKey="port"
            height={200}
          />
        </ChartCard>
        <ChartCard title="Top Customers" subtitle="by Volume" className="flex-1"
          actions={<Button variant="secondary" size="sm">All Fuel Types</Button>}
        >
          <HorizontalBarChart
            data={topCustomersData}
            bars={[{ dataKey: 'value', color: '#0B3E65' }]}
            yAxisKey="name"
            height={200}
          />
        </ChartCard>
      </div>

      {/* Evolution of Total Supplied Volume */}
      <ChartCard title="Evolution of Total Supplied Volume">
        <LineChart
          data={evolutionData}
          lines={[{ dataKey: 'volume', color: '#0B3E65', areaFill: true }]}
          xAxisKey="month"
          height={220}
        />
      </ChartCard>

      {/* Commercial Performance */}
      <div>
        <h3 className="text-base font-semibold text-brand-800 mb-4">Commercial Performance</h3>
        <div className="flex gap-4 mb-4">
          <KpiTile title="Total sales value" value="€120 000" icon={Wallet} />
          <KpiTile title="Finalized Transactions" value="23" icon={CircleCheck} />
          <KpiTile title="Accepted Quotes" value="65" icon={CircleCheck} />
        </div>
      </div>

      {/* Volume Sold + Quote Value Trend */}
      <div className="flex gap-4">
        <ChartCard title="Volume Sold" subtitle="per Customer" className="flex-1">
          <div className="flex items-center gap-6">
            <DonutChart
              data={volumeSoldData}
              centerLabel="MT Total"
              centerValue="2 123"
              size={180}
              innerRadius={55}
              outerRadius={80}
            />
            <div className="flex flex-col gap-2">
              {volumeSoldData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-brand-300 w-20">{item.name}</span>
                  <span className="font-medium text-brand-800">{item.value} MT</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
        <ChartCard title="Quote Value Trend" subtitle="Over Time" className="flex-1">
          <LineChart
            data={quoteValueTrendData}
            lines={[{ dataKey: 'value', color: '#0B3E65' }]}
            xAxisKey="month"
            height={200}
          />
        </ChartCard>
      </div>

      {/* Clients and Contracts */}
      <div>
        <h3 className="text-base font-semibold text-brand-800 mb-4">Clients and Contracts</h3>
        <div className="flex gap-4 mb-4">
          <KpiTile title="Contracted Customers" value="138" icon={Users} />
          <KpiTile title="New Customers" value="98" icon={Users} />
          <KpiTile title="Average payment term" value="23 days" icon={CircleCheck} />
        </div>
      </div>

      {/* Customer Portfolio + Payment Method */}
      <div className="flex gap-4">
        <ChartCard title="Customer portfolio" className="flex-1"
          actions={<Button variant="secondary" size="sm">Region</Button>}
        >
          <BarChart
            data={customerPortfolioData}
            bars={[{ dataKey: 'value', color: '#0B3E65' }]}
            xAxisKey="region"
            height={200}
            yAxisFormatter={(v) => `${v}%`}
          />
        </ChartCard>
        <ChartCard title="Payment Method" subtitle="per Customer" className="flex-1">
          <div className="flex flex-col gap-3">
            {paymentMethodData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-brand-300 w-28 truncate">{item.name}</span>
                <div className="flex-1 h-6 bg-brand-25 rounded overflow-hidden">
                  <div
                    className="h-full bg-brand-600 rounded"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Pricing and Market Benchmark */}
      <div>
        <h3 className="text-base font-semibold text-brand-800 mb-4">Pricing and Market Benchmark</h3>
        <div className="flex gap-4 mb-4">
          <KpiTile title="Accepted Quotes" value="64" icon={CircleCheck} />
          <KpiTile title="Rejected Quotes" value="8" icon={CircleCheck} />
          <KpiTile title="Conversion Rate" value="72%" icon={CircleCheck} />
        </div>
      </div>

      {/* Main Competitors + Accepted vs Rejected */}
      <div className="flex gap-4">
        <ChartCard title="Main Competitors" subtitle="by Port" className="flex-1">
          <BarChart
            data={competitorsData}
            bars={[
              { dataKey: 'competitorA', color: '#0B3E65', name: 'Competition A' },
              { dataKey: 'competitorB', color: '#175CD3', name: 'Competition B' },
              { dataKey: 'competitorC', color: '#93C5FD', name: 'Competition C' },
            ]}
            xAxisKey="port"
            height={220}
            showLegend
          />
        </ChartCard>
        <ChartCard title="Accepted vs Rejected Quotes" subtitle="Over Time" className="flex-1">
          <LineChart
            data={acceptedVsRejectedData}
            lines={[
              { dataKey: 'accepted', color: '#0B3E65', name: 'Accepted' },
              { dataKey: 'rejected', color: '#7FB8DC', name: 'Rejected' },
            ]}
            xAxisKey="month"
            height={220}
          />
        </ChartCard>
      </div>

      {/* Sustainability */}
      <div>
        <h3 className="text-base font-semibold text-brand-800 mb-4">Sustainability</h3>
      </div>

      <div className="flex gap-4">
        <ChartCard title="Product mix" className="flex-1">
          <div className="flex items-center gap-6">
            <DonutChart
              data={productMixData}
              centerLabel="Fuels"
              centerValue="5"
              size={160}
              innerRadius={50}
              outerRadius={72}
            />
            <div className="flex flex-col gap-2">
              {productMixData.map((item) => (
                <div key={item.name + item.value} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-brand-300 w-12">{item.name}</span>
                  <span className="font-medium text-brand-800">{item.value} %</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
        <ChartCard title="Renewable vs Fossil Fuel Quotes" className="flex-1">
          <div className="flex items-center gap-6">
            <DonutChart
              data={renewableVsFossilData}
              size={160}
              innerRadius={50}
              outerRadius={72}
            />
            <div className="flex flex-col gap-2">
              {renewableVsFossilData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-brand-300">{item.name}</span>
                  <span className="font-semibold text-brand-800">{item.value} %</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
