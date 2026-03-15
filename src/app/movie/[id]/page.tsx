'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { movies, watchServers, downloadServerNames, type Movie } from '@/data/movies'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  
  // Watch state
  const [watchServer, setWatchServer] = useState<string | null>(null)
  const [watchSeason, setWatchSeason] = useState<number>(1)
  const [watchEpisode, setWatchEpisode] = useState<number | null>(null)
  const [showVideo, setShowVideo] = useState(false)
  
  // Download state
  const [dlServer, setDlServer] = useState<string | null>(null)
  const [dlSeason, setDlSeason] = useState<number>(1)
  const [dlEpisode, setDlEpisode] = useState<number | null>(null)

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
          <Button onClick={() => router.push('/')} className="bg-red-600 hover:bg-red-700">
            Go Back Home
          </Button>
        </div>
      </div>
    )
  }

  const isSeries = movie.type === 'series' || movie.type === 'anime'

  const handleBack = () => {
    router.push('/')
  }

  const handleMovieClick = (selectedMovie: Movie) => {
    router.push(`/movie/${selectedMovie.id}`)
    setActiveTab('detail')
    setWatchServer(null)
    setWatchEpisode(null)
    setShowVideo(false)
    setDlServer(null)
    setDlEpisode(null)
  }

  // Get available download servers for this movie
  const availableServers = movie.downloadServers 
    ? downloadServerNames.filter(s => movie.downloadServers![s])
    : []

  // Get download links for selected server
  const getDownloadLinks = () => {
    if (!movie.downloadServers || !dlServer) return []
    return movie.downloadServers[dlServer] || []
  }

  // Get current season episodes
  const getEpisodes = (seasonNum: number) => {
    if (!movie.seasons) return []
    const season = movie.seasons.find(s => s.number === seasonNum)
    return season?.episodes || []
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Hero Section */}
      <div className="relative h-72 sm:h-80">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back and Bookmark buttons */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="bg-black/50 backdrop-blur-sm text-white hover:text-red-500 hover:bg-black/70 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 backdrop-blur-sm text-red-500 hover:text-red-400 hover:bg-black/70 rounded-full"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-16 relative z-10">
        {/* Title & Info */}
        <h1 className="text-2xl font-bold text-white mb-3">{movie.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-red-500 fill-red-500" />
            <span className="text-white">{movie.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock3 className="h-4 w-4" />
            <span>{movie.duration}</span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres.map((genre) => (
            <Badge
              key={genre}
              variant="secondary"
              className="bg-secondary text-white rounded-full px-3 py-1"
            >
              {genre}
            </Badge>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="mt-4">
          <TabsList className="bg-secondary w-full justify-start rounded-lg p-1 h-auto overflow-x-auto">
            <TabsTrigger
              value="detail"
              className="flex-1 min-w-fit data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg py-2 px-4"
            >
              <FileText className="h-4 w-4 mr-2" />
              Detail
            </TabsTrigger>
            <TabsTrigger
              value="watch"
              className="flex-1 min-w-fit data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg py-2 px-4"
            >
              <Play className="h-4 w-4 mr-2" />
              Watch
            </TabsTrigger>
            <TabsTrigger
              value="download"
              className="flex-1 min-w-fit data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg py-2 px-4"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </TabsTrigger>
            <TabsTrigger
              value="explore"
              className="flex-1 min-w-fit data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg py-2 px-4"
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Explore
            </TabsTrigger>
          </TabsList>

          {/* Detail Tab */}
          <TabsContent value="detail" className="mt-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Review</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {movie.description}
              </p>
            </div>

            {movie.director && (
              <div className="mb-4">
                <span className="text-white font-medium">Director : </span>
                <span className="text-muted-foreground">{movie.director}</span>
              </div>
            )}

            <div className="mb-4">
              <span className="text-white font-medium">Tags : </span>
              <span className="text-muted-foreground">{movie.genres.join(', ')}</span>
            </div>

            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Casts</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                  {movie.cast.map((member, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[80px]">
                      <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-secondary">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-white text-center">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Watch Tab */}
          <TabsContent value="watch" className="mt-4">
            {/* For Movies */}
            {!isSeries && (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Server</h3>
                  <div className="flex flex-wrap gap-2">
                    {watchServers.map((server) => (
                      <Button
                        key={server}
                        variant="secondary"
                        className={`rounded-lg px-4 py-2 ${
                          watchServer === server
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-secondary text-white hover:bg-secondary/80'
                        }`}
                        onClick={() => {
                          setWatchServer(server)
                          setShowVideo(true)
                        }}
                      >
                        {server}
                      </Button>
                    ))}
                  </div>
                </div>

                {showVideo && watchServer && (
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center mt-4">
                    <div className="text-center">
                      <MonitorPlay className="h-16 w-16 text-red-500 mx-auto mb-4" />
                      <p className="text-white text-lg font-medium">Video Player</p>
                      <p className="text-muted-foreground text-sm">{watchServer}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* For Series/Anime */}
            {isSeries && movie.seasons && (
              <>
                {/* Season */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Season</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.seasons.map((season) => (
                      <Button
                        key={season.number}
                        variant="secondary"
                        className={`rounded-lg px-4 py-2 ${
                          watchSeason === season.number
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-secondary text-white hover:bg-secondary/80'
                        }`}
                        onClick={() => {
                          setWatchSeason(season.number)
                          setWatchEpisode(null)
                          setWatchServer(null)
                          setShowVideo(false)
                        }}
                      >
                        {season.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Episode */}
                {getEpisodes(watchSeason).length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Episode</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {getEpisodes(watchSeason).map((ep) => (
                        <Button
                          key={ep.number}
                          variant="secondary"
                          className={`rounded-lg py-3 ${
                            watchEpisode === ep.number
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-secondary text-white hover:bg-secondary/80'
                          }`}
                          onClick={() => setWatchEpisode(ep.number)}
                        >
                          EP {ep.number}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Server */}
                {watchEpisode && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Server</h3>
                    <div className="flex flex-wrap gap-2">
                      {watchServers.map((server) => (
                        <Button
                          key={server}
                          variant="secondary"
                          className={`rounded-lg px-4 py-2 ${
                            watchServer === server
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-secondary text-white hover:bg-secondary/80'
                          }`}
                          onClick={() => {
                            setWatchServer(server)
                            setShowVideo(true)
                          }}
                        >
                          {server}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Player */}
                {showVideo && watchServer && (
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center mt-4">
                    <div className="text-center">
                      <MonitorPlay className="h-16 w-16 text-red-500 mx-auto mb-4" />
                      <p className="text-white text-lg font-medium">Video Player</p>
                      <p className="text-muted-foreground text-sm">
                        S{watchSeason} E{watchEpisode} - {watchServer}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Download Tab */}
          <TabsContent value="download" className="mt-4">
            {/* For Movies */}
            {!isSeries && (
              <>
                {/* Server */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Server</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableServers.map((server) => (
                      <Button
                        key={server}
                        variant="secondary"
                        className={`rounded-lg px-4 py-2 ${
                          dlServer === server
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-secondary text-white hover:bg-secondary/80'
                        }`}
                        onClick={() => setDlServer(server)}
                      >
                        {server}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Download Links Table for Movies */}
                {dlServer && getDownloadLinks().length > 0 && (
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm text-white">
                      <thead>
                        <tr className="border-b border-border bg-secondary/30">
                          <th className="text-left py-2.5 px-3 text-xs font-medium">No</th>
                          <th className="text-left py-2.5 px-3 text-xs font-medium">Server</th>
                          <th className="text-left py-2.5 px-3 text-xs font-medium">Size</th>
                          <th className="text-left py-2.5 px-3 text-xs font-medium">Resolution</th>
                          <th className="text-left py-2.5 px-3 text-xs font-medium">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getDownloadLinks().map((dl, index) => (
                          <tr key={index} className="border-b border-border/30 hover:bg-secondary/20">
                            <td className="py-2.5 px-3 text-xs">{index + 1}</td>
                            <td className="py-2.5 px-3 text-xs text-red-400 font-medium">{dl.name}</td>
                            <td className="py-2.5 px-3 text-xs">{dl.size}</td>
                            <td className="py-2.5 px-3 text-xs">{dl.resolution}</td>
                            <td className="py-2.5 px-3">
                              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs h-7 px-3">
                                Download
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* For Series/Anime */}
            {isSeries && movie.seasons && (
              <>
                {/* Season */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Season</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.seasons.map((season) => (
                      <Button
                        key={season.number}
                        variant="secondary"
                        className={`rounded-lg px-4 py-2 ${
                          dlSeason === season.number
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-secondary text-white hover:bg-secondary/80'
                        }`}
                        onClick={() => {
                          setDlSeason(season.number)
                          setDlEpisode(null)
                          setDlServer(null)
                        }}
                      >
                        {season.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Episode */}
                {getEpisodes(dlSeason).length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Episode</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {getEpisodes(dlSeason).map((ep) => (
                        <Button
                          key={ep.number}
                          variant="secondary"
                          className={`rounded-lg py-3 ${
                            dlEpisode === ep.number
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-secondary text-white hover:bg-secondary/80'
                          }`}
                          onClick={() => setDlEpisode(ep.number)}
                        >
                          EP {ep.number}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Server */}
                {dlEpisode && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Server</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableServers.map((server) => (
                        <Button
                          key={server}
                          variant="secondary"
                          className={`rounded-lg px-4 py-2 ${
                            dlServer === server
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-secondary text-white hover:bg-secondary/80'
                          }`}
                          onClick={() => setDlServer(server)}
                        >
                          {server}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Download Links Table for Series */}
                {dlServer && getDownloadLinks().length > 0 && (
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm text-white">
                      <thead>
                        <tr className="border-b border-border bg-secondary/30">
                          <th className="text-left py-2.5 px-3 text-xs font-medium">No</th>
                          <th className="text-left py-2.5 px-3 text-xs font-medium">Server</th>
                          <th className="text-left py-2.5 px-3 text-xs font-medium">Size</th>
                          <th className="text-left py-2.5 px-3 text-xs font-medium">Resolution</th>
                          <th className="text-left py-2.5 px-3 text-xs font-medium">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getDownloadLinks().map((dl, index) => (
                          <tr key={index} className="border-b border-border/30 hover:bg-secondary/20">
                            <td className="py-2.5 px-3 text-xs">{index + 1}</td>
                            <td className="py-2.5 px-3 text-xs text-red-400 font-medium">{dl.name}</td>
                            <td className="py-2.5 px-3 text-xs">{dl.size}</td>
                            <td className="py-2.5 px-3 text-xs">{dl.resolution}</td>
                            <td className="py-2.5 px-3">
                              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs h-7 px-3">
                                Download
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Explore Tab */}
          <TabsContent value="explore" className="mt-4">
            <h3 className="text-lg font-semibold text-white mb-4">You may also like</h3>
            <div className="grid grid-cols-4 gap-2">
              {movies.filter(m => m.id !== movie.id).slice(0, 8).map((m) => (
                <div
                  key={m.id}
                  className="cursor-pointer group"
                  onClick={() => handleMovieClick(m)}
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-1">
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1 right-1 bg-white/90 rounded px-1 py-0.5 flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 text-red-500 fill-red-500" />
                      <span className="text-[10px] font-medium text-black">{m.rating}</span>
                    </div>
                  </div>
                  <h4 className="text-[10px] font-medium text-white truncate">{m.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{m.year}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
