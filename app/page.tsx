'use client'
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Newspaper, ArrowLeft, ArrowLeftCircle, ArrowRightCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatdate } from "@/lib/utils"
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
  image_url?: string; // Optional field for uploaded image
};

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Custom image component with error handling
function ExternalImage({ sourceUrl, alt, className }: { sourceUrl: string, alt: string, className?: string }) {
  const [imgSrc, setImgSrc] = useState<string>(`/api/fetch-og-image?url=${encodeURIComponent(sourceUrl)}`);
  const [isError, setIsError] = useState(false);

  return (
    <div className="bg-gray-100 aspect-[16/9] relative w-full h-full flex items-center justify-center">
      {isError ? (
        <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 p-4">
          <Newspaper className="h-10 w-10 text-gray-400 mb-2" />
          <div className="text-sm text-gray-500 text-center">{new URL(sourceUrl).hostname}</div>
        </div>
      ) : (
        <Image 
          src={imgSrc}
          alt={alt}
          fill
          className={`object-cover ${className || ''}`}
          onError={() => {
            setIsError(true);
          }}
        />
      )}
    </div>
  );
}

// Add the story by Hank Couture and other submitted stories
const mockSubmittedStories: Story[] = [
  {
    id: "submit1",
    quote: "Rejected by colleges, VCs, accelerators, MBA programs, and LPs — repeatedly — at nearly every stage of his early career.",
    description: "Hank Couture's journey is a testament to persistence through rejection. At 19, he was rejected by all the colleges he ambitiously applied to — even his safety school.",
    outcome: "Rejections became redirections. Couture's ability to reflect, adapt, and press forward forged an unconventional but highly impactful path.",
    author: "Hank Couture",
    date: "April 5, 2025", // Current week's date
    featured: true, // This is the featured story for this week
    size: "large",
  },
  {
    id: "submit2",
    quote: "Apple's entrance into the podcasting market made Odeo's business model obsolete.",
    description: "In 2005, Evan Williams co-founded Odeo, a podcasting platform meant to ride the wave of growing audio content. However, shortly after launch, Apple announced iTunes would support podcasts, effectively overwhelming Odeo's market potential.",
    outcome: "This pivot led to the creation of Twitter in 2006. Initially a side project, Twitter quickly gained traction and grew into a global platform.",
    author: "Evan Williams",
    date: "April 3, 2025",
    featured: false,
    size: "medium",
  },
  {
    id: "submit3",
    quote: "Starbucks' original owners rejected Schultz's idea of transforming it into a coffeehouse experience.",
    description: "Schultz tried to convince Starbucks' owners to adopt the Italian-style espresso bar model. When they declined, he launched Il Giornale in 1985.",
    outcome: "Under his leadership, Starbucks grew into a global coffeehouse brand.",
    author: "Howard Schultz",
    date: "April 2, 2025",
    featured: false,
    size: "medium",
  },
  {
    id: "submit4",
    quote: "Faced a $250 billion lawsuit that bankrupted his first company, Scour.",
    description: "Kalanick's first venture, Scour, was an early peer-to-peer file-sharing service that failed due to legal battles. He then founded Red Swoosh, which also faced challenges but was acquired in 2007.",
    outcome: "Uber revolutionized transportation globally. Despite controversies and his eventual resignation, Kalanick's idea changed how people travel.",
    author: "Travis Kalanick",
    date: "April 1, 2025",
    featured: false,
    size: "medium",
  },
  {
    id: "submit5",
    quote: "Investors doubted her business model and resisted funding Stitch Fix.",
    description: "While at Harvard Business School, Lake launched Stitch Fix to modernize the shopping experience. Using data to personalize fashion, she faced logistical issues and funding rejections.",
    outcome: "Stitch Fix went public in 2017. Despite legal and economic challenges, Lake's innovation propelled the company to the forefront of personalized online fashion retail.",
    author: "Katrina Lake",
    date: "March 31, 2025",
    featured: false,
    size: "medium",
  },
  {
    id: "submit6",
    quote: "Content providers resisted the transition to streaming, fearing loss of traditional revenue.",
    description: "Frustrated by a late DVD fee, Hastings co-founded Netflix as a DVD rental company. In 2007, he pivoted to streaming, facing resistance from studios and major technical hurdles.",
    outcome: "Netflix became the pioneer of digital streaming. By creating award-winning originals and expanding globally, Hastings led the company to dominate the entertainment industry.",
    author: "Reed Hastings",
    date: "March 30, 2025",
    featured: false,
    size: "small",
  },
  {
    id: "submit7",
    quote: "Launched Reddit with no users and had to create fake accounts to generate activity.",
    description: "When Reddit launched in 2005, it had no traffic. Huffman and Ohanian created fake accounts to simulate a lively user base, guiding early discussions and building a sense of community.",
    outcome: "Reddit now boasts over 430 million users. Their strategy of simulating activity proved the power of perceived popularity and laid the groundwork for one of the internet's most influential platforms.",
    author: "Steve Huffman & Alexis Ohanian",
    date: "March 28, 2025",
    featured: false,
    size: "small",
  },
  {
    id: "submit8",
    quote: "Faced 70 venture capital rejections for his startup, Adaptive Insights.",
    description: "Rob Hull envisioned Adaptive Insights as a solution for business planning and analytics. However, venture capitalists dismissed the idea repeatedly—70 times. Undeterred, Hull kept refining his pitch and strategy until he finally secured funding.",
    outcome: "Adaptive Insights grew into a billion-dollar company and was acquired by Workday in 2018. Hull's persistence turned a rejected idea into a major success story in enterprise software.",
    author: "Rob Hull",
    date: "March 25, 2025",
    featured: false,
    size: "small",
  },
  {
    id: "submit9",
    quote: "Investors once told NVIDIA that a graphics-focused company wouldn't survive the tech bubble.",
    description: "Jensen Huang co-founded NVIDIA in 1993 with a vision to revolutionize graphics processing. In the early years, investors were skeptical about the company's narrow focus on GPUs, especially during the dot-com crash when hardware companies were hit hard.",
    outcome: "NVIDIA not only survived but led the AI and GPU revolution. Huang's long-term vision helped redefine computing, gaming, and artificial intelligence, making NVIDIA a trillion-dollar company.",
    author: "Jensen Huang",
    date: "March 23, 2025",
    featured: false,
    size: "small",
  },
  {
    id: "submit10",
    quote: "Was ousted from PayPal and repeatedly doubted during the early days of Tesla and SpaceX.",
    description: "After selling Zip2 and being ousted from PayPal, Musk used his fortune to start Tesla and SpaceX, ventures many believed were doomed. Tesla faced manufacturing delays and funding struggles, while SpaceX saw its first three rocket launches fail.",
    outcome: "Both companies not only survived but thrived. Tesla redefined the auto industry, and SpaceX became the first private company to send astronauts to space.",
    author: "Elon Musk",
    date: "March 20, 2025",
    featured: false,
    size: "small",
  },
];

export default function Home() {
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [currentPageStories, setCurrentPageStories] = useState<Story[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  // Use this to set the weekly featured story
  const getCurrentFeaturedStory = () => {
    const today = new Date();
    // Use the week number to determine which story to feature
    const weekNumber = Math.floor(today.getTime() / (7 * 24 * 60 * 60 * 1000));
    
    // For this week, we specifically want to feature Hank Couture's story
    return mockSubmittedStories[0]; // Hank Couture is first in the array
  };

  useEffect(() => {
    const fetchStories = async () => {
      console.log('Fetching stories from API...');
      setLoading(true);
      
      try {
        const response = await fetch('/api/supabase');
        if (!response.ok) {
          console.error('Error fetching stories:', response.statusText);
          // If API fails, use our mock submitted stories
          const weeklyFeatured = getCurrentFeaturedStory();
          setFeaturedStories([weeklyFeatured, ...mockSubmittedStories.slice(1)]);
        } else {
          console.log('Stories fetched successfully');
          const data = await response.json();
          console.log('Fetched stories:', data);
          
          // Combine API stories with our mock submitted stories
          // Prioritize our current weekly featured story
          const weeklyFeatured = getCurrentFeaturedStory();
          
          // Set weeklyFeatured as featured and others as not featured
          const combinedStories = [
            { ...weeklyFeatured, featured: true },
            ...mockSubmittedStories.slice(1).map(story => ({ ...story, featured: false })),
            ...data.map((story: Story) => ({ ...story, featured: false }))
          ];
          
          setFeaturedStories(combinedStories);
          console.log("Combined stories:", combinedStories);
        }
      } catch (error) {
        console.error('Failed to fetch stories:', error);
        // If API fails, use our mock submitted stories
        const weeklyFeatured = getCurrentFeaturedStory();
        setFeaturedStories([weeklyFeatured, ...mockSubmittedStories.slice(1)]);
      }
      
      setLoading(false);
    };

    fetchStories();
  }, []);
  
  // Set up pagination for stories
  useEffect(() => {
    if (featuredStories.length > 0) {
      const storiesPerPage = 3;
      const pages = Math.ceil((featuredStories.length - 1) / storiesPerPage); // -1 to exclude the featured story
      setTotalPages(pages);
      
      // Get current page stories (excluding the main featured story)
      const nonFeatured = featuredStories.filter(story => !story.featured);
      const start = currentPage * storiesPerPage;
      const currentStories = nonFeatured.slice(start, start + storiesPerPage);
      setCurrentPageStories(currentStories);
    }
  }, [featuredStories, currentPage]);

  // Navigation functions
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };
  
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  // State for randomized stories
  const [randomExternalStories, setRandomExternalStories] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  // External stories from real articles about startup rejections and success stories
  const allExternalStories = [
    {
      id: "ext1",
      title: "These Entrepreneurs Were Rejected Hundreds Of Times Before Bringing In Billions",
      description: "Profiles of entrepreneurs who persisted through countless rejections before achieving billion-dollar success.",
      source: "Forbes",
      sourceUrl: "https://www.forbes.com/sites/alejandrocremades/2019/02/05/these-entrepreneurs-were-rejected-hundreds-of-times-before-bringing-in-billions/",
      date: "February 2019",
      size: "medium",
    },
    {
      id: "ext2",
      title: "How Chief's Female Founders Overcame Naysayers And The Pandemic To Build A Unicorn",
      description: "The journey of female founders who built a billion-dollar company despite skepticism and global challenges.",
      source: "Forbes",
      sourceUrl: "https://www.forbes.com/sites/geristengel/2022/04/13/how-chiefs-female-founders-overcame-naysayers-and-the-pandemic-to-build-a-unicorn/",
      date: "April 2022",
      size: "medium",
    },
    {
      id: "ext3",
      title: "21 Famous Failures Who Refused to Give Up",
      description: "“It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all, in which case you have failed by default.” — J.K. Rowling",
      source: "HuffPost",
      sourceUrl: "https://www.huffpost.com/entry/21-famous-failures-who-refused-to-give-up_b_57da2245e4b04fa361d991ba",
      date: "March 2014",
      size: "small",
    },
    {
      id: "ext4",
      title: "21 Entrepreneurs Who Failed Big Before Becoming a Success",
      description: "From Steve Jobs to Oprah Winfrey, these famous entrepreneurs overcame significant failure before succeeding.",
      source: "Entrepreneur",
      sourceUrl: "https://www.entrepreneur.com/business-news/21-entrepreneurs-who-failed-big-before-becoming-a-success/242129",
      date: "January 2016",
      size: "medium",
    },
    {
      id: "ext5",
      title: "12 Famous People Who Failed Before Succeeding",
      description: "From Walt Disney to Oprah Winfrey, these icons faced crushing rejections before finding success.",
      source: "Business Insider",
      sourceUrl: "https://www.businessinsider.com/successful-people-who-failed-at-first-2015-7",
      date: "July 2015",
      size: "small",
    },
    {
      id: "ext6",
      title: "10 Wildly Successful People Who Failed on Their First Try",
      description: "Stories of now-famous figures who bombed their first major opportunities but persevered to achieve greatness.",
      source: "Inc.",
      sourceUrl: "https://www.inc.com/christina-desmarais/10-wildly-successful-people-on-how-they-view-failure.html",
      date: "April 2019",
      size: "small",
    },
    {
      id: "ext7",
      title: "The Fringe Benefits of Failure, and the Importance of Imagination", 
      description: "J.K. Rowling, in her Harvard address, outlines how she overcame multiple publisher rejections before Harry Potter became a worldwide phenomenon.",
      source: "Harvard Gazette",
      sourceUrl: "",
      date: "January 2022",
      size: "medium",
    },
    {
      id: "ext8",
      title: "15 Highly Successful People Who Failed Their Way to Success",
      description: "These successful people were once rejected, fired, or told they would never succeed.",
      source: "Inc.",
      sourceUrl: "https://www.inc.com/larry-kim/15-highly-successful-people-who-failed-their-way-to-success.html",
      date: "October 2015",
      size: "medium",
    },
    {
      id: "ext9",
      title: "Michael Jordan: The Legendary Story of the NBA's Greatest Player",
      description: "How being cut from his high school basketball team motivated Michael Jordan to become the greatest player in NBA history.",
      source: "Britannica",
      sourceUrl: "https://www.britannica.com/biography/Michael-Jordan",
      date: "July 2023",
      size: "medium",
    },
    {
      id: "ext10",
      title: "This founder sold his company to Amazon for $1 billion after being rejected on 'Shark Tank'",
      description: "How Ring's founder turned a Shark Tank rejection into a billion-dollar acquisition by Amazon.",
      source: "Business Insider",
      sourceUrl: "https://www.businessinsider.com/ring-jamie-siminoff-advice-how-to-create-a-successful-startup-2019-4",
      date: "April 2019",
      size: "medium",
    },
    {
      id: "ext11",
      title: "7 rejected 'Shark Tank' products that didn't get investments but are now wildly popular",
      description: "Products that the Sharks passed on but went on to become massive commercial successes anyway.",
      source: "Business Insider",
      sourceUrl: "https://www.businessinsider.com/guides/home/best-shark-tank-products-from-rejected-companies",
      date: "2023",
      size: "small",
    },
    {
      id: "ext12",
      title: "Steve Jobs' Career: From Apple's Co-founder to Visionary Leader",
      description: "How Steve Jobs bounced back from being fired from his own company to lead Apple to unprecedented success.",
      source: "ThoughtCo",
      sourceUrl: "https://www.thoughtco.com/steve-jobs-biography-1991928",
      date: "January 2020",
      size: "medium",
    },
    {
      id: "ext13",
      title: "Walt Disney: The Biography of a Dreamer Who Changed Entertainment",
      description: "How Walt Disney persevered through bankruptcy and rejection to create an entertainment empire.",
      source: "Biography",
      sourceUrl: "https://www.biography.com/actors/walt-disney",
      date: "April 2021",
      size: "small",
    },
    {
      id: "ext14",
      title: "Oprah Winfrey Biography: From Rural Poverty to Media Mogul",
      description: "How Oprah overcame early career rejection and personal challenges to become a billionaire media icon.",
      source: "Biography",
      sourceUrl: "https://www.biography.com/movies-tv/oprah-winfrey",
      date: "August 2022",
      size: "medium",
    },
    {
      id: "ext15",
      title: "The History of Airbnb: From Air Mattresses to $100 Billion Company",
      description: "How Airbnb's founders overcame investor rejection and near bankruptcy through creativity and persistence.",
      source: "Investopedia",
      sourceUrl: "https://www.investopedia.com/articles/investing/112015/how-airbnb-makes-money.asp",
      date: "February 2023",
      size: "medium",
    },
    {
      id: "ext16",
      title: "Colonel Sanders: KFC's Founder Started at 65 After Numerous Rejections",
      description: "How Colonel Sanders founded KFC after facing over 1,000 rejections for his chicken recipe.",
      source: "CNBC",
      sourceUrl: "https://www.cnbc.com/2016/09/08/how-this-entrepreneur-went-from-a-paper-route-to-building-a-billion-dollar-company.html",
      date: "September 2016",
      size: "small",
    },
    {
      id: "ext17",
      title: "Thomas Edison's 1,000 Attempts to Invent the Light Bulb",
      description: "How Thomas Edison's perseverance through countless 'failures' led to one of history's greatest inventions.",
      source: "ThoughtCo",
      sourceUrl: "https://www.thoughtco.com/edisons-light-bulb-4090626",
      date: "July 2019",
      size: "medium",
    },
    {
      id: "ext18",
      title: "The Beatles Were Rejected by Decca Records: 'Guitar Groups Are on the Way Out'",
      description: "How The Beatles' rejection by Decca Records became one of the most infamous mistakes in music industry history.",
      source: "Far Out Magazine",
      sourceUrl: "https://faroutmagazine.co.uk/the-beatles-decca-audition-rejection-anniversary/",
      date: "January 2022",
      size: "small",
    },
    {
      id: "ext19",
      title: "The Story of Slack: From Game Company Failure to $27 Billion Success",
      description: "How Slack emerged from the ashes of a failed gaming company to revolutionize workplace communication.",
      source: "The Startup",
      sourceUrl: "https://medium.com/swlh/the-story-of-slack-from-game-company-to-27-billion-enterprise-software-giant-a92efb3ce7f4",
      date: "December 2020",
      size: "medium",
    },
    {
      id: "ext20",
      title: "How Stephen King Went From Struggling Writer to Bestselling Master of Horror",
      description: "Stephen King collected rejection slips for years before becoming one of the world's bestselling authors.",
      source: "Mental Floss",
      sourceUrl: "https://www.mentalfloss.com/article/53235/how-stephen-kings-wife-saved-carrie-and-launched-his-career",
      date: "October 2019",
      size: "small",
    },
    {
      id: "ext21",
      title: "They Were Rejected On Shark Tank And Today Are Making Millions",
      description: "Companies that turned Shark Tank rejection into multi-million dollar business success.",
      source: "Forbes",
      sourceUrl: "https://www.forbes.com/sites/alejandrocremades/2019/04/20/they-were-rejected-on-shark-tank-and-today-are-making-millions/",
      date: "April 2019",
      size: "medium",
    },
    {
      id: "ext22",
      title: "From Rejection to Billion-Dollar Valuation: The Story of WhatsApp",
      description: "How WhatsApp founders were rejected by Facebook for jobs before selling their app to Facebook for $19 billion.",
      source: "Forbes",
      sourceUrl: "https://www.forbes.com/sites/parmyolson/2014/02/19/exclusive-inside-story-how-jan-koum-built-whatsapp-into-facebooks-new-19-billion-baby/",
      date: "February 2014",
      size: "small",
    },
    {
      id: "ext23",
      title: "Madonna's Early Rejection: 'The Future of Music Is Not Melodic'",
      description: "How Madonna persisted through music industry rejection to become one of the world's most successful artists.",
      source: "Rolling Stone",
      sourceUrl: "https://www.rollingstone.com/music/music-lists/madonna-21-most-memorable-moments-152530/",
      date: "August 2018",
      size: "small",
    },
    {
      id: "ext24",
      title: "How Abraham Lincoln Failed His Way to Success",
      description: "Abraham Lincoln's remarkable journey through business failures, political defeats, and personal tragedies.",
      source: "Smithsonian Magazine",
      sourceUrl: "https://www.smithsonianmag.com/history/abraham-lincoln-early-career-defeat-failure-180976441/",
      date: "February 2020",
      size: "medium",
    },
    {
      id: "ext25",
      title: "From Rejection to Oscar Winner: Steven Spielberg's Journey",
      description: "How Steven Spielberg turned film school rejections into one of the most successful directing careers in history.",
      source: "Vanity Fair",
      sourceUrl: "https://www.vanityfair.com/hollywood/2018/03/steven-spielberg-oscars-career",
      date: "March 2018",
      size: "small",
    },
    {
      id: "ext26",
      title: "Vera Wang: From Figure Skating Rejection to Fashion Empire",
      description: "How Vera Wang pivoted from Olympic rejection to becoming one of fashion's most influential designers.",
      source: "Biography",
      sourceUrl: "https://www.biography.com/fashion-designer/vera-wang",
      date: "April 2021",
      size: "medium",
    },
    {
      id: "ext27",
      title: "How Dyson Vacuum's Inventor Persisted Through 5,126 Failed Prototypes",
      description: "James Dyson's incredible story of perseverance through thousands of failures before creating his revolutionary vacuum.",
      source: "Entrepreneur",
      sourceUrl: "https://www.entrepreneur.com/leadership/james-dyson-on-using-failure-to-drive-success/225437",
      date: "April 2016",
      size: "small",
    },
    {
      id: "ext28",
      title: "Elon Musk's Early Failures: Before Tesla and SpaceX Success",
      description: "How Elon Musk overcame being ousted as CEO and early SpaceX rocket failures to build two revolutionary companies.",
      source: "Time",
      sourceUrl: "https://time.com/6266173/elon-musk-biography-walter-isaacson-excerpt/",
      date: "September 2023",
      size: "small",
    },
    {
      id: "ext29",
      title: "How Sylvester Stallone Wrote and Starred in Rocky Despite Poverty",
      description: "Sylvester Stallone's inspirational story of refusing to sell his Rocky script unless he could star in it.",
      source: "Biography",
      sourceUrl: "https://www.biography.com/actors/sylvester-stallone",
      date: "July 2021",
      size: "medium",
    },
    {
      id: "ext30",
      title: "The YouTube Origin Story: From Failed Dating Site to Video Giant",
      description: "'We had no idea how to do it': YouTube's founders, investors, and first employees tell the chaotic inside story of how it rose from failed dating site to $1.65 billion video behemoth",
      source: "Business Insider",
      sourceUrl: "https://www.businessinsider.com/youtube-oral-history-early-days-founded-investors-employees-started-google-2020-5",
      date: "February 2020",
      size: "medium",
    }
  ]

  // Use useEffect to run randomization only on the client side
  useEffect(() => {
    // Mark that we're on client side
    setIsClient(true);
    
    // Select and shuffle stories - UPDATED to show only 5 stories total
    const mediumStories = shuffleArray(allExternalStories.filter(story => story.size === "medium")).slice(0, 2);
    const smallStories = shuffleArray(allExternalStories.filter(story => story.size === "small")).slice(0, 3);
    
    // Update state with randomized stories (5 total: 2 medium + 3 small)
    setRandomExternalStories([...mediumStories, ...smallStories]);
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
          <h2 className="font-serif text-3xl font-bold">Reject of the Week</h2>
          <Link href="/browse" className="text-gray-700 hover:text-black flex items-center gap-1 text-sm">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Main featured story (weekly featured) */}
        <div className="mb-10 border-b border-gray-200 pb-10">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500">Loading this week's featured story...</p>
            </div>
          ) : (
            featuredStories
              .filter((story) => story.featured)
              .map((story) => (
                <div key={story.id} className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-100 aspect-[4/3] relative flex items-center justify-center">
                    {story.image_url ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={story.image_url}
                          alt={`Image for story by ${story.author}`}
                          fill
                          className="object-cover"
                          priority
                          onError={(e) => {
                            // Fallback if the uploaded image fails to load
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Prevent infinite error loop
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(story.author)}&background=random&size=256`;
                          }}
                        />
                      </div>
                    ) : story.author === "Hank Couture" ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src="/hank-couture.jpg"
                          alt="Hank Couture"
                          fill
                          className="object-cover"
                          priority
                          onError={(e) => {
                            // Fallback to a default avatar if the image fails to load
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Prevent infinite error loop
                            target.src = "https://ui-avatars.com/api/?name=Hank+Couture&background=random&size=256";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="text-4xl">📝</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500 mb-2">{formatdate(story.date)}</p>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight hover:underline">
                      <Link href={`/story/${story.id}`}>{story.quote}</Link>
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">{story.description}</p>
                    <p className="text-green-700 font-medium text-lg">{story.outcome}</p>
                    <p className="text-sm text-gray-500 mt-4">By {story.author}</p>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Navigation arrows and page indicator */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-2xl font-bold">More Stories</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={goToPrevPage} 
              disabled={currentPage === 0}
              className={`p-1 rounded-full ${currentPage === 0 ? 'text-gray-300' : 'text-gray-700 hover:text-black'}`}
            >
              <ArrowLeftCircle className="h-6 w-6" />
            </button>
            <span className="text-sm text-gray-500">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages - 1}
              className={`p-1 rounded-full ${currentPage === totalPages - 1 ? 'text-gray-300' : 'text-gray-700 hover:text-black'}`}
            >
              <ArrowRightCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Dynamic grid layout for paginated stories */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 border-b border-gray-200 pb-10">
          {loading ? (
            <div className="text-center py-10 md:col-span-12">
              <p className="text-lg text-gray-500">Loading stories...</p>
            </div>
          ) : currentPageStories.length > 0 ? (
            currentPageStories.map((story) => (
              <div key={story.id} className="md:col-span-4 border-b border-gray-200 pb-6">
                <p className="text-sm text-gray-500 mb-2">{formatdate(story.date)}</p>
                <h3 className="font-serif text-2xl font-bold mb-3 leading-tight hover:underline">
                  <Link href={`/story/${story?.id}`}>{story?.quote}</Link>
                </h3>
                <p className="text-gray-700 mb-3">{story?.description}</p>
                <p className="text-green-700 font-medium">{story?.outcome}</p>
                <p className="text-sm text-gray-500 mt-3">By {story?.author}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 md:col-span-12">
              <p className="text-lg text-gray-500">No more stories to display.</p>
            </div>
          )}
        </div>

        {/* From Around the Web Section */}
        <div id="external-stories" className="mt-16 mb-10">
          <h2 className="font-serif text-3xl font-bold mb-8 border-b border-gray-200 pb-4">From Around the Web</h2>
          
          {/* External stories grid - Only show when client-side */}
          {isClient && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Medium external stories - 2 columns each (now showing 2 instead of 4) */}
              {randomExternalStories
                .filter((story) => story.size === "medium")
                .map((story) => (
                  <div key={story?.id} className="md:col-span-6 border-b border-gray-200 pb-6">
                    <div className="bg-gray-100 aspect-[16/9] relative mb-4">
                      <ExternalImage 
                        sourceUrl={story.sourceUrl}
                        alt={story.title}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{formatdate(story?.date)} • {story.source}</p>
                    <h3 className="font-serif text-2xl font-bold mb-3 leading-tight hover:underline">
                      <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        {story.title}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </h3>
                    <p className="text-gray-700 mb-3">{story?.description}</p>
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

              {/* Small external stories - 4 columns each (now showing 3 instead of 6) */}
              {randomExternalStories
                .filter((story) => story.size === "small")
                .map((story) => (
                  <div key={story?.id} className="md:col-span-4 border-b md:border-b-0 border-gray-200 pb-6">
                    <div className="bg-gray-100 aspect-[16/9] relative mb-3">
                      <ExternalImage 
                        sourceUrl={story.sourceUrl}
                        alt={story.title}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{formatdate(story?.date)} • {story.source}</p>
                    <h3 className="font-serif text-xl font-bold mb-2 leading-tight hover:underline">
                      <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        {story.title}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">{story?.description}</p>
                    <a 
                      href={story.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-black font-medium hover:underline flex items-center gap-1"
                    >
                      Read on {story.source} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
            </div>
          )}
          
          {/* Display loading state when not client-side */}
          {!isClient && (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500">Loading stories from around the web...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
