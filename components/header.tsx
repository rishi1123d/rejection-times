import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="border-b border-gray-200">
      {/* Top bar with date and actions */}
      <div className="border-b border-gray-200 py-2">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">{currentDate}</div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden text-gray-600 hover:text-black">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main header with logo and navigation */}
      <div className="py-4">
        <div className="container mx-auto px-4 md:px-6">
          {/* Logo */}
          <div className="text-center mb-4 border-b border-gray-300 pb-3">
            <Link href="/" className="inline-block">
              <h1 className="nyt-title text-6xl md:text-7xl font-black tracking-tight" style={{ fontFamily: "'UnifrakturCook', cursive" }}>The Rejection Times</h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex justify-center space-x-8 border-t border-b border-gray-200 py-2">
              <li>
                <Link href="/" className="text-gray-900 hover:text-gray-600 font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-900 hover:text-gray-600 font-medium">
                  Browse Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-900 hover:text-gray-600 font-medium">
                  About
                </Link>
              </li>
              <li>
                <Link href="/share" className="text-gray-900 hover:text-gray-600 font-medium">
                  Share Your Story
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

