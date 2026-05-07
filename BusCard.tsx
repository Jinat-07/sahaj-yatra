'use client'

import { Bus } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, MapPin, Users } from 'lucide-react'

interface BusCardProps {
  bus: Bus
}

export function BusCard({ bus }: BusCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-muted p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start md:items-center">
        {/* Bus Name & Type */}
        <div className="md:col-span-2 space-y-2">
          <h3 className="text-lg font-bold text-foreground">{bus.bus_name}</h3>
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className={`${
                bus.type === 'express'
                  ? 'bg-primary/20 text-primary hover:bg-primary/30'
                  : 'bg-secondary/20 text-secondary-foreground'
              }`}
            >
              {bus.type === 'express' ? '⚡ Express' : '🚌 Local'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Every {bus.frequency_min} mins
            </Badge>
          </div>
        </div>

        {/* Time & Duration */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{bus.start_time}</span>
            <span className="text-muted-foreground">→</span>
            <span>{bus.end_time}</span>
          </div>
          <p className="text-xs text-muted-foreground">Journey time ~4-6 hours</p>
        </div>

        {/* Seats Available */}
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Seats available</span>
        </div>

        {/* Price & CTA */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">₹{bus.price}</p>
            <p className="text-xs text-muted-foreground">per seat</p>
          </div>
          <Button
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            size="sm"
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  )
}
