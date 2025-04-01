'use client'
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import StoryCard from "@/components/story-card"
import { useEffect, useState } from "react"

export default function BrowseStories() {

  const [allStories, setAllStories] = useState([]);
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/get_all_stories'); // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        setAllStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }
  , []);

  // Check if allStories is empty
  if (!allStories || allStories.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">No Stories Available</h1>
          <p className="text-xl text-gray-700">Currently, there are no stories to display.</p>
        </div>
      </div>
    );
  }

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
            <div key={story?.id} className="md:col-span-6">
              <StoryCard story={story} />
            </div>
          ))}

          {/* Small stories - span 4 columns */}
          {allStories.slice(3, 6).map((story) => (
            <div key={story?.id} className="md:col-span-4">
              <StoryCard story={story} />
            </div>
          ))}

          {/* Full width story */}
          <div className="md:col-span-12 border-t border-b border-gray-300 py-8 my-4">
            <StoryCard story={allStories[6]} horizontal />
          </div>

          {/* More small stories */}
          {allStories.slice(7).map((story) => (
            <div key={story?.id} className="md:col-span-4">
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

