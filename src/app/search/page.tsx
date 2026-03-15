'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { movies } from '@/data/movies'
import { MovieCard } from '@/components/site-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Search, Star } from 'lucide-react'

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMovies = searchQuery
    ? movies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/')}
            className="text-red-500 hover:text-red-400"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span className="text-xl font-bold text-white">Search</span>
        </div>
      </header>

      <main className="pt-20 pb-8 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Input
            type="text"
            placeholder="Search Movies and Series"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-secondary border-0 text-white placeholder:text-muted-foreground rounded-lg py-3 px-4"
            autoFocus
          />
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {searchQuery ? (
          filteredMovies.length > 0 ? (
            <div className="grid grid-cols-4 gap-3">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="cursor-pointer group"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 rounded px-1.5 py-0.5 flex items-center gap-1">
                      <Star className="h-3 w-3 text-red-500 fill-red-500" />
                      <span className="text-xs font-medium text-black">{movie.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-white truncate">{movie.title}</h3>
                  <p className="text-xs text-muted-foreground">{movie.year}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[50vh]">
              <p className="text-muted-foreground text-lg">No results found for "{searchQuery}"</p>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-muted-foreground text-lg">Start typing to search.</p>
          </div>
        )}
      </main>
    </div>
  )
}
