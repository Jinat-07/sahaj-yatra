'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Navigation, Loader2 } from 'lucide-react'

export function SearchCard() {
  const router = useRouter()
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!source.trim()) {
      setError('Please enter source city')
      return
    }
    if (!destination.trim()) {
      setError('Please enter destination city')
      return
    }
    if (source.toLowerCase() === destination.toLowerCase()) {
      setError('Source and destination cannot be the same')
      return
    }

    setIsLoading(true)
    const params = new URLSearchParams({
      source: source.trim(),
      destination: destination.trim(),
    })
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Find Your Bus</h2>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Source Input */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-foreground gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              From
            </label>
            <Input
              placeholder="Enter departure city"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="border-muted focus:border-primary focus:ring-primary"
              disabled={isLoading}
            />
          </div>

          {/* Destination Input */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-foreground gap-2">
              <Navigation className="w-4 h-4 text-primary" />
              To
            </label>
            <Input
              placeholder="Enter arrival city"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border-muted focus:border-primary focus:ring-primary"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Search Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Search Buses'
            )}
          </Button>
        </form>

        {/* Quick suggestions */}
        <div className="mt-6 pt-6 border-t border-muted">
          <p className="text-xs font-semibold text-muted-foreground mb-3">Popular Routes</p>
          <div className="flex flex-wrap gap-2">
            {['Delhi', 'Mumbai', 'Bangalore', 'Agra', 'Jaipur'].map((city) => (
              <button
                key={city}
                onClick={() => setSource(city)}
                className="px-3 py-1 bg-secondary/50 hover:bg-secondary text-foreground text-sm rounded-lg transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
