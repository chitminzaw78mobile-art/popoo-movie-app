'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Search,
  Menu,
  Home as HomeIcon,
  Film,
  Tv,
  Bookmark,
  Grid3X3,
  Clock,
  Download,
  Settings,
  Star,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

// Menu items with routes
export const menuItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: Film, label: 'Movies', path: '/movies' },
  { icon: Tv, label: 'Series', path: '/series' },
  { icon: Bookmark, label: 'Bookmark', path: '/bookmark' },
  { icon: Grid3X3, label: 'Genres', path: '/genres' },
  { icon: Clock, label: 'Recent', path: '/recent' },
  { icon: Download, label: 'Downloads', path: '/downloads' },
  { icon: Settings, label: 'Setting', path: '/settings' },
]

// Bottom nav items
export const bottomNavItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: Film, label: 'Movies', path: '/movies' },
  { icon: Tv, label: 'Series', path: '/series' },
  { icon: Bookmark, label: 'Bookmark', path: '/bookmark' },
  { icon: Clock, label: 'Recent', path: '/recent' },
]

// Movie Card Component
export function MovieCard({ movie, onClick }: { movie: { id: string; title: string; year: number; rating: number; poster: string; type?: string }; onClick?: () => void }) {
  const router = useRouter()
  
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(`/movie/${movie.id}`)
    }
  }

  return (
    <div
      className="cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-white/90 rounded px-1.5 py-0.5 flex items-center gap-1">
          <Star className="h-3 w-3 text-red-500 fill-red-500" />
          <span className="text-xs font-medium text-black">{movie.rating}</span>
        </div>
        {movie.type === 'anime' && (
          <div className="absolute top-2 left-2 bg-purple-600 rounded px-2 py-0.5">
            <span className="text-xs text-white font-medium">Anime</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-white truncate">{movie.title}</h3>
      <p className="text-xs text-muted-foreground">{movie.year}</p>
    </div>
  )
}

// Header Component
export function SiteHeader() {
  const router = useRouter()
  const pathname = usePathname()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="flex items-center justify-between p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-[#1a1a1a] border-r border-border p-0">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <Film className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white tracking-wide">POPOO</h1>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Streaming</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <ScrollArea className="flex-1">
                <nav className="p-4">
                  {menuItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      className={`w-full justify-start gap-4 py-3 px-4 mb-1 rounded-lg ${
                        pathname === item.path
                          ? 'text-red-500 bg-red-500/10'
                          : 'text-white hover:text-red-500 hover:bg-red-500/10'
                      }`}
                      onClick={() => router.push(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  ))}
                </nav>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-bold text-white">POPOO</h1>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/search')}
          className="text-white hover:text-red-500"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

// Bottom Navigation Component
export function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-border">
      <div className="flex justify-around items-center py-2">
        {bottomNavItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`flex flex-col items-center gap-1 py-2 px-3 ${
              pathname === item.path
                ? 'text-red-500'
                : 'text-muted-foreground hover:text-white'
            }`}
            onClick={() => router.push(item.path)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  )
}
