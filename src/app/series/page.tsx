'use client'

import { movies } from '@/data/movies'
import { SiteHeader, BottomNav, MovieCard } from '@/components/site-layout'

export default function SeriesPage() {
  const seriesList = movies.filter(m => m.type === 'series' || m.type === 'anime')

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="pt-20 pb-20 px-4">
        <h1 className="text-2xl font-bold text-white mb-6">Series</h1>
        <div className="grid grid-cols-4 gap-3">
          {seriesList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
