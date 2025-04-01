'use client'
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { formatdate } from "@/lib/utils"

// Story type
type Story = {
  id: string | number;
  quote: string;
  description: string;
  outcome: string;
  author: string;
  date: string;
  featured?: boolean;
  size?: "small" | "medium" | "large";
}

// Mock stories from the home page
const mockSubmittedStories: Story[] = [
  {
    id: 101,
    quote: "Rejected by colleges, VCs, accelerators, MBA programs, and LPs — repeatedly — at nearly every stage of his early career.",
    description: "Hank Couture's journey is a testament to persistence through rejection. At 19, he was rejected by all the colleges he ambitiously applied to — even his safety school.",
    outcome: "Rejections became redirections. Couture's ability to reflect, adapt, and press forward forged an unconventional but highly impactful path.",
    author: "Hank Couture",
    date: "April 5, 2025",
    featured: true,
    size: "large",
  },
  {
    id: 102,
    quote: "Apple's entrance into the podcasting market made Odeo's business model obsolete.",
    description: "In 2005, Evan Williams co-founded Odeo, a podcasting platform meant to ride the wave of growing audio content. However, shortly after launch, Apple announced iTunes would support podcasts, effectively overwhelming Odeo's market potential.",
    outcome: "This pivot led to the creation of Twitter in 2006. Initially a side project, Twitter quickly gained traction and grew into a global platform.",
    author: "Evan Williams",
    date: "April 3, 2025",
    featured: false,
    size: "medium",
  },
  {
    id: 103,
    quote: "Starbucks' original owners rejected Schultz's idea of transforming it into a coffeehouse experience.",
    description: "Schultz tried to convince Starbucks' owners to adopt the Italian-style espresso bar model. When they declined, he launched Il Giornale in 1985.",
    outcome: "Under his leadership, Starbucks grew into a global coffeehouse brand.",
    author: "Howard Schultz",
    date: "April 2, 2025",
    featured: false,
    size: "medium",
  },
  {
    id: 104,
    quote: "Faced a $250 billion lawsuit that bankrupted his first company, Scour.",
    description: "Kalanick's first venture, Scour, was an early peer-to-peer file-sharing service that failed due to legal battles. He then founded Red Swoosh, which also faced challenges but was acquired in 2007.",
    outcome: "Uber revolutionized transportation globally. Despite controversies and his eventual resignation, Kalanick's idea changed how people travel.",
    author: "Travis Kalanick",
    date: "April 1, 2025",
    featured: false,
    size: "medium",
  },
  {
    id: 105,
    quote: "Investors doubted her business model and resisted funding Stitch Fix.",
    description: "While at Harvard Business School, Lake launched Stitch Fix to modernize the shopping experience. Using data to personalize fashion, she faced logistical issues and funding rejections.",
    outcome: "Stitch Fix went public in 2017. Despite legal and economic challenges, Lake's innovation propelled the company to the forefront of personalized online fashion retail.",
    author: "Katrina Lake",
    date: "March 31, 2025",
    featured: false,
    size: "medium",
  },
  {
    id: 106,
    quote: "Content providers resisted the transition to streaming, fearing loss of traditional revenue.",
    description: "Frustrated by a late DVD fee, Hastings co-founded Netflix as a DVD rental company. In 2007, he pivoted to streaming, facing resistance from studios and major technical hurdles.",
    outcome: "Netflix became the pioneer of digital streaming. By creating award-winning originals and expanding globally, Hastings led the company to dominate the entertainment industry.",
    author: "Reed Hastings",
    date: "March 30, 2025",
    featured: false,
    size: "small",
  },
  {
    id: 107,
    quote: "Launched Reddit with no users and had to create fake accounts to generate activity.",
    description: "When Reddit launched in 2005, it had no traffic. Huffman and Ohanian created fake accounts to simulate a lively user base, guiding early discussions and building a sense of community.",
    outcome: "Reddit now boasts over 430 million users. Their strategy of simulating activity proved the power of perceived popularity and laid the groundwork for one of the internet's most influential platforms.",
    author: "Steve Huffman & Alexis Ohanian",
    date: "March 28, 2025",
    featured: false,
    size: "small",
  },
  {
    id: 108,
    quote: "Faced 70 venture capital rejections for his startup, Adaptive Insights.",
    description: "Rob Hull envisioned Adaptive Insights as a solution for business planning and analytics. However, venture capitalists dismissed the idea repeatedly—70 times. Undeterred, Hull kept refining his pitch and strategy until he finally secured funding.",
    outcome: "Adaptive Insights grew into a billion-dollar company and was acquired by Workday in 2018. Hull's persistence turned a rejected idea into a major success story in enterprise software.",
    author: "Rob Hull",
    date: "March 25, 2025",
    featured: false,
    size: "small",
  },
  {
    id: 109,
    quote: "Investors once told NVIDIA that a graphics-focused company wouldn't survive the tech bubble.",
    description: "Jensen Huang co-founded NVIDIA in 1993 with a vision to revolutionize graphics processing. In the early years, investors were skeptical about the company's narrow focus on GPUs, especially during the dot-com crash when hardware companies were hit hard.",
    outcome: "NVIDIA not only survived but led the AI and GPU revolution. Huang's long-term vision helped redefine computing, gaming, and artificial intelligence, making NVIDIA a trillion-dollar company.",
    author: "Jensen Huang",
    date: "March 23, 2025",
    featured: false,
    size: "small",
  },
  {
    id: 110,
    quote: "Was ousted from PayPal and repeatedly doubted during the early days of Tesla and SpaceX.",
    description: "After selling Zip2 and being ousted from PayPal, Musk used his fortune to start Tesla and SpaceX, ventures many believed were doomed. Tesla faced manufacturing delays and funding struggles, while SpaceX saw its first three rocket launches fail.",
    outcome: "Both companies not only survived but thrived. Tesla redefined the auto industry, and SpaceX became the first private company to send astronauts to space.",
    author: "Elon Musk",
    date: "March 20, 2025",
    featured: false,
    size: "small",
  },
];

export default function BrowseStories() {
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/get_all_stories');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        
        // Combine data from API with mock stories
        // Create a map of existing IDs to avoid duplicates for stories like Howard Schultz and Travis Kalanick
        const dbStoryMap = new Map();
        data.forEach((story: Story) => {
          dbStoryMap.set(story.quote, story);
        });
        
        // Filter out mock stories that might be duplicates of DB stories
        const filteredMockStories = mockSubmittedStories.filter(mockStory => 
          !dbStoryMap.has(mockStory.quote)
        );
        
        // Combine database stories with filtered mock stories
        const combinedStories = [...data, ...filteredMockStories];
        setAllStories(combinedStories);
      } catch (error) {
        console.error('Error fetching stories:', error);
        // If API fails, use mock stories
        setAllStories(mockSubmittedStories);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gray-700 hover:text-black flex items-center gap-1 mb-4 text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Browse All Stories</h1>
          <p className="text-xl text-gray-700 mb-6">Discover how others turned rejection into opportunity</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">Loading stories...</p>
          </div>
        ) : !allStories || allStories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">No stories available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {allStories.map((story) => (
              <div key={story.id} className="border-b border-gray-200 pb-6">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">{formatdate(story.date)}</p>
                  <h3 className="font-serif text-xl md:text-2xl font-bold mt-1 hover:underline">
                    <Link href={`/story/${story.id}`} className="block">
                      {story.quote}
                    </Link>
                  </h3>
                </div>
                <p className="text-gray-700 mb-3">{story.description}</p>
                <p className="text-green-700 font-medium">{story.outcome}</p>
                <p className="text-sm text-gray-500 mt-3">By {story.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

