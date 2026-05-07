export interface Route {
  route_id: string
  source: string
  destination: string
  distance: number
  base_fare: number
}

export interface Bus {
  bus_id: string
  bus_name: string
  route_id: string
  start_time: string
  end_time: string
  frequency_min: number
  type: 'express' | 'local'
  price: number
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
}

export interface SearchFilters {
  source: string
  destination: string
}
