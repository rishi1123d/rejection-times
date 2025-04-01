import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import StoryCard from "@/components/story-card"

export default function BrowseStories() {
  const allStories = [
    {
      id: "1",
      quote:
        "Your manuscript is both good and original, but the part that is good is not original and the part that is original is not good.",
      description: "After multiple rejections from publishers, I almost gave up on my writing career.",
      outcome: "I'm now a New York Times bestselling author with over 1 million copies sold.",
      author: "Jane Smith",
      date: "April 1, 2025",
    },
    {
      id: "2",
      quote: "We don't see enough leadership potential in you to move forward with your application.",
      description: "A major tech company's leadership program rejected me, saying I lacked potential.",
      outcome: "I founded my own company that now employs 50 people.",
      author: "John Doe",
      date: "March 28, 2025",
    },
    {
      id: "3",
      quote: "You lack the qualifications necessary for our medical program. We suggest exploring other career paths.",
      description: "I was rejected from all 15 medical schools I applied to on my first try.",
      outcome: "I'm now the head of neurosurgery at a leading hospital.",
      author: "Dr. Sarah Johnson",
      date: "March 25, 2025",
    },
    {
      id: "4",
      quote: "Your business idea is too niche and won't find a market.",
      description: "Every investor I approached turned down my startup idea.",
      outcome: "My company was acquired last year for $50 million.",
      author: "Michael Chen",
      date: "March 20, 2025",
    },
    {
      id: "5",
      quote: "We regret to inform you that your application has been declined.",
      description: "I was rejected from my dream job three times over five years.",
      outcome: "I now lead the department that once rejected me.",
      author: "Robert Williams",
      date: "March 15, 2025",
    },
    {
      id: "6",
      quote: "Your voice isn't right for our radio station.",
      description: "I was told I didn't have the voice for broadcasting.",
      outcome: "My podcast now has over 5 million monthly listeners.",
      author: "Emily Johnson",
      date: "March 10, 2025",
    },
    {
      id: "7",
      quote: "The committee has decided not to fund your research proposal.",
      description: "My groundbreaking research proposal was rejected by every major funding body.",
      outcome: "The research eventually led to a breakthrough that changed the field.",
      author: "Dr. James Wilson",
      date: "March 5, 2025",
    },
    {
      id: "8",
      quote: "We don't think you're ready for this level of competition.",
      description: "My coach told me I wasn't good enough for national competitions.",
      outcome: "I went on to win an Olympic gold medal.",
      author: "Maria Rodriguez",
      date: "February 28, 2025",
    },
  ]

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gray-700 hover:text-black flex items-center gap-1 mb-4 text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Browse All Stories</h1>
          <p className="text-xl text-gray-700">Discover how others turned rejection into opportunity</p>
        </div>

        {/* Featured story */}
        <div className="mb-10 border-b border-gray-300 pb-10">
          <StoryCard story={allStories[0]} variant="featured" />
        </div>

        {/* Dynamic grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10">
          {/* Medium stories - span 6 columns */}
          {allStories.slice(1, 3).map((story) => (
            <div key={story.id} className="md:col-span-6">
              <StoryCard story={story} />
            </div>
          ))}

          {/* Small stories - span 4 columns */}
          {allStories.slice(3, 6).map((story) => (
            <div key={story.id} className="md:col-span-4">
              <StoryCard story={story} />
            </div>
          ))}

          {/* Full width story */}
          <div className="md:col-span-12 border-t border-b border-gray-300 py-8 my-4">
            <StoryCard story={allStories[6]} horizontal />
          </div>

          {/* More small stories */}
          {allStories.slice(7).map((story) => (
            <div key={story.id} className="md:col-span-4">
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

