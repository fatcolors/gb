export interface QuoteRequest {
  id: string
  quoteId: string
  vessel: string
  fuelType: string
  quantity: string
  deliveryPort: string
  deliveryDate: string
  priority: 'High' | 'Medium' | 'Low'
  hasQuote: boolean
  contact: {
    name: string
    email: string
    phone: string
  }
}

export const quoteRequests: QuoteRequest[] = [
  {
    id: '1', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'BIO FUEL',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'High', hasQuote: true,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
  {
    id: '2', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'MGO',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'Low', hasQuote: false,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
  {
    id: '3', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'LSFO',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'High', hasQuote: false,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
  {
    id: '4', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'VLSFO',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'Medium', hasQuote: true,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
  {
    id: '5', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'LSFO',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'High', hasQuote: false,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
  {
    id: '6', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'VLSFO',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'Low', hasQuote: true,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
  {
    id: '7', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'MGO',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'High', hasQuote: true,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
  {
    id: '8', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'BIO FUEL',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'Medium', hasQuote: false,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
  {
    id: '9', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'BIO FUEL',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'High', hasQuote: true,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
  {
    id: '10', quoteId: 'QR-2025-001', vessel: 'MV Pacific Star', fuelType: 'BIO FUEL',
    quantity: '500 MT', deliveryPort: 'Rotterdam', deliveryDate: '10.10.2025',
    priority: 'Medium', hasQuote: false,
    contact: { name: 'Olivia Cold', email: 'name@fleetmanager.co', phone: '+44 567 784 981' },
  },
]
