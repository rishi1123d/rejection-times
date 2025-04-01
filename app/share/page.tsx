import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ShareStory() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-700 hover:text-black flex items-center gap-1 mb-4 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Share Your Story</h1>
        <p className="text-xl text-gray-700 mb-8">Tell us about a rejection that ultimately led to success</p>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Your Name
            </label>
            <Input
              id="name"
              placeholder="Jane Smith"
              className="rounded-none border-gray-300 focus:border-black focus:ring-black"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              className="rounded-none border-gray-300 focus:border-black focus:ring-black"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="rejection-quote" className="block text-sm font-medium text-gray-900">
              The Rejection (Quote or Summary)
            </label>
            <Textarea
              id="rejection-quote"
              placeholder="What was the rejection you received?"
              className="rounded-none border-gray-300 focus:border-black focus:ring-black"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="story" className="block text-sm font-medium text-gray-900">
              Your Story
            </label>
            <Textarea
              id="story"
              placeholder="Tell us about the rejection and what happened afterward..."
              className="rounded-none border-gray-300 focus:border-black focus:ring-black"
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="outcome" className="block text-sm font-medium text-gray-900">
              The Outcome
            </label>
            <Textarea
              id="outcome"
              placeholder="How did things turn out? What success came from this rejection?"
              className="rounded-none border-gray-300 focus:border-black focus:ring-black"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white rounded-none">
            Submit Your Story
          </Button>
        </form>
      </div>
    </div>
  )
}

