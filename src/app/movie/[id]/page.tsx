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
} from 'lucide-react'

type TabType = 'detail' | 'watch' | 'download' | 'explore'

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = params.id as string
  const movie = movies.find(m => m.id === movieId)
  
  const [activeTab, setActiveTab] = useState<TabType>('detail')
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  // Watch state
  const [watchSeason, setWatchSeason] = useState(1)
  const [watchEpisode, setWatchEpisode] = useState<number | null>(null)
  const [watchServer, setWatchServer] = useState<string | null>(null)
  
  // Download state  
  const [dlSeason, setDlSeason] = useState(1)
  const [dlEpisode, setDlEpisode] = useState<number | null>(null)
  const [dlServer, setDlServer] = useState<string | null>(null)

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
  const servers = ['Server 1', 'Server 2', 'Server 3']
  const availableServers = movie.downloadServers ? Object.keys(movie.downloadServers) : servers

  // Get download links
  const getDownloadLinks = (server?: string) => {
    const s = server || dlServer
    if (!movie.downloadServers || !s) return []
    return movie.downloadServers[s] || []
  }

  // Get all download links (for movies - combine all servers)
  const getAllDownloadLinks = () => {
    if (!movie.downloadServers) return []
    const allLinks: Array<{name: string; size: string; resolution: string; link: string}> = []
    Object.entries(movie.downloadServers).forEach(([server, links]) => {
      links.forEach(link => allLinks.push(link))
    })
    return allLinks
  }

  // Get episodes for season
  const getEpisodes = (seasonNum: number) => {
    if (!movie.seasons) return []
    const season = movie.seasons.find(s => s.number === seasonNum)
    return season?.episodes || []
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Image */}
      <div className="relative w-full h-[280px]">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Back & Bookmark Buttons */}
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
        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2">{movie.title}</h1>
        
        {/* Meta Info */}
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

        {/* Genres */}
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
              activeTab === 'detail' 
                ? 'bg-red-600 text-white' 
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            Detail
          </button>
          <button
            onClick={() => setActiveTab('watch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'watch' 
                ? 'bg-red-600 text-white' 
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            <Play className="w-4 h-4" />
            Watch
          </button>
          <button
            onClick={() => setActiveTab('download')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'download' 
                ? 'bg-red-600 text-white' 
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'explore' 
                ? 'bg-red-600 text-white' 
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            Explore
          </button>
        </div>

        {/* Tab Content */}
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

        {activeTab === 'watch' && (
          <div className="space-y-4">
            {/* Movies */}
            {!isSeries && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Server</h3>
                  <div className="flex flex-wrap gap-2">
                    {servers.map((server) => (
                      <button
                        key={server}
                        onClick={() => setWatchServer(server)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          watchServer === server 
                            ? 'bg-red-600 text-white' 
                            : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                        }`}
                      >
                        {server}
                      </button>
                    ))}
                  </div>
                </div>
                {watchServer && (
                  <div className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MonitorPlay className="w-12 h-12 text-red-500 mx-auto mb-2" />
                      <p className="text-white">Video Player</p>
                      <p className="text-gray-500 text-sm">{watchServer}</p>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {/* Series */}
            {isSeries && movie.seasons && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Season</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.seasons.map((season) => (
                      <button
                        key={season.number}
                        onClick={() => { setWatchSeason(season.number); setWatchEpisode(null); setWatchServer(null); }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          watchSeason === season.number 
                            ? 'bg-red-600 text-white' 
                            : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                        }`}
                      >
                        {season.name}
                      </button>
                    ))}
                  </div>
                </div>
                {getEpisodes(watchSeason).length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Episode</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {getEpisodes(watchSeason).map((ep) => (
                        <button
                          key={ep.number}
                          onClick={() => setWatchEpisode(ep.number)}
                          className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                            watchEpisode === ep.number 
                              ? 'bg-red-600 text-white' 
                              : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                          }`}
                        >
                          EP {ep.number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {watchEpisode && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Server</h3>
                    <div className="flex flex-wrap gap-2">
                      {servers.map((server) => (
                        <button
                          key={server}
                          onClick={() => setWatchServer(server)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            watchServer === server 
                              ? 'bg-red-600 text-white' 
                              : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                          }`}
                        >
                          {server}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {watchServer && (
                  <div className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MonitorPlay className="w-12 h-12 text-red-500 mx-auto mb-2" />
                      <p className="text-white">Video Player</p>
                      <p className="text-gray-500 text-sm">S{watchSeason} E{watchEpisode} - {watchServer}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'download' && (
          <div className="space-y-4">
            {/* Movies - Server tabs + Download Links together */}
            {!isSeries && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Server</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableServers.map((server) => (
                      <button
                        key={server}
                        onClick={() => setDlServer(server)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          dlServer === server 
                            ? 'bg-red-600 text-white' 
                            : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                        }`}
                      >
                        {server}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Download Links Table */}
                {dlServer && getDownloadLinks().length > 0 && (
                  <div className="border border-zinc-700 rounded-lg overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-zinc-800 text-gray-400">
                          <th className="text-left py-2 px-3 font-medium">No</th>
                          <th className="text-left py-2 px-3 font-medium">Server</th>
                          <th className="text-left py-2 px-3 font-medium">Size</th>
                          <th className="text-left py-2 px-3 font-medium">Resolution</th>
                          <th className="text-left py-2 px-3 font-medium">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getDownloadLinks().map((dl, index) => (
                          <tr key={index} className="border-t border-zinc-800 hover:bg-zinc-800/50">
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
              </>
            )}
            
            {/* Series - Season → Episode → Download Links (no Server step) */}
            {isSeries && movie.seasons && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Season</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.seasons.map((season) => (
                      <button
                        key={season.number}
                        onClick={() => { setDlSeason(season.number); setDlEpisode(null); }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          dlSeason === season.number 
                            ? 'bg-red-600 text-white' 
                            : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                        }`}
                      >
                        {season.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {getEpisodes(dlSeason).length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Episode</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {getEpisodes(dlSeason).map((ep) => (
                        <button
                          key={ep.number}
                          onClick={() => setDlEpisode(ep.number)}
                          className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                            dlEpisode === ep.number 
                              ? 'bg-red-600 text-white' 
                              : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                          }`}
                        >
                          EP {ep.number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Download Links Table - appears after Episode selection */}
                {dlEpisode && (
                  <div className="border border-zinc-700 rounded-lg overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-zinc-800 text-gray-400">
                          <th className="text-left py-2 px-3 font-medium">No</th>
                          <th className="text-left py-2 px-3 font-medium">Server</th>
                          <th className="text-left py-2 px-3 font-medium">Size</th>
                          <th className="text-left py-2 px-3 font-medium">Resolution</th>
                          <th className="text-left py-2 px-3 font-medium">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllDownloadLinks().map((dl, index) => (
                          <tr key={index} className="border-t border-zinc-800 hover:bg-zinc-800/50">
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
              </>
            )}
          </div>
        )}

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
