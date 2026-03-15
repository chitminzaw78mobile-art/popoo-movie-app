'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { genres, movies } from '@/data/movies'
import { SiteHeader, BottomNav, MovieCard } from '@/components/site-layout'
import { Button } from '@/components/ui/button'

export default function GenresPage() {
  const router = useRouter()
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const filteredMovies = selectedGenre
    ? movies.filter(m => m.genres.includes(selectedGenre))
    : []

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="pt-20 pb-20 px-4">
        <h1 className="text-2xl font-bold text-white mb-6">Genres</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant="secondary"
              className={`rounded-full px-4 py-2 ${
                selectedGenre === genre
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-secondary text-white hover:bg-secondary/80'
              }`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </Button>
          ))}
        </div>

        {selectedGenre && (
          <>
            <h2 className="text-lg font-semibold text-white mb-4">{selectedGenre} Movies</h2>
            <div className="grid grid-cols-4 gap-3">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {filteredMovies.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No movies found in this genre</p>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
