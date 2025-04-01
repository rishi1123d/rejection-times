'use client'
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Newspaper } from "lucide-react"
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
      title: "8 Famous Rejections That Will Inspire You To Keep Going",
      description: "Stories of famous people who faced significant rejection before achieving great success in their fields.",
      source: "HuffPost",
      sourceUrl: "https://www.huffpost.com/entry/famous-rejections_n_5126067",
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
      title: "How Rejection Made J.K. Rowling One of the Most Successful Authors",
      description: "J.K. Rowling overcame multiple publisher rejections before Harry Potter became a worldwide phenomenon.",
      source: "MasterClass",
      sourceUrl: "https://www.masterclass.com/articles/how-jk-rowling-started-writing-harry-potter",
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
      title: "The YouTube Origin Story: From Dating Site to Video Giant",
      description: "How YouTube's founders pivoted from a failed dating site to create the world's largest video platform.",
      source: "Business Insider",
      sourceUrl: "https://www.businessinsider.com/youtube-started-as-dating-site-2016-10",
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
                  <p className="text-sm text-gray-500 mb-2">{formatdate(story.date)}</p>
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
                <p className="text-sm text-gray-500 mb-2">{formatdate(story.date)}</p>
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
                <p className="text-sm text-gray-500 mb-1">{formatdate(story.date)}</p>
                <h3 className="font-serif text-xl font-bold mb-2 leading-tight hover:underline">
                  <Link href={`/story/${story.id}`}>{story.quote}</Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">{story.description}</p>
                <p className="text-sm text-green-700 font-medium">{story.outcome}</p>
                <p className="text-xs text-gray-500 mt-2">By {story.author}</p>
              </div>
            ))} */}
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
                  <div key={story.id} className="md:col-span-6 border-b border-gray-200 pb-6">
                    <div className="bg-gray-100 aspect-[16/9] relative mb-4">
                      <ExternalImage 
                        sourceUrl={story.sourceUrl}
                        alt={story.title}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{formatdate(story.date)} • {story.source}</p>
                    <h3 className="font-serif text-2xl font-bold mb-3 leading-tight hover:underline">
                      <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
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

              {/* Small external stories - 4 columns each (now showing 3 instead of 6) */}
              {randomExternalStories
                .filter((story) => story.size === "small")
                .map((story) => (
                  <div key={story.id} className="md:col-span-4 border-b md:border-b-0 border-gray-200 pb-6">
                    <div className="bg-gray-100 aspect-[16/9] relative mb-3">
                      <ExternalImage 
                        sourceUrl={story.sourceUrl}
                        alt={story.title}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{formatdate(story.date)} • {story.source}</p>
                    <h3 className="font-serif text-xl font-bold mb-2 leading-tight hover:underline">
                      <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        {story.title}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">{story.description}</p>
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
