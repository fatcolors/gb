import { useState } from 'react'
import { Plus, Upload, MoreVertical } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import Button from '../components/ui/button'
import SearchInput from '../components/ui/search-input'
import Badge, { getFuelBadgeVariant } from '../components/ui/badge'
import AddProductModal from '../components/ui/add-product-modal'
import { fuelProducts } from '../data/fuel-products'

export default function FuelProductsPage() {
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const filtered = fuelProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.fuelType.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <PageHeader
        title="Fuel Products"
        description="Manage your fuel inventory and specifications"
        actions={
          <>
            <Button variant="secondary" icon={<Upload className="w-5 h-5" />} onClick={() => setModalOpen(true)}>Import</Button>
            <Button variant="primary" icon={<Plus className="w-5 h-5" />} onClick={() => setModalOpen(true)}>Add Product</Button>
          </>
        }
      />

      <div className="bg-white border border-brand-50 rounded-2xl flex-1 flex flex-col overflow-hidden">
        {/* Header with count + search */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-brand-800">All Fuels</h2>
            <span className="bg-error-50 text-error-700 text-xs font-medium px-2 py-0.5 rounded-2xl">
              {filtered.length}
            </span>
          </div>
          <SearchInput
            placeholder="Search..."
            value={search}
            onChange={setSearch}
            className="w-[250px]"
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto p-5 pt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-50">
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Product Name</th>
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Fuel Type</th>
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Country</th>
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Delivery Port</th>
                <th className="text-left py-3 px-3 text-xs font-medium text-brand-300">Delivery Method</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-brand-50 last:border-b-0 hover:bg-brand-25/50">
                  <td className="py-4 px-3 text-brand-800 font-medium">{product.name}</td>
                  <td className="py-4 px-3">
                    <Badge variant={getFuelBadgeVariant(product.fuelType)}>{product.fuelType}</Badge>
                  </td>
                  <td className="py-4 px-3 text-brand-800">{product.country}</td>
                  <td className="py-4 px-3 text-brand-800">
                    <span className="inline-flex items-center gap-1.5">
                      🇳🇱 {product.deliveryPort}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-brand-800">{product.deliveryMethod}</td>
                  <td className="py-4 px-1">
                    <button className="p-1 hover:bg-brand-25 rounded cursor-pointer bg-transparent border-none">
                      <MoreVertical className="w-5 h-5 text-brand-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
