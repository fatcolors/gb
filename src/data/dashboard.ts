export const kpiData = [
  { title: 'Active Products', value: '3', icon: 'users' as const },
  { title: 'Quote Requests', value: '24', icon: 'users' as const },
  { title: 'Confirmed orders', value: '187', icon: 'users' as const },
]

export const quoteValueData = [
  { name: 'Bio Fuel', value: 900, color: '#0B3E65', percentage: '16.7%', display: '€900' },
  { name: 'HFO', value: 1200, color: '#1B6A9C', percentage: '22.2%', display: '€1 200' },
  { name: 'VLSFO', value: 1500, color: '#3B8DC5', percentage: '27.8%', display: '€1 500' },
  { name: 'HSFO', value: 800, color: '#7FB8DC', percentage: '14.8%', display: '€800' },
  { name: 'MGO', value: 1000, color: '#C4DDEF', percentage: '18.5%', display: '€1 000' },
]

export const quoteDistributionData = [
  { name: 'MGO', value: 45 },
  { name: 'HFO', value: 32 },
  { name: 'HSFO', value: 15 },
  { name: 'VLSFO', value: 6 },
  { name: 'Bio Fuel', value: 2 },
]

export const activeOrders = [
  { fuelType: 'VLSFO', vessel: 'Atlantic Voyager', port: 'Hamburg', quantity: '378 MT', deliveryDate: '15-11-2025' },
  { fuelType: 'LSFO', vessel: '-', port: 'Hamburg, Gdansk, Singapore', quantity: '500 MT', deliveryDate: '15-11-2025' },
  { fuelType: 'MGO', vessel: 'Atlantic Voyager', port: 'Singapore', quantity: '287 MT', deliveryDate: '15-11-2025' },
  { fuelType: 'Bio Fuel', vessel: 'Atlantic Voyager', port: 'Gdansk', quantity: '471 MT', deliveryDate: '15-11-2025' },
  { fuelType: 'VLSFO', vessel: 'Atlantic Voyager', port: 'Hamburg', quantity: '176 MT', deliveryDate: '15-11-2025' },
  { fuelType: 'MGO', vessel: '-', port: 'Hamburg, Gdansk, Singapore', quantity: '349 MT', deliveryDate: '15-11-2025' },
  { fuelType: 'VLSFO', vessel: '$688', port: '$688', quantity: '24', deliveryDate: '15-11-2025' },
  { fuelType: 'MGO', vessel: '$688', port: '$688', quantity: '24', deliveryDate: '15-11-2025' },
]

export const mapOrders = [
  {
    id: 'Q-2025-001',
    ship: 'MV Pacific',
    fuel: 'VLSFO (RMG 380), HSFO, MGO',
    cost: '$245,475.00',
    location: 'Rotterdam',
    coords: [51.9244, 4.4777] as [number, number],
    region: 'Netherlands - Europe',
  },
]
