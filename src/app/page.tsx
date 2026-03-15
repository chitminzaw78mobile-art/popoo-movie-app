'use client'

import { useRouter } from 'next/navigation'
import { movies } from '@/data/movies'
import { SiteHeader, BottomNav, MovieCard } from '@/components/site-layout'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  
  // Get Movies and Series separately (limit to 10 each)
  const movieList = movies.filter(m => m.type === 'movie').slice(0, 10)
  const seriesList = movies.filter(m => m.type === 'series' || m.type === 'anime').slice(0, 10)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="pt-20 pb-20 px-4">
        {/* Movies Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Movies</h2>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-400 flex items-center gap-1"
              onClick={() => router.push('/movies')}
            >
              More
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Series Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Series</h2>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-400 flex items-center gap-1"
              onClick={() => router.push('/series')}
            >
              More
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {seriesList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
