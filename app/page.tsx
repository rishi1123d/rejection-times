'use client'
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
type Story = {
  id: string;
  quote: string;
  description: string;
  outcome: string;
  author: string;
  date: string;
  featured: boolean;
  size: string;
};

export default function Home() {
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      console.log('Fetching stories from API...');
      const response = await fetch('/api/supabase');
      if (!response.ok) {
        console.error('Error fetching stories:', response.statusText);
        return;
      }
      console.log('Stories fetched successfully');
      const data = await response.json();
      console.log('Fetched stories:', data); 
      console.log("Featured stories only:", data.filter((s: Story) => s.featured));

      setFeaturedStories(data);
    };

    fetchStories();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 pt-6 pb-16">
      {/* Hero Section */}
      <section className="border-b border-gray-300 pb-10 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight mb-6">
            From Rejection to Remarkable
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            A collection of stories celebrating the setbacks that led to extraordinary comebacks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-none px-6">
              <Link href="/share">Share Your Story</Link>
            </Button>
            <Button asChild variant="outline" className="border-black text-black hover:bg-gray-100 rounded-none px-6">
              <Link href="/browse">Browse Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl font-bold">Featured Stories</h2>
          <Link href="/browse" className="text-gray-700 hover:text-black flex items-center gap-1 text-sm">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Main featured story */}
        <div className="mb-10 border-b border-gray-200 pb-10">
          {featuredStories
            .filter((story) => story.featured)
            .map((story) => (
              <div key={story.id} className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 aspect-[4/3] flex items-center justify-center">
                  <div className="text-4xl">📝</div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-500 mb-2">{story.date}</p>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight hover:underline">
                    <Link href={`/story/${story.id}`}>{story.quote}</Link>
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">{story.description}</p>
                  <p className="text-green-700 font-medium text-lg">{story.outcome}</p>
                  <p className="text-sm text-gray-500 mt-4">By {story.author}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Dynamic grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Medium stories - 2 columns each */}
          {featuredStories
            // .filter((story) => story.size === "medium")
            .map((story, index) => (
              <div key={story.id} className="md:col-span-4 border-b border-gray-200 pb-6">
                <p className="text-sm text-gray-500 mb-2">{story.date}</p>
                <h3 className="font-serif text-2xl font-bold mb-3 leading-tight hover:underline">
                  <Link href={`/story/${story.id}`}>{story.quote}</Link>
                </h3>
                <p className="text-gray-700 mb-3">{story.description}</p>
                <p className="text-green-700 font-medium">{story.outcome}</p>
                <p className="text-sm text-gray-500 mt-3">By {story.author}</p>
              </div>
            ))}

          {/* Small stories - 4 columns each */}
          {/* {featuredStories
            // .filter((story) => story.size === "small")
            .map((story, index) => (
              <div key={story.id} className="md:col-span-4 border-b md:border-b-0 border-gray-200 pb-6">
                <p className="text-sm text-gray-500 mb-1">{story.date}</p>
                <h3 className="font-serif text-xl font-bold mb-2 leading-tight hover:underline">
                  <Link href={`/story/${story.id}`}>{story.quote}</Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">{story.description}</p>
                <p className="text-sm text-green-700 font-medium">{story.outcome}</p>
                <p className="text-xs text-gray-500 mt-2">By {story.author}</p>
              </div>
            ))} */}
        </div>

        {/* Opinion section */}
        {/* <div className="mt-12 pt-8 border-t border-gray-300">
          <h2 className="font-serif text-2xl font-bold mb-6">Opinion</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-r border-gray-200 pr-6">
              <h3 className="font-serif text-xl font-bold mb-3">The Value of Rejection</h3>
              <p className="text-gray-700 mb-3">Why we should embrace our failures as stepping stones to success.</p>
              <p className="text-sm text-gray-500">By Editorial Board</p>
            </div>
            <div className="border-r border-gray-200 pr-6">
              <h3 className="font-serif text-xl font-bold mb-3">Rejection as Redirection</h3>
              <p className="text-gray-700 mb-3">Sometimes the best opportunities come after doors have closed.</p>
              <p className="text-sm text-gray-500">By Guest Columnist</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-3">The Psychology of Resilience</h3>
              <p className="text-gray-700 mb-3">
                How our brains process rejection and how we can train ourselves to bounce back.
              </p>
              <p className="text-sm text-gray-500">By Dr. Psychology</p>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  )
}
