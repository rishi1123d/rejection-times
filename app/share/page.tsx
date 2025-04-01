'use client'
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ShareStory() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quote, setquote] = useState('');
  const [description, setDescription] = useState('');
  const [outcome, setOutcome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status
  const [submitStatus, setSubmitStatus] = useState(null); // State for success/error message

  // --- Handle Form Submission ---
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default browser form submission
    setIsSubmitting(true); // Indicate submission is in progress
    setSubmitStatus(null); // Reset previous status messages

    // Construct the data payload from state
    const formData = {
      author: name,
      email,
      quote,
      description,
      outcome,
      date: new Date().toISOString(), // Current date in ISO format
    };


    try {
      const response = await fetch('/api/post_story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      


      if (!response.ok) {
        
        const errorData = await response.json(); 
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Handle successful submission
      const result = await response.json(); 
      console.log('Submission successful:', result);
      setSubmitStatus({ type: 'success', message: 'Your story has been submitted successfully!' });

      // Optionally, clear the form fields after successful submission
      setName('');
      setEmail('');
      setquote('');
      setDescription('');
      setOutcome('');

    } catch (error) {
      // Handle errors during fetch or submission
      console.error('Submission failed:', error);
      setSubmitStatus({ type: 'error', message: `Submission failed: ${error.message}` });
    } finally {
      // Reset submission status regardless of success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-700 hover:text-black flex items-center gap-1 mb-4 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Share Your Story</h1>
        <p className="text-xl text-gray-700 mb-8">Tell us about a rejection that ultimately led to success</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Your Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className="rounded-none border-gray-300 focus:border-black focus:ring-black"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}

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
              value={quote}
              onChange={(e) => setquote(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              id="outcome"
              placeholder="How did things turn out? What success came from this rejection?"
              className="rounded-none border-gray-300 focus:border-black focus:ring-black"
              rows={3}
            />
          </div>
 {/* Submission Status Messages */}
 {submitStatus && (
            <div className={`p-3 rounded-md text-sm ${
              submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {submitStatus.message}
            </div>
 )}
          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white rounded-none">

          {isSubmitting ? 'Submitting...' : 'Submit Your Story'}
          </Button>
        </form>
      </div>
    </div>
  )
}

