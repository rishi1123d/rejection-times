import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-700 hover:text-black flex items-center gap-1 mb-4 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">About The Rejection Times</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl font-serif leading-relaxed">
            The Rejection Times was founded on a simple premise: behind every success story lies a trail of rejections,
            setbacks, and failures that are rarely discussed but often instrumental to ultimate achievement.
          </p>

          <p>
            Our mission is to celebrate these moments of rejection and illuminate the path from disappointment to
            triumph. By sharing these stories, we hope to change the narrative around failure and inspire others to
            persevere through their own challenges.
          </p>

          <h2 className="font-serif text-2xl font-bold mt-8 mb-4">Our Philosophy</h2>

          <p>
            We believe that rejection is not the end of a journey, but often the beginning of a more meaningful one. The
            stories featured in The Rejection Times demonstrate that setbacks can be catalysts for growth, innovation,
            and unexpected opportunities.
          </p>

          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
            <footer className="text-gray-600 mt-2">— Winston Churchill</footer>
          </blockquote>

          <h2 className="font-serif text-2xl font-bold mt-8 mb-4">Share Your Story</h2>

          <p>
            Have you experienced a rejection that ultimately led to success? We invite you to share your story with our
            community. Your experience could inspire someone else facing similar challenges.
          </p>

          <div className="my-8">
            <Link href="/share" className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 inline-block">
              Submit Your Story
            </Link>
          </div>

          <h2 className="font-serif text-2xl font-bold mt-8 mb-4">Contact Us</h2>

          <p>
            For inquiries, feedback, or partnership opportunities, please contact us at:
            <br />
            <a href="mailto:editor@rejectiontimes.com" className="text-gray-900 underline">
              editor@rejectiontimes.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

