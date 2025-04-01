'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    // Extract the ID from the URL path
    const pathSegments = window.location.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    // In a real app, you'd fetch this from an API
    // For now, we'll use our mock data
    const featuredStories = [
      {
        id: "1",
        quote:
          "Your manuscript is both good and original, but the part that is good is not original and the part that is original is not good.",
        description: "After multiple rejections from publishers, I almost gave up on my writing career.",
        outcome: "I'm now a New York Times bestselling author with over 1 million copies sold.",
        author: "Jane Smith",
        date: "April 1, 2025",
        featured: true,
        size: "large",
        content: `
          <p>I still remember the day that letter arrived. It was raining, which felt appropriate. The envelope was thin - never a good sign. I'd sent my manuscript to over 20 publishers by that point, but this rejection hurt the most.</p>
          
          <p>"Your manuscript is both good and original," the letter read, "but the part that is good is not original and the part that is original is not good."</p>
          
          <p>I'd put three years of my life into that book. Three years of early mornings, late nights, and weekends spent hunched over my laptop while friends went out and enjoyed their lives. For what? To be dismissed with a clever turn of phrase that probably made the editor feel terribly witty.</p>
          
          <p>I nearly quit that day. I deleted my manuscript folder, emptied the recycle bin, and swore I was done with writing forever. But I had a backup copy in my email, and after a week of feeling sorry for myself, I opened it again.</p>
          
          <p>This time, instead of seeing my precious words, I tried to see what that editor had seen. And slowly, painfully, I realized they were right. The good parts were derivative, and the original parts weren't working. I had been so close to my work that I couldn't see its flaws.</p>
          
          <p>I spent another year rewriting the entire book. Not revising - rewriting from scratch. I kept the concept but approached it with everything I'd learned from my failures. When I finished, I had a manuscript that was both original AND good.</p>
          
          <p>The 22nd publisher I submitted to offered me a contract. The book spent 36 weeks on the New York Times bestseller list. The translation rights sold in 42 countries. And the editor who had rejected me with that devastating line? They're now my editor at a different publishing house, and we laugh about that rejection letter.</p>
          
          <p>Sometimes the most brutal rejections are exactly what we need to hear, even if we're not ready to hear them at the time.</p>
        `,
      },
      {
        id: "2",
        quote: "We don't see enough leadership potential in you to move forward with your application.",
        description: "A major tech company's leadership program rejected me, saying I lacked potential.",
        outcome: "I founded my own company that now employs 50 people.",
        author: "John Doe",
        date: "March 28, 2025",
        featured: false,
        size: "medium",
        content: `
          <p>I'd always been a high achiever. Valedictorian in high school, summa cum laude in college, and I landed a good entry-level job at a respected tech company right after graduation. I thought I was on the fast track to success.</p>
          
          <p>After two years in my role, I applied to the company's prestigious leadership development program. It was highly selective, with only about 5% of applicants making it through. But I was confident - I had consistently exceeded my targets and received excellent performance reviews.</p>
          
          <p>The rejection email arrived while I was in a meeting. "After careful consideration," it read, "we don't see enough leadership potential in you to move forward with your application."</p>
          
          <p>Leadership potential? I was stunned. What did that even mean? I asked my manager for feedback, and what I heard was vague at best. I was "too heads-down," "not strategic enough," "good at execution but not visionary."</p>
          
          <p>For weeks, I walked around feeling like I had "NO LEADERSHIP POTENTIAL" stamped on my forehead. I started doubting every decision I made. Maybe they saw something in me that I couldn't see in myself? Maybe I really wasn't cut out for leadership?</p>
          
          <p>Then one day, I got frustrated with a problem our team had been struggling with for months. I couldn't understand why no one had fixed it yet. So instead of complaining, I spent a weekend building a prototype solution. When I showed it to my team on Monday, they were impressed. My manager asked me to develop it further.</p>
          
          <p>That's when I realized: leadership isn't granted by committees or bestowed in programs. Real leadership comes from seeing problems and taking initiative to solve them. I didn't need anyone's permission to lead.</p>
          
          <p>Six months later, I left to start my own company based on that prototype. It wasn't easy - I made countless mistakes and had to learn everything on the fly. But five years later, we have 50 employees, and ironically, I'm now approached by the same company that rejected me to speak to their leadership program participants about entrepreneurship.</p>
          
          <p>Sometimes being told you can't do something is exactly the motivation you need to prove that you can.</p>
        `,
      },
      {
        id: "3",
        quote: "You lack the qualifications necessary for our medical program. We suggest exploring other career paths.",
        description: "I was rejected from all 15 medical schools I applied to on my first try.",
        outcome: "I'm now the head of neurosurgery at a leading hospital.",
        author: "Dr. Sarah Johnson",
        date: "March 25, 2025",
        featured: false,
        size: "medium",
        content: `
          <p>The most painful rejection came from my top choice medical school. While most schools sent form letters, this one was personalized: "You lack the qualifications necessary for our medical program. We suggest exploring other career paths."</p>
          
          <p>I had applied to 15 medical schools. I received 15 rejections. My GPA was good but not stellar, my MCAT score was above average but not exceptional, and though I had research experience, it wasn't in a prestigious lab. On paper, I was mediocre.</p>
          
          <p>But being a doctor wasn't just something I wanted - it was who I was meant to be. I knew this with absolute certainty. So I took a year to strengthen my application. I retook the MCAT after months of intensive study. I found a research position in a neuroscience lab. I volunteered more hours at the hospital.</p>
          
          <p>When I reapplied, I was accepted to three schools, including my top choice - the same one that had suggested I explore other career paths. During orientation, the admissions director pulled me aside and told me my was the most improved reapplication they had ever seen. "You proved us wrong," she said. "Never stop doing that."</p>
          
          <p>In medical school, I discovered a passion for neurosurgery - one of the most competitive specialties. When I shared my interest with an advisor, he laughed and said I should consider something "more realistic." There it was again - that suggestion that I aim lower, that I wasn't quite good enough.</p>
          
          <p>I matched into neurosurgery at a top program.</p>
          
          <p>During my residency, when I expressed interest in a particularly challenging subspecialty, my chief resident told me, "That's a tough field for anyone, especially for a woman." I specialized in exactly that field.</p>
          
          <p>Now, I'm the head of neurosurgery at a leading hospital, and I keep the original rejection letter framed in my office. It reminds me that other people's assessments of our potential are just opinions, not facts. And opinions can be wrong.</p>
          
          <p>Every time someone tells me I can't do something, it just adds fuel to my determination to prove them wrong.</p>
        `,
      },
      {
        id: "4",
        quote: "Your business idea is too niche and won't find a market.",
        description: "Every investor I approached turned down my startup idea.",
        outcome: "My company was acquired last year for $50 million.",
        author: "Michael Chen",
        date: "March 20, 2025",
        featured: false,
        size: "small",
        content: `
          <p>I lost count of how many investors rejected my startup idea. Twenty? Thirty? The responses varied from polite passes to barely concealed contempt. One VC actually laughed during my pitch.</p>
          
          <p>"Your business idea is too niche and won't find a market," was the common refrain. "There's not enough pain point here." "The market size is too small." "This is a feature, not a company."</p>
          
          <p>My idea was a specialized software tool for architectural acousticians - the engineers who design the sound experience in concert halls, recording studios, and other spaces where acoustics matter. I knew it was niche. There are only a few thousand such professionals worldwide. But I had been one of them for seven years, and I knew their pain points intimately because they were my pain points.</p>
          
          <p>The existing tools were outdated, clunky, and expensive. I knew I could build something better, more intuitive, and cloud-based that would transform how these professionals worked. The market might be small, but it was deep, and these customers would pay well for the right solution.</p>
          
          <p>After every rejection, I refined my pitch. I gathered more evidence. I built a better prototype. But ultimately, I couldn't convince any investors that this niche was worth pursuing.</p>
          
          <p>So I bootstrapped. I kept my day job and built the product nights and weekends with two former colleagues. We launched with zero marketing budget, relying entirely on word of mouth within this small, tight-knit professional community.</p>
          
          <p>Within six months, we had captured 10% of the global market. By the end of the first year, we were profitable. By year three, we were the industry standard, with 70% market penetration. And last year, a major design software company acquired us for $50 million, seeing our tool as the perfect addition to their suite of architectural products.</p>
          
          <p>Sometimes, being too niche isn't a weakness - it's a superpower. We understood our users better than any generalist could have. We solved real problems that had been ignored because the market wasn't "sexy" enough for VCs.</p>
          
          <p>The investors who rejected us weren't wrong about the market size. It was small. They were just wrong about whether you could build a valuable company serving that market.</p>
        `,
      },
      {
        id: "5",
        quote: "We regret to inform you that your application has been declined.",
        description: "I was rejected from my dream job three times over five years.",
        outcome: "I now lead the department that once rejected me.",
        author: "Robert Williams",
        date: "March 15, 2025",
        featured: false,
        size: "small",
        content: `
          <p>The first time I applied to Westridge Publishing's editorial department, I was fresh out of college with an English degree and big dreams. My rejection letter was a standard form: "We regret to inform you that your application has been declined."</p>
          
          <p>I took an assistant position at a smaller publisher and spent two years learning the industry. When a junior editor position opened at Westridge, I applied again. This time, I got an interview but ultimately another rejection.</p>
          
          <p>Instead of giving up, I focused on building expertise that would make me undeniable. I took night classes in business administration. I started a literary blog that gained a following. I volunteered to take on the most challenging projects at work, even when they fell outside my job description.</p>
          
          <p>Two years later, I applied to Westridge a third time. I made it to the final round of interviews, but history repeated itself: rejection. The feedback was that while my editorial skills were strong, they wanted someone with more experience in the business side of publishing.</p>
          
          <p>That rejection hit the hardest because I had come so close. But instead of seeing it as a failure, I used it as a roadmap. I leveraged my business classes to move into a role that straddled editorial and business development at my company. I launched a successful imprint that attracted critical acclaim and, more importantly, turned a profit in an industry where that's increasingly difficult.</p>
          
          <p>When the Editorial Director position at Westridge opened up, they called me. I didn't have to apply. During the interview process, the CEO mentioned that they had been watching my career develop and had actually considered recruiting me the previous year.</p>
          
          <p>Today, I lead the department that rejected me three times. Several of the people who had interviewed me now report to me. But I don't view it as vindication or revenge - I see those rejections as necessary redirections that forced me to develop skills I would have otherwise neglected.</p>
          
          <p>Without those rejections, I wouldn't have become the well-rounded publishing executive I am today. In fact, I've instituted a policy where we provide substantive feedback to every candidate we interview, because I know from experience how valuable that guidance can be - even when it comes wrapped in a rejection.</p>
        `,
      },
      {
        id: "6",
        quote: "Your voice isn't right for our radio station.",
        description: "I was told I didn't have the voice for broadcasting.",
        outcome: "My podcast now has over 5 million monthly listeners.",
        author: "Emily Johnson",
        date: "March 10, 2025",
        featured: false,
        size: "small",
        content: `
          <p>I had been volunteering at my college radio station for two years when I applied for a paid weekend position. The station manager didn't even wait for me to finish my demo tape. "Your voice isn't right for our radio station," he said. "You have a slight lisp and your tone is too conversational. Radio requires a more authoritative presence."</p>
          
          <p>I was devastated. I had grown up listening to that station and had been volunteering there, unpaid, hoping it would lead to a job. But apparently, the voice I had been born with - the way I naturally spoke - wasn't good enough.</p>
          
          <p>I considered taking voice lessons or speech therapy to "fix" my apparent flaws. But then I thought: why should I have to change the way I talk? Surely there were listeners out there who would appreciate a voice that sounded more like a real person than a broadcast announcer.</p>
          
          <p>This was in 2016, when podcasting was growing but hadn't yet exploded into the mainstream. On a whim, I started a podcast interviewing local small business owners about their journeys. I used my "too conversational" tone and didn't try to hide my slight lisp. I just talked like myself.</p>
          
          <p>The podcast grew slowly at first - a few hundred listeners, then a few thousand. I expanded beyond local businesses to entrepreneurs from all over the country. My conversational style turned out to be perfect for making guests comfortable, and they opened up to me in ways they didn't in other interviews.</p>
          
          <p>Three years in, my podcast got picked up by a major network. Today, it has over 5 million monthly listeners, has won multiple industry awards, and I've interviewed everyone from first-time founders to billionaire entrepreneurs. I've turned down multiple offers from radio stations - including the one that rejected me - because I've built something more authentic and ultimately more successful than what I would have created if I had tried to fit their mold.</p>
          
          <p>Sometimes rejection is the universe's way of redirecting you to where you're actually meant to be. If I had gotten that radio job, I might still be working weekends at a local station, trying to sound like someone I'm not. Instead, I found success by embracing exactly what they told me was a weakness.</p>
          
          <p>The station manager who rejected me actually came on my podcast as a guest last year. He apologized for not seeing my potential, and I thanked him. Without his rejection, I might never have found my true path.</p>
        `,
      },
    ];

    const foundStory = featuredStories.find(s => s.id === id);
    setStory(foundStory || null);
    setLoading(false);
  }, []);

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
          <p className="text-sm text-gray-500 mb-2">{story.date}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {story.quote}
          </h1>
          <div className="border-l-4 border-gray-300 pl-4 mb-8">
            <p className="text-xl text-gray-700 italic mb-2">{story.description}</p>
            <p className="text-xl text-green-700 font-medium">{story.outcome}</p>
          </div>
          
          {/* Author with Avatar */}
          <div className="flex items-center py-4 px-6 bg-gray-50 rounded-lg border border-gray-100">
            <div className="mr-6">
              <AuthorAvatar name={story.author} size="large" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">{story.author}</h3>
              <p className="text-sm text-gray-500">{story.date}</p>
              <p className="mt-2 text-gray-600 max-w-md">
                {story.author} shares their personal journey from rejection to success in this powerful story.
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