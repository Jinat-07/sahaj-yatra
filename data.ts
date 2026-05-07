import { Route, Bus } from './types'

export const routes: Route[] = [
  {
    route_id: 'delhi-agra',
    source: 'Delhi',
    destination: 'Agra',
    distance: 240,
    base_fare: 350,
  },
  {
    route_id: 'delhi-jaipur',
    source: 'Delhi',
    destination: 'Jaipur',
    distance: 280,
    base_fare: 400,
  },
  {
    route_id: 'delhi-lucknow',
    source: 'Delhi',
    destination: 'Lucknow',
    distance: 500,
    base_fare: 600,
  },
  {
    route_id: 'mumbai-pune',
    source: 'Mumbai',
    destination: 'Pune',
    distance: 160,
    base_fare: 250,
  },
  {
    route_id: 'mumbai-bangalore',
    source: 'Mumbai',
    destination: 'Bangalore',
    distance: 950,
    base_fare: 1200,
  },
  {
    route_id: 'bangalore-hyderabad',
    source: 'Bangalore',
    destination: 'Hyderabad',
    distance: 580,
    base_fare: 750,
  },
]

export const buses: Bus[] = [
  {
    bus_id: 'bus-001',
    bus_name: 'Comfort Travels',
    route_id: 'delhi-agra',
    start_time: '06:00 AM',
    end_time: '10:30 AM',
    frequency_min: 15,
    type: 'express',
    price: 450,
  },
  {
    bus_id: 'bus-002',
    bus_name: 'Royal Journey',
    route_id: 'delhi-agra',
    start_time: '08:00 AM',
    end_time: '12:30 PM',
    frequency_min: 20,
    type: 'local',
    price: 350,
  },
  {
    bus_id: 'bus-003',
    bus_name: 'Premium Express',
    route_id: 'delhi-agra',
    start_time: '10:00 AM',
    end_time: '2:15 PM',
    frequency_min: 30,
    type: 'express',
    price: 550,
  },
  {
    bus_id: 'bus-004',
    bus_name: 'Budget Travels',
    route_id: 'delhi-jaipur',
    start_time: '05:30 AM',
    end_time: '10:00 AM',
    frequency_min: 10,
    type: 'local',
    price: 320,
  },
  {
    bus_id: 'bus-005',
    bus_name: 'Deluxe Rides',
    route_id: 'delhi-jaipur',
    start_time: '06:30 AM',
    end_time: '11:00 AM',
    frequency_min: 25,
    type: 'express',
    price: 500,
  },
  {
    bus_id: 'bus-006',
    bus_name: 'Night Journey',
    route_id: 'delhi-lucknow',
    start_time: '8:00 PM',
    end_time: '6:00 AM',
    frequency_min: 45,
    type: 'express',
    price: 750,
  },
  {
    bus_id: 'bus-007',
    bus_name: 'Mumbai Local',
    route_id: 'mumbai-pune',
    start_time: '07:00 AM',
    end_time: '10:00 AM',
    frequency_min: 15,
    type: 'local',
    price: 200,
  },
  {
    bus_id: 'bus-008',
    bus_name: 'Express South',
    route_id: 'mumbai-bangalore',
    start_time: '10:00 PM',
    end_time: '10:00 AM',
    frequency_min: 60,
    type: 'express',
    price: 1500,
  },
]

export async function fetchBuses(source: string, destination: string): Promise<Bus[]> {
  // Placeholder for Google Sheets API integration
  // For now, return filtered mock data
  const filteredBuses = buses.filter((bus) => {
    const route = routes.find((r) => r.route_id === bus.route_id)
    return route?.source.toLowerCase() === source.toLowerCase() && route?.destination.toLowerCase() === destination.toLowerCase()
  })
  return filteredBuses
}

export function filterBusesByRoute(source: string, destination: string): Bus[] {
  return buses.filter((bus) => {
    const route = routes.find((r) => r.route_id === bus.route_id)
    return route?.source.toLowerCase() === source.toLowerCase() && route?.destination.toLowerCase() === destination.toLowerCase()
  })
}
