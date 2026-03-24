import { useState } from 'react'
import { Users, Fuel } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import KpiTile from '../components/dashboard/KpiTile'
import ChartCard from '../components/charts/ChartCard'
import DonutChart from '../components/charts/DonutChart'
import BarChart from '../components/charts/BarChart'
import Badge, { getFuelBadgeVariant } from '../components/ui/badge'
import Button from '../components/ui/button'
import DateRangePicker from '../components/ui/date-range-picker'
import AddProductModal from '../components/ui/add-product-modal'
import { quoteValueData, quoteDistributionData, activeOrders, mapOrders } from '../data/dashboard'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const portFlagMap: Record<string, string> = {
  Rotterdam: '🇳🇱',
  Hamburg: '🇩🇪',
  Singapore: '🇸🇬',
  Gdansk: '🇵🇱',
}

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <PageHeader
        title="Dashboard Overview"
        description="Overview of your products and quotes"
        actions={
          <>
            <DateRangePicker />
            <Button variant="primary" icon={<Fuel className="w-5 h-5" />} onClick={() => setModalOpen(true)}>Import Products</Button>
          </>
        }
      />

      {/* KPI Tiles */}
      <div className="flex gap-4 shrink-0">
        <KpiTile title="Active Products" value="3" icon={Users} />
        <KpiTile title="Quote Requests" value="24" icon={Users} />
        <KpiTile title="Confirmed orders" value="187" icon={Users} />
      </div>

      {/* Charts Row */}
      <div className="flex gap-4 shrink-0">
        <ChartCard title="Quote Value for Active Orders" className="flex-1">
          <div className="flex items-center gap-6">
            <DonutChart
              data={quoteValueData}
              centerLabel="Total"
              centerValue="€5 400"
              size={180}
              innerRadius={55}
              outerRadius={80}
            />
            <div className="flex flex-col gap-2.5">
              {quoteValueData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-brand-300 w-16">{item.name}</span>
                  <span className="font-semibold text-brand-800 w-14">{item.display}</span>
                  <span className="text-brand-300 text-xs">{item.percentage}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Quote Distribution"
          className="flex-1"
          actions={
            <Button variant="secondary" size="sm">All Ports</Button>
          }
        >
          <div className="flex items-end gap-6 h-[180px]">
            {quoteDistributionData.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2 flex-1">
                <div className="text-xs font-semibold text-brand-800">{item.value}%</div>
                <div
                  className="w-full bg-brand-600 rounded-t"
                  style={{ height: `${item.value * 3}px` }}
                />
                <span className="text-xs text-brand-300">{item.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Map */}
      <ChartCard title="Orders Map" className="shrink-0">
        <div className="flex gap-4">
          <div className="w-[300px] flex flex-col gap-4">
            {mapOrders.map((order) => (
              <div key={order.id} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇳🇱</span>
                  <div>
                    <p className="font-semibold text-brand-800">{order.location}</p>
                    <p className="text-xs text-brand-300">{order.region} · {order.coords.join(', ')}</p>
                  </div>
                </div>
                <div className="border border-brand-50 rounded-lg p-3 text-sm">
                  <Badge variant="info" className="mb-2">{order.id}</Badge>
                  <div className="mt-2">
                    <p className="text-xs text-brand-300">Ship</p>
                    <p className="font-semibold text-brand-800">{order.ship}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-brand-300">Fuel Ordered</p>
                    <p className="font-medium text-brand-800">{order.fuel}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-brand-300">Total Cost (USD)</p>
                    <p className="font-medium text-brand-800">{order.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 h-[350px] rounded-xl overflow-hidden">
            <MapContainer
              center={[51.9244, 4.4777]}
              zoom={4}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              />
              {mapOrders.map((order) => (
                <Marker key={order.id} position={order.coords} icon={defaultIcon}>
                  <Popup>
                    <strong>{order.ship}</strong><br />
                    {order.location} · {order.fuel}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </ChartCard>

      {/* Active Orders Table */}
      <ChartCard
        title="Active orders"
        actions={
          <button className="text-sm font-semibold text-brand-700 flex items-center gap-1 bg-transparent border-none cursor-pointer">
            View All <span>›</span>
          </button>
        }
        className="shrink-0"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-50">
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Fuel Type</th>
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Vessel Name</th>
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Port</th>
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Quantity</th>
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Delivery date</th>
              </tr>
            </thead>
            <tbody>
              {activeOrders.map((order, i) => (
                <tr key={i} className="border-b border-brand-50 last:border-b-0">
                  <td className="py-3.5 px-3">
                    <Badge variant={getFuelBadgeVariant(order.fuelType)}>{order.fuelType}</Badge>
                  </td>
                  <td className="py-3.5 px-3 text-brand-800">{order.vessel}</td>
                  <td className="py-3.5 px-3 text-brand-800">
                    <span className="inline-flex items-center gap-1.5">
                      {portFlagMap[order.port.split(',')[0].trim()] && (
                        <span>{portFlagMap[order.port.split(',')[0].trim()]}</span>
                      )}
                      {order.port}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-brand-800">{order.quantity}</td>
                  <td className="py-3.5 px-3 text-brand-800">{order.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
