'use client'

import { useState } from 'react'
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
} from 'lucide-react'

type TabType = 'detail' | 'watch' | 'download' | 'explore'

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = params.id as string
  const movie = movies.find(m => m.id === movieId)
  
  const [activeTab, setActiveTab] = useState<TabType>('detail')
  const [isBookmarked, setIsBookmarked] = useState(false)
  
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

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Not Found</h1>
          <Button onClick={() => router.push('/')} className="bg-red-600 hover:bg-red-700">
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  const isSeries = movie.type === 'series' || movie.type === 'anime'

  // Available servers
  const servers = ['Server 1', 'Server 2', 'Server 3', 'Server 4', 'Server 5']
  const availableServers = movie.downloadServers ? Object.keys(movie.downloadServers) : servers

  // Get download links
  const getDownloadLinks = (server: string) => {
    if (!movie.downloadServers || !server) return []
    return movie.downloadServers[server] || []
  }

  // Get episodes for season
  const getEpisodes = (seasonNum: number) => {
    if (!movie.seasons) return []
    const season = movie.seasons.find(s => s.number === seasonNum)
    return season?.episodes || []
  }

  // Get season name
  const getSeasonName = (num: number) => {
    if (!movie.seasons) return ''
    const season = movie.seasons.find(s => s.number === num)
    return season?.name || ''
  }

  return (
    <div className="min-h-screen bg-black pb-8">
      {/* Hero Image */}
      <div className="relative w-full h-[280px]">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center"
        >
          <Heart className={`w-5 h-5 ${isBookmarked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 -mt-20 relative z-10">
        <h1 className="text-2xl font-bold text-white mb-2">{movie.title}</h1>
        
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

        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 bg-zinc-800 text-white text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('detail')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'detail' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            Detail
          </button>
          <button
            onClick={() => setActiveTab('watch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'watch' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            <Play className="w-4 h-4" />
            Watch
          </button>
          <button
            onClick={() => setActiveTab('download')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'download' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'explore' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            Explore
          </button>
        </div>

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
              <div>
                <h3 className="text-base font-semibold text-white mb-3">Casts</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {movie.cast.map((member, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[70px]">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-800 mb-1">
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
          <div className="space-y-4">
            {/* Video Player - Always visible */}
            <div className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
              <div className="text-center">
                <MonitorPlay className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-white font-medium">Video Player</p>
                {isSeries && (
                  <p className="text-gray-500 text-sm">S{watchSeason} E{watchEpisode} - {watchServer}</p>
                )}
                {!isSeries && (
                  <p className="text-gray-500 text-sm">{watchServer}</p>
                )}
              </div>
            </div>

            {/* Movies - Only Server Select */}
            {!isSeries && (
              <div className="relative">
                <label className="text-xs text-gray-400 mb-1 block">Server</label>
                <button
                  onClick={() => setShowServerSelect(!showServerSelect)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between text-white text-sm"
                >
                  <span>{watchServer}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showServerSelect ? 'rotate-180' : ''}`} />
                </button>
                {showServerSelect && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden z-20">
                    {servers.map((server) => (
                      <button
                        key={server}
                        onClick={() => { setWatchServer(server); setShowServerSelect(false); }}
                        className={`w-full px-4 py-2.5 text-left text-sm ${watchServer === server ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
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
                {/* Season Select */}
                <div className="relative">
                  <label className="text-xs text-gray-400 mb-1 block">Season</label>
                  <button
                    onClick={() => { setShowSeasonSelect(!showSeasonSelect); setShowEpisodeSelect(false); setShowServerSelect(false); }}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between text-white text-sm"
                  >
                    <span>{getSeasonName(watchSeason)}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showSeasonSelect ? 'rotate-180' : ''}`} />
                  </button>
                  {showSeasonSelect && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden z-20">
                      {movie.seasons.map((season) => (
                        <button
                          key={season.number}
                          onClick={() => { setWatchSeason(season.number); setWatchEpisode(1); setShowSeasonSelect(false); }}
                          className={`w-full px-4 py-2.5 text-left text-sm ${watchSeason === season.number ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                        >
                          {season.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Episode Select */}
                <div className="relative">
                  <label className="text-xs text-gray-400 mb-1 block">Episode</label>
                  <button
                    onClick={() => { setShowEpisodeSelect(!showEpisodeSelect); setShowSeasonSelect(false); setShowServerSelect(false); }}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between text-white text-sm"
                  >
                    <span>Episode {watchEpisode}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showEpisodeSelect ? 'rotate-180' : ''}`} />
                  </button>
                  {showEpisodeSelect && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden z-20 max-h-60 overflow-y-auto">
                      {getEpisodes(watchSeason).map((ep) => (
                        <button
                          key={ep.number}
                          onClick={() => { setWatchEpisode(ep.number); setShowEpisodeSelect(false); }}
                          className={`w-full px-4 py-2.5 text-left text-sm ${watchEpisode === ep.number ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                        >
                          Episode {ep.number}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Server Select */}
                <div className="relative">
                  <label className="text-xs text-gray-400 mb-1 block">Server</label>
                  <button
                    onClick={() => { setShowServerSelect(!showServerSelect); setShowSeasonSelect(false); setShowEpisodeSelect(false); }}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between text-white text-sm"
                  >
                    <span>{watchServer}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showServerSelect ? 'rotate-180' : ''}`} />
                  </button>
                  {showServerSelect && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden z-20">
                      {servers.map((server) => (
                        <button
                          key={server}
                          onClick={() => { setWatchServer(server); setShowServerSelect(false); }}
                          className={`w-full px-4 py-2.5 text-left text-sm ${watchServer === server ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
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
          <div className="space-y-2">
            {/* Movies - Server Accordion */}
            {!isSeries && (
              <div className="space-y-2">
                {availableServers.map((server) => (
                  <div key={server} className="border border-zinc-700 rounded-lg overflow-hidden">
                    {/* Server Header */}
                    <button
                      onClick={() => setOpenServer(openServer === server ? null : server)}
                      className="w-full bg-zinc-800 px-4 py-3 flex items-center justify-between"
                    >
                      <span className="text-white font-medium">{server}</span>
                      {openServer === server ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {/* Download Links - Shows when open */}
                    {openServer === server && getDownloadLinks(server).length > 0 && (
                      <div className="bg-zinc-900">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-gray-500 border-b border-zinc-800">
                              <th className="text-left py-2 px-3 font-medium">No</th>
                              <th className="text-left py-2 px-3 font-medium">Server</th>
                              <th className="text-left py-2 px-3 font-medium">Size</th>
                              <th className="text-left py-2 px-3 font-medium">Resolution</th>
                              <th className="text-left py-2 px-3 font-medium">Link</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getDownloadLinks(server).map((dl, index) => (
                              <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                                <td className="py-2 px-3 text-gray-300">{index + 1}</td>
                                <td className="py-2 px-3 text-red-400">{dl.name}</td>
                                <td className="py-2 px-3 text-gray-300">{dl.size}</td>
                                <td className="py-2 px-3 text-gray-300">{dl.resolution}</td>
                                <td className="py-2 px-3">
                                  <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded">
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
                ))}
              </div>
            )}

            {/* Series - Season > Episode > Server Accordion */}
            {isSeries && movie.seasons && (
              <div className="space-y-2">
                {movie.seasons.map((season) => (
                  <div key={season.number} className="border border-zinc-700 rounded-lg overflow-hidden">
                    {/* Season Header */}
                    <button
                      onClick={() => setOpenSeason(openSeason === season.number ? null : season.number)}
                      className="w-full bg-zinc-800 px-4 py-3 flex items-center justify-between"
                    >
                      <span className="text-white font-medium">{season.name}</span>
                      {openSeason === season.number ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {/* Episodes */}
                    {openSeason === season.number && (
                      <div className="bg-zinc-900 p-2 space-y-2">
                        {getEpisodes(season.number).map((ep) => (
                          <div key={ep.number} className="border border-zinc-700 rounded overflow-hidden">
                            {/* Episode Header */}
                            <button
                              onClick={() => openDlEpisode(openEpisode === ep.number ? null : ep.number)}
                              className="w-full bg-zinc-800 px-4 py-2.5 flex items-center justify-between"
                            >
                              <span className="text-gray-200 text-sm">Episode {ep.number}</span>
                              {openEpisode === ep.number ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                            
                            {/* Servers */}
                            {openEpisode === ep.number && (
                              <div className="bg-zinc-900 p-2 space-y-2">
                                {availableServers.map((server) => (
                                  <div key={server} className="border border-zinc-700 rounded overflow-hidden">
                                    {/* Server Header */}
                                    <button
                                      onClick={() => setOpenDlServer(openDlServer === server ? null : server)}
                                      className="w-full bg-zinc-800 px-3 py-2 flex items-center justify-between"
                                    >
                                      <span className="text-gray-300 text-xs">{server}</span>
                                      {openDlServer === server ? (
                                        <ChevronUp className="w-3 h-3 text-gray-500" />
                                      ) : (
                                        <ChevronDown className="w-3 h-3 text-gray-500" />
                                      )}
                                    </button>
                                    
                                    {/* Download Links */}
                                    {openDlServer === server && getDownloadLinks(server).length > 0 && (
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
                                              <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                                                <td className="py-1.5 px-2 text-gray-300">{index + 1}</td>
                                                <td className="py-1.5 px-2 text-red-400">{dl.name}</td>
                                                <td className="py-1.5 px-2 text-gray-300">{dl.size}</td>
                                                <td className="py-1.5 px-2 text-gray-300">{dl.resolution}</td>
                                                <td className="py-1.5 px-2">
                                                  <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-0.5 rounded">
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
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
              {movies.filter(m => m.id !== movie.id).slice(0, 8).map((m) => (
                <div
                  key={m.id}
                  onClick={() => router.push(`/movie/${m.id}`)}
                  className="cursor-pointer"
                >
                  <div className="relative aspect-[2/3] rounded overflow-hidden mb-1">
                    <img src={m.poster} alt={m.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-1 right-1 bg-white/90 rounded px-1 flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 text-red-500 fill-red-500" />
                      <span className="text-[10px] font-medium text-black">{m.rating}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white truncate">{m.title}</p>
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
