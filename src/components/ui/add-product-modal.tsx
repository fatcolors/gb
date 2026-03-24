import { useState } from 'react'
import { X, Trash2, Plus, Upload, Info } from 'lucide-react'
import Button from './button'
import Select from './select'

interface Product {
  bunkerType: string
  price: string
}

interface Port {
  portName: string
  portCountry: string
  productLatitude: string
  portLongitude: string
  delivery: string[]
  products: Product[]
}

const DELIVERY_OPTIONS = ['Barge', 'Truck', 'Pipeline/Ex-Pipe', 'STS (Ship to Ship)', 'Terminal']
const BUNKER_TYPES = ['VLSFO', 'HSFO', 'MGO', 'LSFO', 'HFO', 'Bio Fuel B30']
const BUNKER_TYPE_OPTIONS = BUNKER_TYPES.map((t) => ({ value: t, label: t }))

function emptyPort(): Port {
  return {
    portName: '',
    portCountry: '',
    productLatitude: '',
    portLongitude: '',
    delivery: [],
    products: [{ bunkerType: '', price: '' }],
  }
}

interface AddProductModalProps {
  open: boolean
  onClose: () => void
}

export default function AddProductModal({ open, onClose }: AddProductModalProps) {
  const [ports, setPorts] = useState<Port[]>([emptyPort()])

  if (!open) return null

  function updatePort(index: number, patch: Partial<Port>) {
    setPorts((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)))
  }

  function toggleDelivery(portIndex: number, method: string) {
    setPorts((prev) =>
      prev.map((p, i) => {
        if (i !== portIndex) return p
        const delivery = p.delivery.includes(method)
          ? p.delivery.filter((d) => d !== method)
          : [...p.delivery, method]
        return { ...p, delivery }
      })
    )
  }

  function addProduct(portIndex: number) {
    setPorts((prev) =>
      prev.map((p, i) =>
        i === portIndex ? { ...p, products: [...p.products, { bunkerType: '', price: '' }] } : p
      )
    )
  }

  function removeProduct(portIndex: number, productIndex: number) {
    setPorts((prev) =>
      prev.map((p, i) =>
        i === portIndex
          ? { ...p, products: p.products.filter((_, j) => j !== productIndex) }
          : p
      )
    )
  }

  function updateProduct(portIndex: number, productIndex: number, patch: Partial<Product>) {
    setPorts((prev) =>
      prev.map((p, i) =>
        i === portIndex
          ? {
              ...p,
              products: p.products.map((pr, j) => (j === productIndex ? { ...pr, ...patch } : pr)),
            }
          : p
      )
    )
  }

  function removePort(index: number) {
    setPorts((prev) => prev.filter((_, i) => i !== index))
  }

  function handleClose() {
    setPorts([emptyPort()])
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-lg w-[880px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-50">
          <h2 className="text-xl font-semibold text-brand-800">Add Product</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-brand-25 rounded-lg cursor-pointer bg-transparent border-none"
          >
            <X className="w-5 h-5 text-brand-300" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Info Banner */}
          <div className="flex items-center justify-between bg-brand-25 border border-brand-50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2.5 text-sm text-brand-600">
              <Info className="w-5 h-5 text-brand-600 shrink-0" />
              <span>
                Upload the Excel file to automatically add all ports where this fuel type is available.
                Upload the data directly from the provided{' '}
                <span className="underline cursor-pointer">Excel template</span>.
              </span>
            </div>
            <Button variant="secondary" size="sm" icon={<Upload className="w-4 h-4" />}>
              Import from XLS/XCSV
            </Button>
          </div>

          {/* Port Sections */}
          {ports.map((port, portIdx) => (
            <div
              key={portIdx}
              className="border border-brand-50 rounded-xl p-5 flex flex-col gap-5"
            >
              {/* Port Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-brand-800">Port #{portIdx + 1}</h3>
                {ports.length > 1 && (
                  <button
                    onClick={() => removePort(portIdx)}
                    className="flex items-center gap-1.5 text-sm font-medium text-brand-800 bg-transparent border-none cursor-pointer hover:text-error-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove Port
                  </button>
                )}
              </div>

              {/* Port Fields - Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-brand-800">Port Name</label>
                  <input
                    type="text"
                    placeholder="Enter port name"
                    value={port.portName}
                    onChange={(e) => updatePort(portIdx, { portName: e.target.value })}
                    className="px-3 py-2.5 text-sm border border-brand-50 rounded-lg focus:outline-none focus:border-brand-300 placeholder:text-brand-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-brand-800">
                    Port Country<span className="text-error-700">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter country"
                    value={port.portCountry}
                    onChange={(e) => updatePort(portIdx, { portCountry: e.target.value })}
                    className="px-3 py-2.5 text-sm border border-brand-50 rounded-lg focus:outline-none focus:border-brand-300 placeholder:text-brand-300"
                  />
                </div>
              </div>

              {/* Port Fields - Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-brand-800">
                    Product Latitude<span className="text-error-700">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 51.9244"
                    value={port.productLatitude}
                    onChange={(e) => updatePort(portIdx, { productLatitude: e.target.value })}
                    className="px-3 py-2.5 text-sm border border-brand-50 rounded-lg focus:outline-none focus:border-brand-300 placeholder:text-brand-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-brand-800">
                    Port Longitude<span className="text-error-700">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4.4777"
                    value={port.portLongitude}
                    onChange={(e) => updatePort(portIdx, { portLongitude: e.target.value })}
                    className="px-3 py-2.5 text-sm border border-brand-50 rounded-lg focus:outline-none focus:border-brand-300 placeholder:text-brand-300"
                  />
                </div>
              </div>

              {/* Delivery */}
              <div className="flex flex-col gap-2.5">
                <h4 className="text-sm font-semibold text-brand-800">Delivery</h4>
                <div className="flex items-center gap-5">
                  {DELIVERY_OPTIONS.map((method) => (
                    <label
                      key={method}
                      className="flex items-center gap-2 text-sm text-brand-800 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={port.delivery.includes(method)}
                        onChange={() => toggleDelivery(portIdx, method)}
                        className="w-4 h-4 rounded border-brand-50 accent-brand-600"
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              {/* Products */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-brand-800">Products</h4>
                {port.products.map((product, prodIdx) => (
                  <div key={prodIdx} className="flex items-end gap-3">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-brand-800">Bunker Type</label>
                      <Select
                        value={product.bunkerType}
                        onChange={(val) => updateProduct(portIdx, prodIdx, { bunkerType: val })}
                        options={BUNKER_TYPE_OPTIONS}
                        placeholder="Select Type"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-brand-800">Price per MT ($)</label>
                      <input
                        type="text"
                        placeholder="Enter price"
                        value={product.price}
                        onChange={(e) =>
                          updateProduct(portIdx, prodIdx, { price: e.target.value })
                        }
                        className="px-3 py-2.5 text-sm border border-brand-50 rounded-lg focus:outline-none focus:border-brand-300 placeholder:text-brand-300"
                      />
                    </div>
                    <button
                      onClick={() => removeProduct(portIdx, prodIdx)}
                      disabled={port.products.length <= 1}
                      className="p-2.5 hover:bg-error-50 rounded-lg cursor-pointer bg-transparent border-none disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-5 h-5 text-brand-300" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addProduct(portIdx)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 bg-transparent border border-brand-50 rounded-lg px-3 py-2 cursor-pointer hover:bg-brand-25 w-fit"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>
            </div>
          ))}

          {/* Add Port */}
          <button
            onClick={() => setPorts((prev) => [...prev, emptyPort()])}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 bg-transparent border border-brand-50 rounded-lg px-3 py-2 cursor-pointer hover:bg-brand-25 w-fit"
          >
            <Plus className="w-4 h-4" />
            Add Port with Suppliers
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-brand-50 bg-brand-25 rounded-b-2xl">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Product
          </Button>
        </div>
      </div>
    </div>
  )
}
