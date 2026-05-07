'use client'

import { User } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/components/Auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { Mail, Phone, LogOut, Ticket, MapPin } from 'lucide-react'

interface UserDashboardProps {
  user: User
}

export function UserDashboard({ user }: UserDashboardProps) {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name.split(' ')[0]}!</h1>
        <p className="text-white/90">Manage your bookings and account settings</p>
      </div>

      {/* User Info Card */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Account Information</h2>
        <div className="space-y-4">
          {/* Name */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-primary">{user.name[0]}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-semibold text-foreground">{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 pt-2">
            <Mail className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="text-foreground font-medium break-all">{user.email}</p>
            </div>
          </div>

          {/* Phone */}
          {user.phone && (
            <div className="flex items-center gap-4 pt-2">
              <Phone className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-foreground font-medium">{user.phone}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-primary" />
          Recent Bookings
        </h2>
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No bookings yet</p>
          <p className="text-sm text-muted-foreground/70">Start booking buses to see your history here</p>
        </div>
      </Card>

      {/* Saved Routes */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Saved Routes</h2>
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No saved routes yet</p>
          <p className="text-sm text-muted-foreground/70">Add routes to your favorites while searching</p>
        </div>
      </Card>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  )
}
