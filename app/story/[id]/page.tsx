'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatdate } from "@/lib/utils"
import { use } from 'react';

// This interface defines the shape of our story data
interface Story {
  id: string | number;
  quote: string;
  description: string;
  outcome: string;
  author: string;
  date: string;
  featured: boolean;
  size: string;
  content?: string;
  image_url?: string; // Optional field for uploaded image
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
    
    // Special case for Hank Couture
    if (lowerName === "hank couture") {
      return "/hank-couture.jpg";
    }
    
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

// // Mock data for our featured stories
// const featuredStories = [
//   {
//     id: "1",
//     quote:
//       "Your manuscript is both good and original, but the part that is good is not original and the part that is original is not good.",
//     description: "After multiple rejections from publishers, I almost gave up on my writing career.",
//     outcome: "I'm now a New York Times bestselling author with over 1 million copies sold.",
//     author: "Jane Smith",
//     date: "April 1, 2025",
//     featured: true,
//     size: "large",
//     content: `
//       <p>I still remember the day that letter arrived. It was raining, which felt appropriate. The envelope was thin - never a good sign. I'd sent my manuscript to over 20 publishers by that point, but this rejection hurt the most.</p>
      
//       <p>"Your manuscript is both good and original," the letter read, "but the part that is good is not original and the part that is original is not good."</p>
      
//       <p>I'd put three years of my life into that book. Three years of early mornings, late nights, and weekends spent hunched over my laptop while friends went out and enjoyed their lives. For what? To be dismissed with a clever turn of phrase that probably made the editor feel terribly witty.</p>
      
//       <p>I nearly quit that day. I deleted my manuscript folder, emptied the recycle bin, and swore I was done with writing forever. But I had a backup copy in my email, and after a week of feeling sorry for myself, I opened it again.</p>
      
//       <p>This time, instead of seeing my precious words, I tried to see what that editor had seen. And slowly, painfully, I realized they were right. The good parts were derivative, and the original parts weren't working. I had been so close to my work that I couldn't see its flaws.</p>
      
//       <p>I spent another year rewriting the entire book. Not revising - rewriting from scratch. I kept the concept but approached it with everything I'd learned from my failures. When I finished, I had a manuscript that was both original AND good.</p>
      
//       <p>The 22nd publisher I submitted to offered me a contract. The book spent 36 weeks on the New York Times bestseller list. The translation rights sold in 42 countries. And the editor who had rejected me with that devastating line? They're now my editor at a different publishing house, and we laugh about that rejection letter.</p>
      
//       <p>Sometimes the most brutal rejections are exactly what we need to hear, even if we're not ready to hear them at the time.</p>
//     `,
//   },
//   {
//     id: "2",
//     quote: "We don't see enough leadership potential in you to move forward with your application.",
//     description: "A major tech company's leadership program rejected me, saying I lacked potential.",
//     outcome: "I founded my own company that now employs 50 people.",
//     author: "John Doe",
//     date: "March 28, 2025",
//     featured: false,
//     size: "medium",
//     content: `
//       <p>I'd always been a high achiever. Valedictorian in high school, summa cum laude in college, and I landed a good entry-level job at a respected tech company right after graduation. I thought I was on the fast track to success.</p>
      
//       <p>After two years in my role, I applied to the company's prestigious leadership development program. It was highly selective, with only about 5% of applicants making it through. But I was confident - I had consistently exceeded my targets and received excellent performance reviews.</p>
      
//       <p>The rejection email arrived while I was in a meeting. "After careful consideration," it read, "we don't see enough leadership potential in you to move forward with your application."</p>
      
//       <p>Leadership potential? I was stunned. What did that even mean? I asked my manager for feedback, and what I heard was vague at best. I was "too heads-down," "not strategic enough," "good at execution but not visionary."</p>
      
//       <p>For weeks, I walked around feeling like I had "NO LEADERSHIP POTENTIAL" stamped on my forehead. I started doubting every decision I made. Maybe they saw something in me that I couldn't see in myself? Maybe I really wasn't cut out for leadership?</p>
      
//       <p>Then one day, I got frustrated with a problem our team had been struggling with for months. I couldn't understand why no one had fixed it yet. So instead of complaining, I spent a weekend building a prototype solution. When I showed it to my team on Monday, they were impressed. My manager asked me to develop it further.</p>
      
//       <p>That's when I realized: leadership isn't granted by committees or bestowed in programs. Real leadership comes from seeing problems and taking initiative to solve them. I didn't need anyone's permission to lead.</p>
      
//       <p>Six months later, I left to start my own company based on that prototype. It wasn't easy - I made countless mistakes and had to learn everything on the fly. But five years later, we have 50 employees, and ironically, I'm now approached by the same company that rejected me to speak to their leadership program participants about entrepreneurship.</p>
      
//       <p>Sometimes being told you can't do something is exactly the motivation you need to prove that you can.</p>
//     `,
//   },
//   {
//     id: "3",
//     quote: "You lack the qualifications necessary for our medical program. We suggest exploring other career paths.",
//     description: "I was rejected from all 15 medical schools I applied to on my first try.",
//     outcome: "I'm now the head of neurosurgery at a leading hospital.",
//     author: "Dr. Sarah Johnson",
//     date: "March 25, 2025",
//     featured: false,
//     size: "medium",
//     content: `
//       <p>The most painful rejection came from my top choice medical school. While most schools sent form letters, this one was personalized: "You lack the qualifications necessary for our medical program. We suggest exploring other career paths."</p>
      
//       <p>I had applied to 15 medical schools. I received 15 rejections. My GPA was good but not stellar, my MCAT score was above average but not exceptional, and though I had research experience, it wasn't in a prestigious lab. On paper, I was mediocre.</p>
      
//       <p>But being a doctor wasn't just something I wanted - it was who I was meant to be. I knew this with absolute certainty. So I took a year to strengthen my application. I retook the MCAT after months of intensive study. I found a research position in a neuroscience lab. I volunteered more hours at the hospital.</p>
      
//       <p>When I reapplied, I was accepted to three schools, including my top choice - the same one that had suggested I explore other career paths. During orientation, the admissions director pulled me aside and told me my was the most improved reapplication they had ever seen. "You proved us wrong," she said. "Never stop doing that."</p>
      
//       <p>In medical school, I discovered a passion for neurosurgery - one of the most competitive specialties. When I shared my interest with an advisor, he laughed and said I should consider something "more realistic." There it was again - that suggestion that I aim lower, that I wasn't quite good enough.</p>
      
//       <p>I matched into neurosurgery at a top program.</p>
      
//       <p>During my residency, when I expressed interest in a particularly challenging subspecialty, my chief resident told me, "That's a tough field for anyone, especially for a woman." I specialized in exactly that field.</p>
      
//       <p>Now, I'm the head of neurosurgery at a leading hospital, and I keep the original rejection letter framed in my office. It reminds me that other people's assessments of our potential are just opinions, not facts. And opinions can be wrong.</p>
      
//       <p>Every time someone tells me I can't do something, it just adds fuel to my determination to prove them wrong.</p>
//     `,
//   },
//   {
//     id: "4",
//     quote: "Your business idea is too niche and won't find a market.",
//     description: "Every investor I approached turned down my startup idea.",
//     outcome: "My company was acquired last year for $50 million.",
//     author: "Michael Chen",
//     date: "March 20, 2025",
//     featured: false,
//     size: "small",
//     content: `
//       <p>I lost count of how many investors rejected my startup idea. Twenty? Thirty? The responses varied from polite passes to barely concealed contempt. One VC actually laughed during my pitch.</p>
      
//       <p>"Your business idea is too niche and won't find a market," was the common refrain. "There's not enough pain point here." "The market size is too small." "This is a feature, not a company."</p>
      
//       <p>My idea was a specialized software tool for architectural acousticians - the engineers who design the sound experience in concert halls, recording studios, and other spaces where acoustics matter. I knew it was niche. There are only a few thousand such professionals worldwide. But I had been one of them for seven years, and I knew their pain points intimately because they were my pain points.</p>
      
//       <p>The existing tools were outdated, clunky, and expensive. I knew I could build something better, more intuitive, and cloud-based that would transform how these professionals worked. The market might be small, but it was deep, and these customers would pay well for the right solution.</p>
      
//       <p>After every rejection, I refined my pitch. I gathered more evidence. I built a better prototype. But ultimately, I couldn't convince any investors that this niche was worth pursuing.</p>
      
//       <p>So I bootstrapped. I kept my day job and built the product nights and weekends with two former colleagues. We launched with zero marketing budget, relying entirely on word of mouth within this small, tight-knit professional community.</p>
      
//       <p>Within six months, we had captured 10% of the global market. By the end of the first year, we were profitable. By year three, we were the industry standard, with 70% market penetration. And last year, a major design software company acquired us for $50 million, seeing our tool as the perfect addition to their suite of architectural products.</p>
      
//       <p>Sometimes, being too niche isn't a weakness - it's a superpower. We understood our users better than any generalist could have. We solved real problems that had been ignored because the market wasn't "sexy" enough for VCs.</p>
      
//       <p>The investors who rejected us weren't wrong about the market size. It was small. They were just wrong about whether you could build a valuable company serving that market.</p>
//     `,
//   },
//   {
//     id: "5",
//     quote: "We regret to inform you that your application has been declined.",
//     description: "I was rejected from my dream job three times over five years.",
//     outcome: "I now lead the department that once rejected me.",
//     author: "Robert Williams",
//     date: "March 15, 2025",
//     featured: false,
//     size: "small",
//     content: `
//       <p>The first time I applied to Westridge Publishing's editorial department, I was fresh out of college with an English degree and big dreams. My rejection letter was a standard form: "We regret to inform you that your application has been declined."</p>
      
//       <p>I took an assistant position at a smaller publisher and spent two years learning the industry. When a junior editor position opened at Westridge, I applied again. This time, I got an interview but ultimately another rejection.</p>
      
//       <p>Instead of giving up, I focused on building expertise that would make me undeniable. I took night classes in business administration. I started a literary blog that gained a following. I volunteered to take on the most challenging projects at work, even when they fell outside my job description.</p>
      
//       <p>Two years later, I applied to Westridge a third time. I made it to the final round of interviews, but history repeated itself: rejection. The feedback was that while my editorial skills were strong, they wanted someone with more experience in the business side of publishing.</p>
      
//       <p>That rejection hit the hardest because I had come so close. But instead of seeing it as a failure, I used it as a roadmap. I leveraged my business classes to move into a role that straddled editorial and business development at my company. I launched a successful imprint that attracted critical acclaim and, more importantly, turned a profit in an industry where that's increasingly difficult.</p>
      
//       <p>When the Editorial Director position at Westridge opened up, they called me. I didn't have to apply. During the interview process, the CEO mentioned that they had been watching my career develop and had actually considered recruiting me the previous year.</p>
      
//       <p>Today, I lead the department that rejected me three times. Several of the people who had interviewed me now report to me. But I don't view it as vindication or revenge - I see those rejections as necessary redirections that forced me to develop skills I would have otherwise neglected.</p>
      
//       <p>Without those rejections, I wouldn't have become the well-rounded publishing executive I am today. In fact, I've instituted a policy where we provide substantive feedback to every candidate we interview, because I know from experience how valuable that guidance can be - even when it comes wrapped in a rejection.</p>
//     `,
//   },
//   {
//     id: "6",
//     quote: "Your voice isn't right for our radio station.",
//     description: "I was told I didn't have the voice for broadcasting.",
//     outcome: "My podcast now has over 5 million monthly listeners.",
//     author: "Emily Johnson",
//     date: "March 10, 2025",
//     featured: false,
//     size: "small",
//     content: `
//       <p>I had been volunteering at my college radio station for two years when I applied for a paid weekend position. The station manager didn't even wait for me to finish my demo tape. "Your voice isn't right for our radio station," he said. "You have a slight lisp and your tone is too conversational. Radio requires a more authoritative presence."</p>
      
//       <p>I was devastated. I had grown up listening to that station and had been volunteering there, unpaid, hoping it would lead to a job. But apparently, the voice I had been born with - the way I naturally spoke - wasn't good enough.</p>
      
//       <p>I considered taking voice lessons or speech therapy to "fix" my apparent flaws. But then I thought: why should I have to change the way I talk? Surely there were listeners out there who would appreciate a voice that sounded more like a real person than a broadcast announcer.</p>
      
//       <p>This was in 2016, when podcasting was growing but hadn't yet exploded into the mainstream. On a whim, I started a podcast interviewing local small business owners about their journeys. I used my "too conversational" tone and didn't try to hide my slight lisp. I just talked like myself.</p>
      
//       <p>The podcast grew slowly at first - a few hundred listeners, then a few thousand. I expanded beyond local businesses to entrepreneurs from all over the country. My conversational style turned out to be perfect for making guests comfortable, and they opened up to me in ways they didn't in other interviews.</p>
      
//       <p>Three years in, my podcast got picked up by a major network. Today, it has over 5 million monthly listeners, has won multiple industry awards, and I've interviewed everyone from first-time founders to billionaire entrepreneurs. I've turned down multiple offers from radio stations - including the one that rejected me - because I've built something more authentic and ultimately more successful than what I would have created if I had tried to fit their mold.</p>
      
//       <p>Sometimes rejection is the universe's way of redirecting you to where you're actually meant to be. If I had gotten that radio job, I might still be working weekends at a local station, trying to sound like someone I'm not. Instead, I found success by embracing exactly what they told me was a weakness.</p>
      
//       <p>The station manager who rejected me actually came on my podcast as a guest last year. He apologized for not seeing my potential, and I thanked him. Without his rejection, I might never have found my true path.</p>
//     `,
//   },
// ];

const featuredStories: Story[] = [
  {
    id: "submit1",
    quote: "Rejected by colleges, VCs, accelerators, MBA programs, and LPs — repeatedly — at nearly every stage of his early career.",
    description: "Hank Couture's journey is a testament to persistence through rejection. At 19, he was rejected by all the colleges he ambitiously applied to — even his safety school.",
    outcome: "Rejections became redirections. Couture's ability to reflect, adapt, and press forward forged an unconventional but highly impactful path.",
    author: "Hank Couture",
    date: "April 5, 2025", // Current week's date
    featured: true, // This is the featured story for this week
    size: "large",
    content: `
      <p>Hank Couture's journey is a testament to persistence through rejection. At 19, he was rejected by all the colleges he ambitiously applied to — even his safety school. He enrolled in community college, where he gained not only credits but perspective.</p>
      
      <p>At 20, he tried to break into venture capital through cold outreach but received no traction. His emails, by his own admission, weren't great. The rejections were numerous and often without explanation, which led to a period of self-doubt and questioning.</p>
      
      <p>At 21, his college startup was dismissed as a "lifestyle business," and both Y Combinator and Techstars passed without an interview. The feedback he received was that his idea lacked scalability and market potential. Despite his conviction in the concept, he couldn't convince the gatekeepers to give him a chance.</p>
      
      <p>By 23, he faced further setbacks when he failed final interviews at Palantir and Expa. Frustrated with the constant rejection in traditional career paths, he made a pivotal decision to quit his job search altogether and teach himself how to code. This self-directed learning period proved transformative, building skills that would later become invaluable.</p>
      
      <p>At 25, while working early at DoorDash, Couture applied to several prestigious MBA programs — Stanford, Harvard, Northwestern, and UChicago — and was rejected by all. The rejections cited his unconventional background and lack of traditional leadership experience. What seemed like another door closing actually kept him at DoorDash during some of its most formative years.</p>
      
      <p>Ironically, staying at DoorDash led to some of the most impactful years of his life, culminating in the company's IPO. The experience gave him frontline exposure to hypergrowth, scaling challenges, and the inner workings of a successful startup — experiences no MBA program could have provided in quite the same way.</p>
      
      <p>At 33, with no formal investing experience, he launched LeapYear, a solo venture fund backing students, dropouts, and new grads. Institutional LPs passed, citing his lack of track record and the risky demographic focus. But Couture didn't give up. He raised his fund through people who knew him, believed in his vision, and took the time to listen.</p>
      
      <p>Through LeapYear, he now champions the very kind of young talent he once was — driven, overlooked, and underestimated. His fund represents a new model in venture capital, one rooted in belief, boldness, and second chances.</p>
      
      <p>Looking back, Couture sees each rejection not as a roadblock but as a redirection that ultimately led him to his true path. His story reminds us that conventional success metrics and traditional gatekeepers don't always recognize unconventional potential. Sometimes, the most transformative journeys begin with a "no."</p>
    `,
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
    content: `
      <p>In 2005, Evan Williams co-founded Odeo, a podcasting platform meant to ride the wave of growing audio content. The vision was to build a directory and creation tool for the emerging medium of podcasting, which was showing early signs of promise. Williams, fresh off selling Blogger to Google, invested his own money and raised venture capital for this new venture.</p>
      
      <p>However, shortly after launch, Apple announced iTunes would support podcasts, effectively overwhelming Odeo's market potential. With Apple's massive user base and established digital media ecosystem, Odeo suddenly found itself in direct competition with a tech giant that controlled both the hardware and software that most podcast listeners used.</p>
      
      <p>The announcement caught the Odeo team off guard. As Williams later described it: "We were a tiny company with a dozen employees going up against Apple. It seemed like our opportunity had passed."</p>
      
      <p>Facing obsolescence, Williams made a bold move. Rather than continuing to compete in a market now dominated by Apple, he gathered the Odeo team for a hackathon, encouraging employees to break into small groups and explore new ideas. During this period of creative exploration, a small team including Jack Dorsey developed a prototype for a service that would allow users to send status updates via SMS.</p>
      
      <p>Williams and his team brainstormed new ideas, one of which was a platform for sharing short, real-time status updates. The concept, initially called "twttr," was designed around SMS messaging with a 140-character limit (determined by SMS constraints). What started as a side project quickly gained traction among the team.</p>
      
      <p>Williams made the difficult decision to return money to Odeo's investors and buy back the company's assets, including the fledgling Twitter project. Not all investors were happy with this unusual move, but Williams believed in the potential of this new direction.</p>
      
      <p>This pivot led to the creation of Twitter in 2006. Initially a side project, Twitter quickly gained traction and grew into a global platform, transforming real-time communication and playing a critical role in news, politics, and social movements. The service found its first significant audience at the SXSW conference in 2007, where usage increased dramatically.</p>
      
      <p>Twitter went on to become a transformative communication platform, revolutionizing how people share information, follow breaking news, and engage with public figures. What began as a response to rejection by market circumstances evolved into a company valued at billions of dollars that fundamentally changed how the world communicates.</p>
      
      <p>Williams' story demonstrates how market rejection can force innovation and lead to unexpected opportunities. The death of one idea became the birth of something far more impactful than anyone could have predicted.</p>
    `,
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
    content: `
      <p>Howard Schultz joined Starbucks in 1982 as the Director of Marketing when it was still a small Seattle company selling coffee beans. A year later, while on a business trip to Milan, Italy, Schultz had an epiphany when he experienced the vibrant Italian coffeehouse culture—espresso bars that served as "third places" between home and work, community gathering spots with a sense of connection and romance.</p>
      
      <p>Inspired, Schultz tried to convince Starbucks' owners to adopt the Italian-style espresso bar model. When they declined, believing Starbucks should remain focused on selling coffee beans rather than beverages, Schultz was devastated. The owners were unwilling to take the risk of transforming their business model, concerned that serving drinks would distract from their core business and alter the company's identity.</p>
      
      <p>Rather than abandoning his vision, Schultz made the difficult decision to leave Starbucks in 1985 to launch his own coffee company, Il Giornale. Named after an Italian newspaper, the cafes served espresso drinks and focused on recreating the coffeehouse experience Schultz had fallen in love with in Italy.</p>
      
      <p>Raising the startup capital wasn't easy. Despite financial challenges and skeptical investors who questioned whether Americans would pay premium prices for coffee drinks, Schultz pursued his vision relentlessly. He approached 242 potential investors, and 217 said no. Many told him the concept would never work in a culture dominated by fast food and instant coffee.</p>
      
      <p>Two years later, fate presented an unexpected opportunity when the original owners of Starbucks decided to sell the company. Despite having limited resources, Schultz raised $3.8 million to purchase Starbucks in 1987, merging it with Il Giornale. He became CEO of the combined company, which retained the Starbucks name but adopted Schultz's coffeehouse vision.</p>
      
      <p>Under his leadership, Starbucks grew into a global coffeehouse brand. Schultz implemented comprehensive employee benefits including healthcare for part-time workers and stock options (called "Bean Stock"), revolutionary practices in the retail and food service industries at the time.</p>
      
      <p>Schultz overcame further hurdles, including economic downturns and internal crises. When Starbucks faced serious challenges in 2008 during the financial crisis, Schultz returned as CEO after an eight-year hiatus to lead a massive turnaround effort, closing underperforming stores and refocusing on the customer experience.</p>
      
      <p>Today, Starbucks has over 35,000 stores in more than 80 countries, forever changing how people experience coffee worldwide. What began as a rejected idea has created tens of thousands of jobs and transformed an entire industry.</p>
      
      <p>Schultz's story exemplifies the power of conviction in the face of rejection. Rather than compromise his vision, he found another path forward, ultimately creating something far greater than even he had initially imagined.</p>
    `,
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
    content: `
      <p>Travis Kalanick's journey through rejection began with his first venture, Scour, an early peer-to-peer file-sharing service he co-founded while still a computer science student at UCLA in 1997. The pioneering platform allowed users to search for and exchange files—including music and videos—directly with other users.</p>
      
      <p>While Scour gained popularity and secured some initial investment, the company soon faced an existential threat. In 2000, at the height of the dot-com bubble, the Recording Industry Association of America (RIAA), the Motion Picture Association of America (MPAA), and the National Music Publishers Association filed a $250 billion lawsuit against Scour, alleging copyright infringement.</p>
      
      <p>The astronomical figure of the lawsuit—larger than the GDP of many countries—was intended to make an example of the fledgling company. Unable to fight the legal battle, Scour filed for bankruptcy. For Kalanick, it was a crushing defeat that taught him hard lessons about disruption, established industries, and legal challenges.</p>
      
      <p>Rather than retreating from entrepreneurship after such a public failure, Kalanick immediately founded Red Swoosh in 2001—another file-sharing company, but with a crucial difference. Red Swoosh developed technology that helped media companies distribute content online legally, turning the very problem that killed Scour into a new business opportunity.</p>
      
      <p>But Red Swoosh wasn't an immediate success either. The company struggled during the post-dot-com crash era. At one point, Kalanick couldn't pay himself a salary for three years, maxed out his credit cards, and moved back in with his parents. The IRS came after the company for unpaid taxes, and Kalanick faced additional challenges with co-founders leaving and investment deals falling through at the last minute.</p>
      
      <p>Despite these challenges, Kalanick persisted and eventually secured new funding. His determination paid off when Red Swoosh was acquired by Akamai Technologies in 2007 for approximately $19 million—providing Kalanick with his first major financial success and entrepreneurial vindication.</p>
      
      <p>Undeterred by his roller-coaster experience, he co-founded Uber in 2009, which began as a simple ride-hailing app. Uber faced tremendous resistance from established taxi industries, regulatory challenges, and skepticism about its business model. Kalanick's aggressive approach to expansion often put him at odds with local governments and transportation authorities, but also enabled Uber's remarkable global growth.</p>
      
      <p>Uber revolutionized transportation globally. Despite controversies and his eventual resignation from the CEO position in 2017 following a series of scandals, Kalanick's idea fundamentally changed how people travel, giving rise to the gig economy and on-demand services that have transformed numerous industries.</p>
      
      <p>The company he founded went public in 2019 with a valuation of over $75 billion, and the "Uber model" has been replicated across countless industries, from food delivery to home services. Kalanick's journey from a bankrupted company to creating one of the most transformative businesses of the 21st century demonstrates how rejection and failure can be powerful catalysts for innovation and renewed determination.</p>
    `,
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
    content: `
      <p>While at Harvard Business School, Katrina Lake launched Stitch Fix to modernize the shopping experience. The idea came from her own frustration with traditional retail and a belief that technology could create a more personalized approach to fashion. Lake envisioned using data science to match customers with clothing tailored to their preferences, body types, and lifestyles.</p>
      
      <p>In 2011, Lake started the business from her apartment in Cambridge, Massachusetts. She would personally shop for clients, mail them boxes of selected items, and handle returns herself. This hands-on approach gave her valuable insights into customer needs and preferences, but scaling the business required significant capital.</p>
      
      <p>Using data to personalize fashion was a novel concept, and Lake faced logistical issues and funding rejections. When Lake pitched to venture capitalists, she encountered significant skepticism. Many investors doubted her business model and resisted funding Stitch Fix. Some questioned whether women would trust an online service to select their clothing, while others were concerned about the capital-intensive nature of holding inventory.</p>
      
      <p>One particularly memorable rejection came when an investor told her, "I just don't think women would ever shop this way." Another questioned whether a "subscription box for women's clothing" could ever become a billion-dollar business. The fashion industry was seen as too subjective and fickle for a data-driven approach, and many investors preferred to back male founders in technology sectors they understood better.</p>
      
      <p>Despite the rejections, Lake remained convinced of her vision. She bootstrapped the company as long as possible, reinvesting revenue and keeping operations lean. Her determination paid off as she secured the necessary capital and refined her tech-enabled model. Lake's early believers included Baseline Ventures and Benchmark, who saw the potential in her unique combination of fashion, data science, and personalized service.</p>
      
      <p>Lake's persistence in the face of skepticism extended beyond funding. She built a company culture that valued diverse perspectives, hired data scientists who could translate customer preferences into algorithms, and created logistics systems that could efficiently manage inventory and personalization at scale.</p>
      
      <p>Stitch Fix went public in 2017, making Lake, at age 34, the youngest female founder ever to lead an IPO. The successful public offering validated her business model and approach. Lake also made history as one of the few female CEOs in both the technology and retail sectors to take a company public.</p>
      
      <p>Despite legal and economic challenges, including increased competition and market volatility, Lake's innovation propelled the company to the forefront of personalized online fashion retail. Under her leadership, Stitch Fix expanded into men's clothing, plus sizes, and international markets, continually refining its algorithms to improve personalization.</p>
      
      <p>Lake's story demonstrates how rejection can fuel innovation and determination. By persisting despite investor skepticism and industry doubts, she created a new retail category and proved that data science could indeed transform even the most subjective and personal consumer experiences.</p>
    `,
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
    content: `
      <p>Frustrated by a $40 late DVD fee for "Apollo 13," Reed Hastings co-founded Netflix with Marc Randolph in 1997 as a DVD rental company that shipped discs to customers by mail. The subscription model eliminated late fees and provided a wider selection than brick-and-mortar stores could offer, but it was just the beginning of Hastings' vision.</p>
      
      <p>In 2007, he made the bold decision to pivot to streaming, recognizing that digital distribution represented the future of entertainment. However, this transition faced tremendous resistance from studios and major technical hurdles. Content providers resisted the transition to streaming, fearing loss of traditional revenue streams and potential piracy issues.</p>
      
      <p>Major movie and television studios were hesitant to license their content to the fledgling streaming service, concerned about cannibalizing their lucrative DVD sales and traditional broadcast deals. Some outright refused to work with Netflix, while others demanded exorbitant licensing fees that threatened the economic viability of the streaming model.</p>
      
      <p>Beyond content acquisition challenges, Netflix faced significant technical obstacles. Streaming high-quality video required substantial bandwidth at a time when most households had relatively slow internet connections. The company had to develop adaptive streaming technology that could adjust video quality based on available bandwidth, while also building the infrastructure to support millions of simultaneous streams.</p>
      
      <p>Nonetheless, Hastings invested in infrastructure and gradually shifted consumer behavior. He committed substantial resources to building a robust content delivery network and developing streaming technology that would work across multiple devices and varying internet speeds. Engineers at Netflix pioneered new approaches to video compression and delivery that would later become industry standards.</p>
      
      <p>Wall Street was initially skeptical of the streaming pivot. In 2011, when Hastings announced the separation of the DVD and streaming businesses (briefly naming the DVD service "Qwikster"), Netflix's stock plummeted by 75%. Critics and shareholders questioned whether the company was abandoning its core business too quickly.</p>
      
      <p>Despite these setbacks, Hastings remained committed to the streaming vision. Netflix became the pioneer of digital streaming, forever changing how people consume television and film. By creating award-winning originals like "House of Cards" and "Orange Is the New Black" starting in 2013, Netflix reduced its dependence on licensed content while establishing itself as a premium content creator.</p>
      
      <p>Expanding globally was another challenge, requiring navigation of different regulatory environments, content preferences, and technical infrastructure limitations. Nevertheless, by creating award-winning originals and expanding to over 190 countries, Hastings led the company to dominate the entertainment industry, transforming Netflix from a DVD rental service into a global entertainment powerhouse with over 200 million subscribers worldwide.</p>
      
      <p>Hastings' willingness to disrupt his own successful business model before it became obsolete, his persistence in the face of industry resistance, and his long-term vision despite short-term setbacks exemplify how overcoming rejection can lead to revolutionary change.</p>
    `,
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
    content: `
      <p>When Reddit launched in 2005, it had no traffic. The platform, created by roommates Steve Huffman and Alexis Ohanian shortly after graduating from the University of Virginia, was essentially an empty room—a link-sharing website without links or users to share them.</p>
      
      <p>The initial rejection came in the form of silence. After being accepted into Y Combinator's first batch, they had built a platform that nobody was using. Their original idea, a mobile food ordering app called MyMobileMenu, had been rejected by Y Combinator's Paul Graham, who instead suggested they build "the front page of the Internet." But upon launch, that front page remained stubbornly empty.</p>
      
      <p>Faced with this underwhelming start, Huffman and Ohanian made a strategic decision. They created fake accounts to simulate a lively user base, guiding early discussions and building a sense of community. Using various usernames, they would submit links, comment on their own submissions, and create the illusion of activity and engagement.</p>
      
      <p>"We would submit content, leave comments and basically just act like users," Huffman later admitted. "We had conversations with ourselves for weeks." This artificial activity served several purposes: it demonstrated how the site was meant to be used, it created content for new visitors to engage with, and it gave the impression that Reddit was more popular than it actually was.</p>
      
      <p>This approach was particularly crucial because of Reddit's community-based model. Unlike other websites that could function with minimal user interaction, Reddit's entire value proposition depended on active community participation. Without users, there was no Reddit—just an empty framework.</p>
      
      <p>Gradually, real users began to trickle in, attracted by the seemingly active discussions. As the genuine user base grew, Huffman and Ohanian were able to reduce their fake account activities. The community began to take on a life of its own, with users creating subreddits (topic-specific forums) and developing unique cultural norms and inside jokes.</p>
      
      <p>Reddit's growth accelerated when it introduced the concept of subreddits in 2008, allowing users to create their own communities focused on specific interests. This decentralized approach to community-building enabled Reddit to expand organically across countless niches, from major topics like news and technology to highly specialized interests.</p>
      
      <p>Reddit now boasts over 430 million users, with more than 100,000 active communities. Their strategy of simulating activity proved the power of perceived popularity and laid the groundwork for one of the internet's most influential platforms. The site has become a cultural force, influencing everything from meme culture to stock markets, and has been instrumental in countless community-driven initiatives.</p>
      
      <p>What began as a response to rejection—creating fake users when real ones didn't materialize—became a masterclass in community building. Huffman and Ohanian's willingness to manually create the experience they envisioned, rather than waiting passively for users to arrive, demonstrated the entrepreneurial principle that sometimes you need to manufacture momentum before real momentum can take hold.</p>
    `,
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
    content: `
      <p>Rob Hull envisioned Adaptive Insights (originally named Adaptive Planning) as a solution for business planning and analytics. Drawing from his experience as a CFO, Hull recognized that most companies were still relying on cumbersome spreadsheets for financial planning, budgeting, and forecasting—processes that were error-prone, time-consuming, and difficult to collaborate on.</p>
      
      <p>His vision was to create cloud-based software that would simplify these critical business processes, making sophisticated financial planning tools accessible to companies of all sizes, not just large enterprises with substantial IT budgets. The idea seemed logical to Hull, who had experienced the pain points firsthand.</p>
      
      <p>However, venture capitalists dismissed the idea repeatedly—70 times. The rejections came for various reasons. Many VCs believed that companies wouldn't trust cloud-based solutions for sensitive financial data (the company was founded in 2003, when cloud computing was still viewed with skepticism). Others thought the market was too narrow or that Hull, who lacked software development experience, wasn't the right founder to execute the vision.</p>
      
      <p>One particularly memorable rejection came when a prominent venture capitalist told Hull, "Financial planning is just a feature, not a company." Another suggested that Excel was "good enough" and that there wasn't sufficient demand for a specialized solution.</p>
      
      <p>The constant stream of rejections would have deterred many entrepreneurs, but Hull used each meeting as an opportunity to refine his thinking. He took note of the objections, improved his pitch, and adjusted his business strategy accordingly.</p>
      
      <p>Undeterred, Hull kept refining his pitch and strategy until he finally secured funding. After nearly a year of rejections, Hull managed to raise a modest seed round from angel investors who believed in his vision. With this initial capital, he assembled a small team and built the first version of the product.</p>
      
      <p>The early days were challenging. The company had to operate with minimal resources, and Hull often questioned whether the VCs who rejected him were right. But as the product developed and early customers came on board, validation began to emerge. Companies of all sizes were indeed eager for an alternative to spreadsheet-based planning.</p>
      
      <p>Adaptive Insights grew into a billion-dollar company and was acquired by Workday in 2018 for $1.55 billion—a validation of Hull's vision and persistence. By the time of the acquisition, Adaptive Insights had over 3,800 customers across 50 countries and had become a leader in the business planning software market.</p>
      
      <p>Hull's persistence turned a rejected idea into a major success story in enterprise software. The company he founded transformed how businesses approach financial planning and analysis, bringing sophisticated tools to organizations that previously couldn't access them.</p>
      
      <p>His story highlights that experts—even those whose job it is to identify promising businesses—can be wrong, especially about innovative ideas that challenge established practices. It also demonstrates the value of perseverance and using rejection as a tool for refinement rather than a reason to abandon a vision.</p>
    `,
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
    content: `
      <p>Jensen Huang co-founded NVIDIA in 1993 with a vision to revolutionize graphics processing. Having worked at AMD and LSI Logic, Huang believed that specialized processors for rendering graphics would transform computing, particularly for gaming and visual applications. Along with Chris Malachowsky and Curtis Priem, he set out to create graphics processing units (GPUs) that would accelerate 3D graphics rendering.</p>
      
      <p>In the early years, investors were skeptical about the company's narrow focus on GPUs, especially during the dot-com crash when hardware companies were hit hard. Huang faced repeated doubts and limited funding, yet he stayed committed to the core idea. Many potential investors dismissed NVIDIA's prospects, suggesting that graphics processing would eventually be absorbed into central processors (CPUs) made by giants like Intel.</p>
      
      <p>"Investors once told NVIDIA that a graphics-focused company wouldn't survive the tech bubble," Huang recalled in later interviews. The prevailing wisdom was that specialized hardware companies were particularly vulnerable to market downturns and commoditization pressures.</p>
      
      <p>When the dot-com bubble burst in 2000-2001, these fears seemed validated. Hardware companies were among the hardest hit, and NVIDIA's stock plummeted along with the broader tech sector. Analysts questioned whether the company could survive in a market increasingly dominated by integrated solutions from larger players.</p>
      
      <p>Adding to these challenges, NVIDIA faced fierce competition from established companies like ATI Technologies (later acquired by AMD). The graphics card market was seen as a commodity business with thin margins and limited growth potential. Many advised Huang to diversify away from graphics processing or sell the company.</p>
      
      <p>Huang not only resisted these pressures but doubled down on his belief in the importance of specialized processors. He guided NVIDIA through the difficult years following the tech bubble, continuing to invest in R&D and pushing the boundaries of what GPUs could do.</p>
      
      <p>A pivotal moment came when Huang recognized that the parallel processing capabilities of GPUs could be applied beyond graphics rendering. In 2006, NVIDIA introduced CUDA, a platform that allowed developers to use GPUs for general-purpose computing tasks. This insight—that the architecture developed for rendering graphics could also accelerate a wide range of computational problems—would prove transformative.</p>
      
      <p>NVIDIA not only survived but led the AI and GPU revolution. As artificial intelligence and deep learning gained momentum in the 2010s, NVIDIA's GPUs emerged as the ideal hardware for training complex neural networks. The parallel processing capabilities that made GPUs excellent for graphics rendering also made them perfect for the matrix operations underlying machine learning algorithms.</p>
      
      <p>Huang's long-term vision helped redefine computing, gaming, and artificial intelligence, making NVIDIA a trillion-dollar company and a backbone of modern technology. From autonomous vehicles to scientific research, from cloud computing to cryptocurrency mining, NVIDIA's technologies have become essential infrastructure for the digital age.</p>
      
      <p>What investors once dismissed as a niche hardware company has become one of the most valuable technology companies in the world, with NVIDIA's market capitalization exceeding $1 trillion in 2023. Huang's ability to weather rejection, maintain focus on his vision, and recognize new applications for NVIDIA's core technology has created extraordinary value and transformed multiple industries.</p>
    `,
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
    content: `
      <p>After selling Zip2, his first company, to Compaq for $307 million in 1999, Elon Musk co-founded X.com, an online payment company that later merged with Confinity to become PayPal. Despite his role as a founder, Musk was ousted as CEO of PayPal in 2000 while on vacation, replaced by Peter Thiel in a boardroom coup. Though the company would later be sold to eBay for $1.5 billion, providing Musk with a substantial windfall, the experience of being forced out of his own company was a significant rejection.</p>
      
      <p>Rather than retreating from entrepreneurship after this setback, Musk used his fortune to start Tesla and SpaceX, ventures many believed were doomed. Both companies represented extraordinary risks in industries with high barriers to entry, dominated by established players with decades of experience and billions in resources.</p>
      
      <p>When Musk founded SpaceX in 2002, the idea of a private company building rockets was considered absurd. The space industry was dominated by government agencies like NASA and massive defense contractors. Critics pointed out that Musk had no background in aerospace engineering and that even nations struggled with the complexities and costs of space flight.</p>
      
      <p>SpaceX saw its first three rocket launches fail spectacularly. Each failure cost millions and was widely publicized, reinforcing critics' beliefs that Musk was out of his depth. By 2008, with resources dwindling and no successful launches, SpaceX was on the brink of bankruptcy.</p>
      
      <p>Similarly, when Musk invested in Tesla in 2004 and became chairman (later CEO), the automotive industry was skeptical. No successful American car company had been founded since Chrysler in 1925, and electric vehicles were considered a niche market with limited appeal. Industry executives dismissed Tesla, with Bob Lutz, former Vice Chairman of General Motors, stating that "electric cars are an interesting curiosity but they won't make a significant dent in the auto market."</p>
      
      <p>Tesla faced manufacturing delays and funding struggles. The 2008 financial crisis hit both Tesla and SpaceX hard, with Tesla coming within days of bankruptcy. Musk nearly ran out of money funding both companies, ultimately investing his last $20 million into Tesla while taking out personal loans to cover his living expenses.</p>
      
      <p>In what Musk has described as one of the most stressful periods of his life, both companies were saved at the last moment—SpaceX by securing a $1.6 billion contract from NASA after its first successful launch, and Tesla by closing a crucial funding round on Christmas Eve 2008, just hours before the company would have been insolvent.</p>
      
      <p>Despite these near-death experiences, both companies not only survived but thrived. Tesla redefined the auto industry, forcing every major manufacturer to develop electric vehicle strategies and becoming the most valuable car company in the world with a market capitalization exceeding traditional automakers many times its size.</p>
      
      <p>SpaceX became the first private company to send astronauts to space, revolutionized rocket technology with reusable boosters that dramatically reduced launch costs, and initiated ambitious projects like Starlink to provide global satellite internet. Musk turned setbacks into global innovation, now leading some of the most influential companies in the world.</p>
      
      <p>His journey demonstrates how rejection and near-failure can be transformed into extraordinary success through persistence, willingness to take enormous risks, and the ability to inspire others to believe in seemingly impossible visions.</p>
    `,
  },
  {
    id: "submit11",
    quote: "Denied entry into several venture capital circles as a young founder.",
    description: "At just 19, Cory Levy co-founded ONE, a social app for spontaneous meetups. Due to his age and lack of network, many investors dismissed him.",
    outcome: "He successfully raised funding, launched ONE, and later co-founded ZFellows, helping young entrepreneurs gain access to resources he once lacked.",
    author: "Cory Levy",
    date: "March 18, 2025",
    featured: false,
    size: "small",
    content: `
      <p>At just 19, Cory Levy co-founded ONE, a social app for spontaneous meetups. The concept was simple yet powerful: notify users when people with similar interests were nearby, facilitating real-world connections. Despite the app's promise, Levy faced significant challenges due to his youth and inexperience.</p>
      
      <p>Due to his age and lack of network, many investors dismissed him outright. Venture capital firms often prioritize founders with extensive industry experience or previous entrepreneurial success. As a teenager, Levy had neither. In pitch meetings, investors would question his ability to lead a company, manage a team, or navigate the complex business challenges ahead.</p>
      
      <p>"Why don't you finish college first?" was a common response. Others would suggest he join an established company to gain experience before attempting to build his own. Some investors didn't even take the meetings, assuming that a 19-year-old couldn't possibly have a viable business concept.</p>
      
      <p>Despite being surrounded by older, more experienced peers, Levy stayed persistent and leaned into his youth-driven vision. Rather than viewing his age as a liability, he positioned it as an asset. He understood his generation's social behaviors in ways that older entrepreneurs might not, giving him unique insights into how young people wanted to connect.</p>
      
      <p>Levy's persistence eventually paid off. He secured meetings with notable Silicon Valley figures like Keith Rabois and Peter Thiel, who recognized his determination and vision. With their support and mentorship, he was able to secure the funding needed to launch ONE.</p>
      
      <p>The experience of building ONE taught Levy invaluable lessons about entrepreneurship, technology development, and user acquisition. While the app itself faced the intense competition typical of social platforms, the journey provided Levy with the knowledge and connections that would fuel his future endeavors.</p>
      
      <p>Recognizing the systemic barriers young entrepreneurs face, Levy later co-founded ZFellows, a program designed specifically to help young founders turn their ideas into companies. The initiative provides funding, mentorship, and resources to young entrepreneurs, effectively helping them overcome the very obstacles Levy had faced.</p>
      
      <p>Through ZFellows, Levy has helped numerous young founders secure the resources they once lacked. The program has become a launchpad for innovative startups led by young entrepreneurs who might otherwise have been overlooked by traditional investors.</p>
      
      <p>His story inspired a wave of youth-focused funding programs and challenged the conventional wisdom about who can be a successful entrepreneur. Today, Levy continues to advocate for young founders, arguing that youth brings fresh perspectives and innovative approaches that are vital to the technology ecosystem.</p>
      
      <p>Levy's journey demonstrates that rejection based on preconceived notions—like age—can fuel a determination not only to succeed individually but to change the system itself, creating opportunities for others facing similar barriers.</p>
    `,
  },
];
export default function StoryPage({ params }: { params: { id: string } }) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract the ID from the URL path instead of accessing params directly
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const id = pathParts[pathParts.length - 1];
    
    // Use mock data directly instead of fetching from API
    const foundStory = featuredStories.find(s => String(s.id) === id);
    
    // If not found in featured stories, try to fetch from API
    if (!foundStory) {
      fetch(`/api/get_story?id=${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Story not found');
          }
          return response.json();
        })
        .then(data => {
          setStory(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching story:', error);
          setStory(null);
          setLoading(false);
        });
    } else {
      setStory(foundStory);
      setLoading(false);
    }
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
              {story.image_url ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image 
                    src={story.image_url}
                    alt={`Photo of ${story.author}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to AuthorAvatar if the image fails to load
                      e.currentTarget.style.display = 'none';
                      // This is a simple workaround - in a real app we'd want to update state
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div id="fallback-avatar"></div>`;
                        const fallback = document.getElementById('fallback-avatar');
                        if (fallback) {
                          const avatar = document.createElement('div');
                          fallback.appendChild(avatar);
                          // We'd render an AuthorAvatar here in a real implementation
                        }
                      }
                    }}
                  />
                </div>
              ) : (
                <AuthorAvatar name={story?.author} size="large" />
              )}
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