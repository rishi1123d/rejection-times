import Link from "next/link"
import { cn } from "@/lib/utils"
import { formatdate } from "@/lib/utils"
interface Story {
  id: string
  quote: string
  description: string
  outcome: string
  author: string
  date: string
  featured?: boolean
  size?: "small" | "medium" | "large"
}

interface StoryCardProps {
  story: Story
  horizontal?: boolean
  variant?: "default" | "compact" | "featured"
}

export default function StoryCard({ story, horizontal = false, variant = "default" }: StoryCardProps) {
  if (variant === "featured") {
    return (
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 aspect-[4/3] flex items-center justify-center">
            <div className="text-4xl">📝</div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500 mb-2">{formatdate(story?.date)}</p>
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight hover:underline">
              <Link href={`/story/${story?.id}`}>{story?.quote}</Link>
            </h3>
            <p className="text-lg text-gray-700 mb-4">{story?.description}</p>
            <p className="text-green-700 font-medium text-lg">{story?.outcome}</p>
            <p className="text-sm text-gray-500 mt-4">By {story?.author}</p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <p className="text-sm text-gray-500 mb-1">{formatdate(story?.date)}</p>
        <h3 className="font-serif text-lg font-bold mb-2 leading-tight hover:underline">
          <Link href={`/story/${story?.id}`}>{story?.quote}</Link>
        </h3>
        <p className="text-sm text-gray-700">{story?.description}</p>
      </div>
    )
  }

  return (
    <div
      className={cn("border-b border-gray-200 pb-6 group", horizontal ? "flex flex-col md:flex-row" : "flex flex-col")}
    >
      <div className={cn("py-4", horizontal && "md:w-2/3")}>
        <div className="mb-3">
          <p className="text-sm text-gray-500">{formatdate(story?.date)}</p>
          <h3 className="font-serif text-xl md:text-2xl font-bold mt-1 group-hover:underline leading-tight">
            <Link href={`/story/${story?.id}`} className="block">
              {story?.quote}
            </Link>
          </h3>
        </div>
        <p className="text-gray-700 mb-3">{story?.description}</p>
        <p className="text-green-700 font-medium">{story?.outcome}</p>
        <p className="text-sm text-gray-500 mt-3">By {story?.author}</p>
      </div>
    </div>
  )
}

