'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatdate } from "@/lib/utils"
// This interface defines the shape of our story data
interface Story {
  id: string;
  quote: string;
  description: string;
  outcome: string;
  author: string;
  date: string;
  featured: boolean;
  size: string;
  content?: string;
}

// Author Avatar Component
function AuthorAvatar({ name, size = "medium" }: { name: string, size?: "small" | "medium" | "large" }) {
  // Generate a consistent seed based on the name
  const generateSeed = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash).toString();
  };
  
  // Generate URLs for different types of authors to ensure consistent but different images
  const getAvatarUrl = (name: string) => {
    const lowerName = name.toLowerCase();
    const seed = generateSeed(name);
    
    // Determine gender for the image - just for variety in the avatars
    const isFemale = ["jane", "sarah", "emily"].some(n => lowerName.includes(n.toLowerCase()));
    const gender = isFemale ? "female" : "male";
    
    // Unique but consistent identifier based on name
    return `https://randomuser.me/api/portraits/${gender}/${parseInt(seed) % 99}.jpg`;
  };
  
  // Set size classes based on the size prop
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-24 h-24"
  };

  return (
    <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]} border-2 border-white shadow-md`}>
      <Image 
        src={getAvatarUrl(name)}
        alt={`Photo of ${name}`}
        fill
        className="object-cover"
      />
    </div>
  );
}

export default function StoryPage({ params }: { params: { id: string } }) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  // Directly use the id from window.location to avoid accessing params.id
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`/api/stories/${params.id}`);
        if (!res.ok) throw new Error('Story not found');
  
        const data = await res.json();
        setStory(data);
      } catch (err) {
        console.error('Error fetching story:', err);
        setStory(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStory();
  }, [params.id]);
  

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-500">Loading story...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl font-bold mb-6">Story Not Found</h1>
          <p className="text-lg text-gray-700 mb-8">
            We couldn't find the story you're looking for.
          </p>
          <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-none px-6">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-black mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        {/* Story header */}
        <div className="mb-12">
          <p className="text-sm text-gray-500 mb-2">{formatdate(story?.date)}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {story?.quote}
          </h1>
          <div className="border-l-4 border-gray-300 pl-4 mb-8">
            <p className="text-xl text-gray-700 italic mb-2">{story?.description}</p>
            <p className="text-xl text-green-700 font-medium">{story?.outcome}</p>
          </div>
          
          {/* Author with Avatar */}
          <div className="flex items-center py-4 px-6 bg-gray-50 rounded-lg border border-gray-100">
            <div className="mr-6">
              <AuthorAvatar name={story?.author} size="large" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">{story?.author}</h3>
              <p className="text-sm text-gray-500">{formatdate(story?.date)}</p>
              <p className="mt-2 text-gray-600 max-w-md">
                {story?.author} shares their personal journey from rejection to success in this powerful story.
              </p>
            </div>
          </div>
        </div>

        {/* Story content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: story.content || '' }}
        />

        {/* Share and reactions section */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-700">Did this story resonate with you?</p>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="border-gray-300">
                <Link href="/share">Share Your Own Story</Link>
              </Button>
              <Button asChild className="bg-black hover:bg-gray-800 text-white">
                <Link href="/browse">Read More Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 