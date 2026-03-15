'use client'

import { SiteHeader, BottomNav } from '@/components/site-layout'
import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="pt-20 pb-20 px-4">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        
        <div className="space-y-4">
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Account</h3>
            <p className="text-muted-foreground text-sm">Manage your account settings</p>
          </div>
          
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Playback</h3>
            <p className="text-muted-foreground text-sm">Video quality and playback settings</p>
          </div>
          
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Notifications</h3>
            <p className="text-muted-foreground text-sm">Manage notification preferences</p>
          </div>
          
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">About</h3>
            <p className="text-muted-foreground text-sm">App version and information</p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
