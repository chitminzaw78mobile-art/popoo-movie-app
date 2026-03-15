'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { movies, type Movie } from '@/data/movies'
import { Button } from '@/components/ui/button'
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
  Loader2,
} from 'lucide-react'

type TabType = 'detail' | 'watch' | 'download' | 'explore'

// Skeleton Loading Component
const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-zinc-800 rounded ${className}`} />
)

// Fade In Animation Wrapper
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div 
    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
)

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = params.id as string
  const movie = movies.find(m => m.id === movieId)
  
  const [activeTab, setActiveTab] = useState<TabType>('detail')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Download accordion state
  const [openServer, setOpenServer] = useState<string | null>(null)
  const [openSeason, setOpenSeason] = useState<number | null>(null)
  const [openEpisode, openDlEpisode] = useState<number | null>(null)
  const [openDlServer, setOpenDlServer] = useState<string | null>(null)
  
  // Watch select state
  const [watchSeason, setWatchSeason] = useState<number>(1)
  const [watchEpisode, setWatchEpisode] = useState<number>(1)
  const [watchServer, setWatchServer] = useState<string>('Server 1')
  const [showSeasonSelect, setShowSeasonSelect] = useState(false)
  const [showEpisodeSelect, setShowEpisodeSelect] = useState(false)
  const [showServerSelect, setShowServerSelect] = useState(false)
  
  // Video loading state
  const [isVideoLoading, setIsVideoLoading] = useState(false)

  // Simulate loading on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [movieId])

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <h1 className="text-2xl font-bold text-white mb-4">Not Found</h1>
          <Button onClick={() => router.push('/')} className="bg-red-600 hover:bg-red-700">
            Go Home
          </Button>
        </div>
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

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Skeleton className="w-full h-[280px] rounded-none" />
        <div className="px-4 -mt-20 relative z-10">
          <Skeleton className="h-8 w-3/4 mb-3" />
          <Skeleton className="h-4 w-1/2 mb-3" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          <div className="flex gap-2 mb-6">
            {[1,2,3,4].map(i => (
              <Skeleton key={i} className="h-10 w-20 rounded-lg" />
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pb-8">
      {/* Hero Image with Shimmer Effect */}
      <div className="relative w-full h-[280px] overflow-hidden group">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:scale-110"
        >
          <Heart className={`w-5 h-5 transition-all duration-300 ${isBookmarked ? 'text-red-500 fill-red-500 scale-110' : 'text-white'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 -mt-20 relative z-10">
        <FadeIn>
          <h1 className="text-2xl font-bold text-white mb-2">{movie.title}</h1>
        </FadeIn>
        
        <FadeIn delay={100}>
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
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
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre, i) => (
              <span
                key={genre}
                className="px-3 py-1 bg-zinc-800 text-white text-xs rounded-full transition-all duration-300 hover:bg-zinc-700 cursor-pointer"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {genre}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={200}>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'detail', icon: FileText, label: 'Detail' },
              { id: 'watch', icon: Play, label: 'Watch' },
              { id: 'download', icon: Download, label: 'Download' },
              { id: 'explore', icon: ThumbsUp, label: 'Explore' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-red-600 text-white scale-105 shadow-lg shadow-red-600/25' 
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:scale-102'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Detail Tab */}
        {activeTab === 'detail' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Review</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {movie.description || 'No description available.'}
              </p>
            </div>
            {movie.director && (
              <div className="animate-in fade-in duration-300" style={{animationDelay: '100ms'}}>
                <span className="text-gray-500 text-sm">Director: </span>
                <span className="text-white text-sm">{movie.director}</span>
              </div>
            )}
            <div className="animate-in fade-in duration-300" style={{animationDelay: '150ms'}}>
              <span className="text-gray-500 text-sm">Tags: </span>
              <span className="text-white text-sm">{movie.genres.join(', ')}</span>
            </div>
            {movie.cast && movie.cast.length > 0 && (
              <div className="animate-in fade-in duration-300" style={{animationDelay: '200ms'}}>
                <h3 className="text-base font-semibold text-white mb-3">Casts</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {movie.cast.map((member, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col items-center min-w-[70px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-800 mb-1 ring-2 ring-transparent hover:ring-red-500 transition-all duration-300">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-white text-center">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Watch Tab */}
        {activeTab === 'watch' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Video Player */}
            <div 
              className="aspect-video bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 overflow-hidden relative group cursor-pointer"
              onClick={() => setIsVideoLoading(true)}
            >
              <img 
                src={movie.backdrop || movie.poster} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
              />
              <div className="text-center relative z-10">
                {isVideoLoading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-2" />
                    <p className="text-white animate-pulse">Loading...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-3 mx-auto transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-red-600/30">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-white font-medium">Play Video</p>
                    {isSeries && (
                      <p className="text-gray-400 text-sm mt-1">S{watchSeason} E{watchEpisode} - {watchServer}</p>
                    )}
                    {!isSeries && (
                      <p className="text-gray-400 text-sm mt-1">{watchServer}</p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Movies - Only Server Select */}
            {!isSeries && (
              <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-300" style={{animationDelay: '100ms'}}>
                <label className="text-xs text-gray-400 mb-2 block font-medium">Server</label>
                <button
                  onClick={() => setShowServerSelect(!showServerSelect)}
                  className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3.5 flex items-center justify-between text-white text-sm transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-600"
                >
                  <span>{watchServer}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showServerSelect ? 'rotate-180' : ''}`} />
                </button>
                {showServerSelect && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden z-20 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {servers.map((server, i) => (
                      <button
                        key={server}
                        onClick={() => { setWatchServer(server); setShowServerSelect(false); }}
                        className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 ${watchServer === server ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                        style={{ animationDelay: `${i * 30}ms` }}
                      >
                        {server}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Series - Season, Episode, Server Selects */}
            {isSeries && movie.seasons && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {/* Season Select */}
                  <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-300" style={{animationDelay: '100ms'}}>
                    <label className="text-xs text-gray-400 mb-2 block font-medium">Season</label>
                    <button
                      onClick={() => { setShowSeasonSelect(!showSeasonSelect); setShowEpisodeSelect(false); setShowServerSelect(false); }}
                      className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3 flex items-center justify-between text-white text-sm transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-600"
                    >
                      <span className="truncate">{getSeasonName(watchSeason)}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${showSeasonSelect ? 'rotate-180' : ''}`} />
                    </button>
                    {showSeasonSelect && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden z-20 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                        {movie.seasons.map((season, i) => (
                          <button
                            key={season.number}
                            onClick={() => { setWatchSeason(season.number); setWatchEpisode(1); setShowSeasonSelect(false); }}
                            className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${watchSeason === season.number ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                          >
                            {season.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Episode Select */}
                  <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-300" style={{animationDelay: '150ms'}}>
                    <label className="text-xs text-gray-400 mb-2 block font-medium">Episode</label>
                    <button
                      onClick={() => { setShowEpisodeSelect(!showEpisodeSelect); setShowSeasonSelect(false); setShowServerSelect(false); }}
                      className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3 flex items-center justify-between text-white text-sm transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-600"
                    >
                      <span>EP {watchEpisode}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showEpisodeSelect ? 'rotate-180' : ''}`} />
                    </button>
                    {showEpisodeSelect && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden z-20 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-48 overflow-y-auto">
                        {getEpisodes(watchSeason).map((ep) => (
                          <button
                            key={ep.number}
                            onClick={() => { setWatchEpisode(ep.number); setShowEpisodeSelect(false); }}
                            className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${watchEpisode === ep.number ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                          >
                            Episode {ep.number}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Server Select */}
                <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-300" style={{animationDelay: '200ms'}}>
                  <label className="text-xs text-gray-400 mb-2 block font-medium">Server</label>
                  <button
                    onClick={() => { setShowServerSelect(!showServerSelect); setShowSeasonSelect(false); setShowEpisodeSelect(false); }}
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3 flex items-center justify-between text-white text-sm transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-600"
                  >
                    <span>{watchServer}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showServerSelect ? 'rotate-180' : ''}`} />
                  </button>
                  {showServerSelect && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden z-20 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      {servers.map((server) => (
                        <button
                          key={server}
                          onClick={() => { setWatchServer(server); setShowServerSelect(false); }}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${watchServer === server ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                        >
                          {server}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Download Tab - Accordion Style */}
        {activeTab === 'download' && (
          <div className="space-y-2 animate-in fade-in duration-500">
            {/* Movies - Server Accordion */}
            {!isSeries && (
              <div className="space-y-2">
                {availableServers.map((server, index) => (
                  <div 
                    key={server} 
                    className="border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-zinc-700 animate-in fade-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <button
                      onClick={() => setOpenServer(openServer === server ? null : server)}
                      className="w-full bg-zinc-800/50 px-4 py-3.5 flex items-center justify-between transition-all duration-300 hover:bg-zinc-800"
                    >
                      <span className="text-white font-medium">{server}</span>
                      <div className={`w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center transition-transform duration-300 ${openServer === server ? 'rotate-180 bg-red-600' : ''}`}>
                        <ChevronDown className="w-4 h-4 text-white" />
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${openServer === server ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {getDownloadLinks(server).length > 0 && (
                        <div className="bg-zinc-900/50">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="text-gray-500 border-b border-zinc-800">
                                <th className="text-left py-2.5 px-3 font-medium">#</th>
                                <th className="text-left py-2.5 px-3 font-medium">Server</th>
                                <th className="text-left py-2.5 px-3 font-medium">Size</th>
                                <th className="text-left py-2.5 px-3 font-medium">Res</th>
                                <th className="text-left py-2.5 px-3 font-medium">Link</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getDownloadLinks(server).map((dl, i) => (
                                <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors duration-200">
                                  <td className="py-2.5 px-3 text-gray-400">{i + 1}</td>
                                  <td className="py-2.5 px-3 text-red-400 font-medium">{dl.name}</td>
                                  <td className="py-2.5 px-3 text-gray-300">{dl.size}</td>
                                  <td className="py-2.5 px-3 text-gray-300">{dl.resolution}</td>
                                  <td className="py-2.5 px-3">
                                    <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-xs px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/20">
                                      Download
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Series - Season > Episode > Server Accordion */}
            {isSeries && movie.seasons && (
              <div className="space-y-2">
                {movie.seasons.map((season, sIndex) => (
                  <div 
                    key={season.number} 
                    className="border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-zinc-700 animate-in fade-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${sIndex * 80}ms` }}
                  >
                    <button
                      onClick={() => setOpenSeason(openSeason === season.number ? null : season.number)}
                      className="w-full bg-zinc-800/50 px-4 py-3.5 flex items-center justify-between transition-all duration-300 hover:bg-zinc-800"
                    >
                      <span className="text-white font-medium">{season.name}</span>
                      <div className={`w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center transition-transform duration-300 ${openSeason === season.number ? 'rotate-180 bg-red-600' : ''}`}>
                        <ChevronDown className="w-4 h-4 text-white" />
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${openSeason === season.number ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="bg-zinc-900/30 p-2 space-y-1.5">
                        {getEpisodes(season.number).map((ep, epIndex) => (
                          <div key={ep.number} className="border border-zinc-800 rounded-lg overflow-hidden">
                            <button
                              onClick={() => openDlEpisode(openEpisode === ep.number ? null : ep.number)}
                              className="w-full bg-zinc-800/30 px-4 py-2.5 flex items-center justify-between transition-all duration-300 hover:bg-zinc-800/50"
                            >
                              <span className="text-gray-200 text-sm">Episode {ep.number}</span>
                              <div className={`w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center transition-transform duration-300 ${openEpisode === ep.number ? 'rotate-180 bg-red-600' : ''}`}>
                                <ChevronDown className="w-3 h-3 text-white" />
                              </div>
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-300 ${openEpisode === ep.number ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="bg-zinc-900/50 p-1.5 space-y-1">
                                {availableServers.map((server) => (
                                  <div key={server} className="border border-zinc-800/50 rounded overflow-hidden">
                                    <button
                                      onClick={() => setOpenDlServer(openDlServer === server ? null : server)}
                                      className="w-full bg-zinc-800/20 px-3 py-2 flex items-center justify-between transition-all duration-200 hover:bg-zinc-800/40"
                                    >
                                      <span className="text-gray-300 text-xs">{server}</span>
                                      <div className={`w-4 h-4 rounded-full bg-zinc-700 flex items-center justify-center transition-transform duration-200 ${openDlServer === server ? 'rotate-180 bg-red-500' : ''}`}>
                                        <ChevronDown className="w-2.5 h-2.5 text-white" />
                                      </div>
                                    </button>
                                    
                                    <div className={`overflow-hidden transition-all duration-200 ${openDlServer === server ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                      {getDownloadLinks(server).length > 0 && (
                                        <div className="bg-zinc-900">
                                          <table className="w-full text-xs">
                                            <thead>
                                              <tr className="text-gray-500 border-b border-zinc-800">
                                                <th className="text-left py-1.5 px-2">#</th>
                                                <th className="text-left py-1.5 px-2">Server</th>
                                                <th className="text-left py-1.5 px-2">Size</th>
                                                <th className="text-left py-1.5 px-2">Res</th>
                                                <th className="text-left py-1.5 px-2">Link</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {getDownloadLinks(server).map((dl, i) => (
                                                <tr key={i} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                                  <td className="py-1.5 px-2 text-gray-400">{i + 1}</td>
                                                  <td className="py-1.5 px-2 text-red-400">{dl.name}</td>
                                                  <td className="py-1.5 px-2 text-gray-300">{dl.size}</td>
                                                  <td className="py-1.5 px-2 text-gray-300">{dl.resolution}</td>
                                                  <td className="py-1.5 px-2">
                                                    <button className="bg-red-600 hover:bg-red-500 text-white text-xs px-2 py-0.5 rounded transition-colors">
                                                      DL
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Explore Tab */}
        {activeTab === 'explore' && (
          <div className="animate-in fade-in duration-500">
            <h3 className="text-base font-semibold text-white mb-3">You may also like</h3>
            <div className="grid grid-cols-4 gap-2">
              {movies.filter(m => m.id !== movie.id).slice(0, 8).map((m, index) => (
                <div
                  key={m.id}
                  onClick={() => router.push(`/movie/${m.id}`)}
                  className="cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-1 group">
                    <img 
                      src={m.poster} 
                      alt={m.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-1 right-1 bg-white/95 backdrop-blur-sm rounded px-1.5 flex items-center gap-0.5 shadow-lg">
                      <Star className="w-2.5 h-2.5 text-red-500 fill-red-500" />
                      <span className="text-[10px] font-bold text-black">{m.rating}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white truncate group-hover:text-red-400 transition-colors">{m.title}</p>
                  <p className="text-[10px] text-gray-500">{m.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
