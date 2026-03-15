'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { movies, type Movie } from '@/data/movies'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Calendar,
  Clock3,
  Play,
  ThumbsUp,
  FileText,
  Download,
  ChevronLeft,
  Heart,
  MonitorPlay,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

type TabType = 'detail' | 'watch' | 'download' | 'explore'

// Loading Skeleton for Detail Page
function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-64 bg-zinc-800 rounded-lg" />
      <div className="h-8 bg-zinc-800 rounded w-2/3" />
      <div className="h-4 bg-zinc-800 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-8 bg-zinc-800 rounded w-20" />
        <div className="h-8 bg-zinc-800 rounded w-20" />
      </div>
      <div className="h-10 bg-zinc-800 rounded w-full" />
    </div>
  )
}

// Accordion Component
interface AccordionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function Accordion({ title, isOpen, onToggle, children }: AccordionProps) {
  return (
    <div className="border border-zinc-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full bg-zinc-800/80 backdrop-blur px-4 py-3 flex items-center justify-between hover:bg-zinc-700/50 transition-colors"
      >
        <span className="text-white font-medium text-sm">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Select Dropdown Component
interface SelectProps {
  label: string
  value: string
  options: string[]
  isOpen: boolean
  onToggle: () => void
  onSelect: (value: string) => void
}

function Select({ label, value, options, isOpen, onToggle, onSelect }: SelectProps) {
  return (
    <div className="relative">
      <label className="text-xs text-gray-400 mb-1 block">{label}</label>
      <button
        onClick={onToggle}
        className="w-full bg-zinc-800/80 backdrop-blur border border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between text-white text-sm hover:border-zinc-600 transition-colors"
      >
        <span>{value}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden z-20 shadow-xl"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => onSelect(option)}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  value === option ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-zinc-700'
                }`}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = params.id as string
  const movie = movies.find(m => m.id === movieId)
  
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('detail')
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  // Download accordion state
  const [openServer, setOpenServer] = useState<string | null>(null)
  const [openSeason, setOpenSeason] = useState<number | null>(null)
  const [openEpisode, setOpenEpisode] = useState<number | null>(null)
  const [openDlServer, setOpenDlServer] = useState<string | null>(null)
  
  // Watch select state
  const [watchSeason, setWatchSeason] = useState(1)
  const [watchEpisode, setWatchEpisode] = useState(1)
  const [watchServer, setWatchServer] = useState('Server 1')
  const [showSeasonSelect, setShowSeasonSelect] = useState(false)
  const [showEpisodeSelect, setShowEpisodeSelect] = useState(false)
  const [showServerSelect, setShowServerSelect] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [movieId])

  useEffect(() => {
    // Reset states when tab changes
    setOpenServer(null)
    setOpenSeason(null)
    setOpenEpisode(null)
    setOpenDlServer(null)
    setShowSeasonSelect(false)
    setShowEpisodeSelect(false)
    setShowServerSelect(false)
  }, [activeTab])

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-white mb-4">Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Home
          </button>
        </motion.div>
      </div>
    )
  }

  const isSeries = movie.type === 'series' || movie.type === 'anime'
  const servers = ['Server 1', 'Server 2', 'Server 3', 'Server 4', 'Server 5']
  const availableServers = movie.downloadServers ? Object.keys(movie.downloadServers) : servers

  const getDownloadLinks = (server: string) => {
    if (!movie.downloadServers || !server) return []
    return movie.downloadServers[server] || []
  }

  const getEpisodes = (seasonNum: number) => {
    if (!movie.seasons) return []
    const season = movie.seasons.find(s => s.number === seasonNum)
    return season?.episodes || []
  }

  const getSeasonName = (num: number) => {
    if (!movie.seasons) return ''
    const season = movie.seasons.find(s => s.number === num)
    return season?.name || ''
  }

  return (
    <div className="min-h-screen bg-black pb-8">
      {/* Hero Image with Parallax Effect */}
      <motion.div 
        className="relative w-full h-[280px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        
        {/* Floating buttons */}
        <motion.button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.8)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        
        <motion.button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Heart className={`w-5 h-5 transition-colors ${isBookmarked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
        </motion.button>
      </motion.div>

      {/* Content */}
      <div className="px-4 -mt-20 relative z-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DetailSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Title */}
              <motion.h1 
                className="text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {movie.title}
              </motion.h1>
              
              {/* Meta Info */}
              <motion.div 
                className="flex items-center gap-3 text-sm text-gray-400 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {movie.year}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-white">{movie.rating}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock3 className="w-4 h-4" />
                  {movie.duration}
                </span>
              </motion.div>

              {/* Genres */}
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {movie.genres.map((genre, index) => (
                  <motion.span
                    key={genre}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="px-3 py-1 bg-zinc-800/80 backdrop-blur text-white text-xs rounded-full border border-zinc-700/50"
                  >
                    {genre}
                  </motion.span>
                ))}
              </motion.div>

              {/* Tabs */}
              <motion.div 
                className="flex gap-2 mb-6 overflow-x-auto pb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {[
                  { id: 'detail', icon: FileText, label: 'Detail' },
                  { id: 'watch', icon: Play, label: 'Watch' },
                  { id: 'download', icon: Download, label: 'Download' },
                  { id: 'explore', icon: ThumbsUp, label: 'Explore' },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                        : 'bg-zinc-800/80 text-gray-300 hover:bg-zinc-700/50 border border-zinc-700/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </motion.button>
                ))}
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Detail Tab */}
                  {activeTab === 'detail' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base font-semibold text-white mb-2">Review</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {movie.description || 'No description available.'}
                        </p>
                      </div>
                      {movie.director && (
                        <div>
                          <span className="text-gray-500 text-sm">Director: </span>
                          <span className="text-white text-sm">{movie.director}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500 text-sm">Tags: </span>
                        <span className="text-white text-sm">{movie.genres.join(', ')}</span>
                      </div>
                      {movie.cast && movie.cast.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <h3 className="text-base font-semibold text-white mb-3">Casts</h3>
                          <div className="flex gap-3 overflow-x-auto pb-2">
                            {movie.cast.map((member, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex flex-col items-center min-w-[70px]"
                              >
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-800 mb-1 border-2 border-zinc-700">
                                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs text-white text-center">{member.name}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Watch Tab */}
                  {activeTab === 'watch' && (
                    <div className="space-y-4">
                      {/* Video Player - Always visible */}
                      <motion.div 
                        className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 overflow-hidden relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
                        <div className="text-center relative z-10">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <MonitorPlay className="w-12 h-12 text-red-500 mx-auto mb-2" />
                          </motion.div>
                          <p className="text-white font-medium">Video Player</p>
                          {isSeries && (
                            <p className="text-gray-500 text-sm">S{watchSeason} E{watchEpisode} - {watchServer}</p>
                          )}
                          {!isSeries && (
                            <p className="text-gray-500 text-sm">{watchServer}</p>
                          )}
                        </div>
                      </motion.div>

                      {/* Movies - Only Server Select */}
                      {!isSeries && (
                        <div className="relative z-10">
                          <Select
                            label="Server"
                            value={watchServer}
                            options={servers}
                            isOpen={showServerSelect}
                            onToggle={() => setShowServerSelect(!showServerSelect)}
                            onSelect={(v) => { setWatchServer(v); setShowServerSelect(false); }}
                          />
                        </div>
                      )}

                      {/* Series - Season, Episode, Server Selects */}
                      {isSeries && movie.seasons && (
                        <div className="space-y-3 relative z-10">
                          <Select
                            label="Season"
                            value={getSeasonName(watchSeason)}
                            options={movie.seasons.map(s => s.name)}
                            isOpen={showSeasonSelect}
                            onToggle={() => { setShowSeasonSelect(!showSeasonSelect); setShowEpisodeSelect(false); setShowServerSelect(false); }}
                            onSelect={(v) => {
                              const season = movie.seasons?.find(s => s.name === v);
                              if (season) { setWatchSeason(season.number); setWatchEpisode(1); }
                              setShowSeasonSelect(false);
                            }}
                          />
                          
                          <Select
                            label="Episode"
                            value={`Episode ${watchEpisode}`}
                            options={getEpisodes(watchSeason).map(ep => `Episode ${ep.number}`)}
                            isOpen={showEpisodeSelect}
                            onToggle={() => { setShowEpisodeSelect(!showEpisodeSelect); setShowSeasonSelect(false); setShowServerSelect(false); }}
                            onSelect={(v) => { setWatchEpisode(parseInt(v.replace('Episode ', ''))); setShowEpisodeSelect(false); }}
                          />
                        
                          <Select
                            label="Server"
                            value={watchServer}
                            options={servers}
                            isOpen={showServerSelect}
                            onToggle={() => { setShowServerSelect(!showServerSelect); setShowSeasonSelect(false); setShowEpisodeSelect(false); }}
                            onSelect={(v) => { setWatchServer(v); setShowServerSelect(false); }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Download Tab - Accordion Style */}
                  {activeTab === 'download' && (
                    <div className="space-y-2">
                      {/* Movies - Server Accordion */}
                      {!isSeries && (
                        <div className="space-y-2">
                          {availableServers.map((server, index) => (
                            <motion.div
                              key={server}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Accordion
                                title={server}
                                isOpen={openServer === server}
                                onToggle={() => setOpenServer(openServer === server ? null : server)}
                              >
                                <div className="bg-zinc-900">
                                  <table className="w-full text-xs">
                                    <thead>
                                      <tr className="text-gray-500 border-b border-zinc-800">
                                        <th className="text-left py-2 px-3 font-medium">No</th>
                                        <th className="text-left py-2 px-3 font-medium">Server</th>
                                        <th className="text-left py-2 px-3 font-medium">Size</th>
                                        <th className="text-left py-2 px-3 font-medium">Res</th>
                                        <th className="text-left py-2 px-3 font-medium">Link</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {getDownloadLinks(server).map((dl, index) => (
                                        <motion.tr
                                          key={index}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: index * 0.05 }}
                                          className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                                        >
                                          <td className="py-2 px-3 text-gray-300">{index + 1}</td>
                                          <td className="py-2 px-3 text-red-400 font-medium">{dl.name}</td>
                                          <td className="py-2 px-3 text-gray-300">{dl.size}</td>
                                          <td className="py-2 px-3 text-gray-300">{dl.resolution}</td>
                                          <td className="py-2 px-3">
                                            <motion.button
                                              whileHover={{ scale: 1.05 }}
                                              whileTap={{ scale: 0.95 }}
                                              className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-colors"
                                            >
                                              Download
                                            </motion.button>
                                          </td>
                                        </motion.tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </Accordion>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Series - Season > Episode > Server Accordion */}
                      {isSeries && movie.seasons && (
                        <div className="space-y-2">
                          {movie.seasons.map((season, sIndex) => (
                            <motion.div
                              key={season.number}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: sIndex * 0.05 }}
                            >
                              <Accordion
                                title={season.name}
                                isOpen={openSeason === season.number}
                                onToggle={() => setOpenSeason(openSeason === season.number ? null : season.number)}
                              >
                                <div className="bg-zinc-900 p-2 space-y-2">
                                  {getEpisodes(season.number).map((ep, epIndex) => (
                                    <Accordion
                                      key={ep.number}
                                      title={`Episode ${ep.number}`}
                                      isOpen={openEpisode === ep.number}
                                      onToggle={() => setOpenEpisode(openEpisode === ep.number ? null : ep.number)}
                                    >
                                      <div className="bg-zinc-950 p-2 space-y-2">
                                        {availableServers.map((server) => (
                                          <Accordion
                                            key={server}
                                            title={server}
                                            isOpen={openDlServer === server}
                                            onToggle={() => setOpenDlServer(openDlServer === server ? null : server)}
                                          >
                                            <div className="bg-zinc-900">
                                              <table className="w-full text-xs">
                                                <thead>
                                                  <tr className="text-gray-500 border-b border-zinc-800">
                                                    <th className="text-left py-1.5 px-2 font-medium">No</th>
                                                    <th className="text-left py-1.5 px-2 font-medium">Server</th>
                                                    <th className="text-left py-1.5 px-2 font-medium">Size</th>
                                                    <th className="text-left py-1.5 px-2 font-medium">Res</th>
                                                    <th className="text-left py-1.5 px-2 font-medium">Link</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {getDownloadLinks(server).map((dl, index) => (
                                                    <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                                                      <td className="py-1.5 px-2 text-gray-300">{index + 1}</td>
                                                      <td className="py-1.5 px-2 text-red-400">{dl.name}</td>
                                                      <td className="py-1.5 px-2 text-gray-300">{dl.size}</td>
                                                      <td className="py-1.5 px-2 text-gray-300">{dl.resolution}</td>
                                                      <td className="py-1.5 px-2">
                                                        <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-0.5 rounded transition-colors">
                                                          DL
                                                        </button>
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </tbody>
                                              </table>
                                            </div>
                                          </Accordion>
                                        ))}
                                      </div>
                                    </Accordion>
                                  ))}
                                </div>
                              </Accordion>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Explore Tab */}
                  {activeTab === 'explore' && (
                    <div>
                      <h3 className="text-base font-semibold text-white mb-3">You may also like</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {movies.filter(m => m.id !== movie.id).slice(0, 8).map((m, index) => (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => router.push(`/movie/${m.id}`)}
                            className="cursor-pointer group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="relative aspect-[2/3] rounded overflow-hidden mb-1 bg-zinc-800">
                              <img 
                                src={m.poster} 
                                alt={m.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                              />
                              <div className="absolute bottom-1 right-1 bg-white/90 backdrop-blur rounded px-1 flex items-center gap-0.5">
                                <Star className="w-2.5 h-2.5 text-red-500 fill-red-500" />
                                <span className="text-[10px] font-medium text-black">{m.rating}</span>
                              </div>
                            </div>
                            <p className="text-[10px] text-white truncate group-hover:text-red-400 transition-colors">{m.title}</p>
                            <p className="text-[10px] text-gray-500">{m.year}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
