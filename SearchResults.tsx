'use client'

import { Bus } from '@/lib/types'
import { BusCard } from './BusCard'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, Navigation } from 'lucide-react'

interface SearchResultsProps {
  buses: Bus[]
  source: string
  destination: string
  isLoading: boolean
}

export function SearchResults({ buses, source, destination, isLoading }: SearchResultsProps) {
  // Loading state with skeleton cards
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-muted p-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty state
  if (buses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-muted">
        <div className="text-center max-w-md">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <MapPin className="w-16 h-16 text-muted-foreground/30 absolute left-0" />
              <Navigation className="w-16 h-16 text-muted-foreground/30 absolute right-0" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No buses found</h3>
          <p className="text-muted-foreground mb-4">
            We couldn&apos;t find any buses from <strong>{source}</strong> to <strong>{destination}</strong>.
          </p>
          <p className="text-sm text-muted-foreground">
            Try searching for a different route or date.
          </p>
        </div>
      </div>
    )
  }

  // Results list
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 md:p-6 border border-muted mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-lg font-semibold text-foreground">{source}</p>
            </div>
            <Navigation className="w-5 h-5 text-primary rotate-90" />
            <div>
              <p className="text-sm text-muted-foreground">To</p>
              <p className="text-lg font-semibold text-foreground">{destination}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{buses.length}</p>
            <p className="text-sm text-muted-foreground">buses available</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {buses.map((bus) => (
          <BusCard key={bus.bus_id} bus={bus} />
        ))}
      </div>
    </div>
  )
}
