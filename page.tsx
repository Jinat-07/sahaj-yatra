'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SearchResults } from '@/components/Search/SearchResults'
import { Bus } from '@/lib/types'
import { fetchBuses } from '@/lib/data'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source') || ''
  const destination = searchParams.get('destination') || ''

  const [buses, setBuses] = useState<Bus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBuses = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        const results = await fetchBuses(source, destination)
        setBuses(results)
      } catch (error) {
        console.error('Error fetching buses:', error)
        setBuses([])
      } finally {
        setIsLoading(false)
      }
    }

    if (source && destination) {
      loadBuses()
    }
  }, [source, destination])

  if (!source || !destination) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Invalid Search</h1>
          <p className="text-muted-foreground mb-6">Please provide both source and destination cities.</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col px-4 py-6 md:py-8">
      <div className="flex-1 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Search Results
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Showing buses from {source} to {destination}
            </p>
          </div>
        </div>

        {/* Results */}
        <SearchResults buses={buses} source={source} destination={destination} isLoading={isLoading} />
      </div>

      {/* Bottom spacing for navigation bar */}
      <div className="h-20 md:h-0" />
    </main>
  )
}
