'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { movies, type Movie } from '@/data/movies'
import { Star, ChevronRight } from 'lucide-react'

import { motion, AnimatePresence } from 'framer-motion'

// Loading Skeleton Component
function MovieCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent animate-pulse" />
      </div>
      <div className="h-3 bg-zinc-800 rounded w-3/4 mb-1" />
      <div className="h-2.5 bg-zinc-800 rounded w-1/2" />
    </div>
  )
}

// Movie Card Component
interface MovieCardProps {
  movie: Movie
  index: number
  onClick: () => void
}

function MovieCard({ movie, index, onClick }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-zinc-800">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-zinc-700 animate-pulse" />
        )}
        <img
          src={movie.poster}
          alt={movie.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } group-hover:scale-110`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/30 to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <motion.div 
          className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-white">{movie.rating}</span>
        </motion.div>

        {/* Type Badge for Anime */}
        {movie.type === 'anime' && (
          <div className="absolute top-2 left-2 bg-purple-600 rounded px-2 py-0.5">
            <span className="text-xs font-medium text-white">Anime</span>
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-white truncate group-hover:text-red-400 transition-colors">
        {movie.title}
      </h3>
      <p className="text-xs text-gray-500">{movie.year}</p>
    </motion.div>
  )
}

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowContent(true), 100)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleMovieClick = (movie: Movie) => {
    router.push(`/movie/${movie.id}`)
  }

  const movieList = movies.filter(m => m.type === 'movie').slice(0, 10)
  const seriesList = movies.filter(m => m.type === 'series' || m.type === 'anime').slice(0, 10)

  return (
    <div className="min-h-screen bg-black">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 px-4 pt-20 pb-20">
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Movies Section */}
              <section className="mb-8">
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-bold text-white">Movies</h2>
                  <button
                    onClick={() => router.push('/movies')}
                    className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors"
                  >
                    More <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>

                <div className="grid grid-cols-4 gap-3">
                  <AnimatePresence>
                    {isLoading ? (
                      Array(10).fill(0).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                          <MovieCardSkeleton />
                        </motion.div>
                      ))
                    ) : (
                      movieList.map((movie, index) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          index={index}
                          onClick={() => handleMovieClick(movie)}
                        />
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* Series Section */}
              <section className="mb-8">
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-white">Series</h2>
                  <button
                    onClick={() => router.push('/series')}
                    className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors"
                  >
                    More <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>

                <div className="grid grid-cols-4 gap-3">
                  <AnimatePresence>
                    {isLoading ? (
                      Array(10).fill(0).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                          <MovieCardSkeleton />
                        </motion.div>
                      ))
                    ) : (
                      seriesList.map((movie, index) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          index={index}
                          onClick={() => handleMovieClick(movie)}
                        />
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
