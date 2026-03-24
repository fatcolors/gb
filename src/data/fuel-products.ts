export interface FuelProduct {
  id: string
  name: string
  fuelType: string
  country: string
  deliveryPort: string
  deliveryMethod: string
  portFlag?: string
}

export const fuelProducts: FuelProduct[] = [
  { id: '1', name: 'Premium BIO B30', fuelType: 'BIO FUEL', country: 'Netherlands', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge, Truck' },
  { id: '2', name: 'MGO 0.5%', fuelType: 'MGO', country: 'Netherlands', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge, Truck' },
  { id: '3', name: 'Standard LSFO 0.5%', fuelType: 'LSFO', country: 'Netherlands', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge, Truck' },
  { id: '4', name: 'Premium VLSFO 0.5%', fuelType: 'VLSFO', country: 'Belgium', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge, Truck, Pipeline' },
  { id: '5', name: 'Standard LSFO 0.5%', fuelType: 'LSFO', country: 'Belgium', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge' },
  { id: '6', name: 'Premium VLSFO 0.5%', fuelType: 'VLSFO', country: 'Germany', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge, Truck' },
  { id: '7', name: 'MGO 0.5%', fuelType: 'MGO', country: 'Germany', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge, Truck' },
  { id: '8', name: 'Premium BIO B30', fuelType: 'BIO FUEL', country: 'Germany', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge, Truck' },
  { id: '9', name: 'Premium BIO B30', fuelType: 'BIO FUEL', country: 'Germany', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge, Truck' },
  { id: '10', name: 'Premium VLSFO 0.5%', fuelType: 'Live', country: 'Germany', deliveryPort: 'Rotterdam', deliveryMethod: 'Barge, Truck' },
]
