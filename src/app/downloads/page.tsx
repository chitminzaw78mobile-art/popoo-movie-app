'use client'

import { SiteHeader, BottomNav } from '@/components/site-layout'
import { Download } from 'lucide-react'

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="pt-20 pb-20 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Download className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Downloads</h1>
          <p className="text-muted-foreground">No downloaded movies yet</p>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
