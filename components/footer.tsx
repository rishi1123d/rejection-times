import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl font-bold mb-4" style={{ fontFamily: "'UnifrakturCook', cursive" }}>The Rejection Times</h2>
            <p className="text-gray-600 mb-4 max-w-md">
              A collection of stories celebrating the setbacks that led to extraordinary comebacks.
            </p>
            <p className="text-gray-600">© {currentYear} <span style={{ fontFamily: "'UnifrakturCook', cursive" }}>The Rejection Times</span>. All rights reserved.</p>
          </div>

          <div>
            <h3 className="font-serif font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-600 hover:text-gray-900">
                  Browse Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/share" className="text-gray-600 hover:text-gray-900">
                  Share Your Story
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:editor@rejectiontimes.com" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

