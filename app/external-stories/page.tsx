import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"

// This data structure will hold the external stories
// You can replace this with your actual list of 40-50 links
const externalSuccessStories = [
  {
    id: "1",
    title: "How Rejection Led to a $1B Startup",
    description: "After being turned down by 20 investors, this founder built a unicorn company.",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com/example-story",
    imageUrl: "/images/placeholder.jpg", // Replace with actual image URLs
    date: "March 30, 2025",
  },
  {
    id: "2",
    title: "Rejected by YC Three Times, Now Valued at $500M",
    description: "This founder's persistence through multiple Y Combinator rejections finally paid off.",
    source: "Forbes",
    sourceUrl: "https://forbes.com/example-story",
    imageUrl: "/images/placeholder.jpg",
    date: "March 28, 2025",
  },
  {
    id: "3",
    title: "From College Dropout to Tech Giant",
    description: "How being asked to leave university became the catalyst for building a tech empire.",
    source: "Fast Company",
    sourceUrl: "https://fastcompany.com/example-story",
    imageUrl: "/images/placeholder.jpg",
    date: "March 25, 2025",
  },
  // Add your remaining 40-50 stories here
];

export default function ExternalStories() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-gray-700 hover:text-black flex items-center gap-1 mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Success Stories From Around the Web</h1>
        <p className="text-xl text-gray-700 mb-10 max-w-3xl">
          A curated collection of inspiring stories from various publications, featuring entrepreneurs and visionaries who turned rejection into remarkable success.
        </p>

        {/* Featured external story */}
        <div className="mb-12 border-b border-gray-200 pb-10">
          {externalSuccessStories.slice(0, 1).map((story) => (
            <div key={story.id} className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-100 aspect-[4/3] relative">
                <Image 
                  src={story.imageUrl} 
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm text-gray-500 mb-2">{story.date} • {story.source}</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight hover:underline">
                  <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    {story.title}
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </h2>
                <p className="text-lg text-gray-700 mb-4">{story.description}</p>
                <a 
                  href={story.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black font-medium hover:underline flex items-center gap-1"
                >
                  Read on {story.source} <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Grid of remaining external stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {externalSuccessStories.slice(1).map((story) => (
            <div key={story.id} className="border-b border-gray-200 pb-6">
              <div className="bg-gray-100 aspect-[16/9] relative mb-4">
                <Image 
                  src={story.imageUrl} 
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 mb-2">{story.date} • {story.source}</p>
              <h3 className="font-serif text-xl font-bold mb-3 leading-tight hover:underline">
                <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  {story.title}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </h3>
              <p className="text-gray-700 mb-3">{story.description}</p>
              <a 
                href={story.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-black font-medium hover:underline flex items-center gap-1"
              >
                Read on {story.source} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 