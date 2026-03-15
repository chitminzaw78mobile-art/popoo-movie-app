'use client'

import { movies } from '@/data/movies'
import { SiteHeader, BottomNav, MovieCard } from '@/components/site-layout'

export default function RecentPage() {
  const recentMovies = [...movies].sort((a, b) => b.year - a.year)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="pt-20 pb-20 px-4">
        <h1 className="text-2xl font-bold text-white mb-6">Recent</h1>
        <div className="grid grid-cols-4 gap-3">
          {recentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
