'use client'

import { SiteHeader, BottomNav } from '@/components/site-layout'
import { Bookmark } from 'lucide-react'

export default function BookmarkPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="pt-20 pb-20 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Bookmark className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Bookmark</h1>
          <p className="text-muted-foreground">No bookmarked movies yet</p>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
