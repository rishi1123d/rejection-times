'use client'
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, FormEvent } from "react"

// Define word limits for each field
const WORD_LIMITS = {
  quote: 10, // ~1-2 sentences for the quote
  description: 50, // Brief description
  outcome: 30, // Short outcome statement
};

// Define status type
interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}

// Helper function to count words
const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export default function ShareStory() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quote, setQuote] = useState('');
  const [description, setDescription] = useState('');
  const [outcome, setOutcome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  
  // Add validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    quote: '',
    description: '',
    outcome: ''
  });

  // Word count trackers
  const quoteWordCount = countWords(quote);
  const descriptionWordCount = countWords(description);
  const outcomeWordCount = countWords(outcome);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      quote: '',
      description: '',
      outcome: ''
    };
    
    let isValid = true;

    // Check for empty fields
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is not valid';
      isValid = false;
    }

    if (!quote.trim()) {
      newErrors.quote = 'Rejection quote/summary is required';
      isValid = false;
    } else if (quoteWordCount > WORD_LIMITS.quote) {
      newErrors.quote = `Please keep your quote under ${WORD_LIMITS.quote} words (currently ${quoteWordCount})`;
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Story description is required';
      isValid = false;
    } else if (descriptionWordCount > WORD_LIMITS.description) {
      newErrors.description = `Please keep your story under ${WORD_LIMITS.description} words (currently ${descriptionWordCount})`;
      isValid = false;
    }

    if (!outcome.trim()) {
      newErrors.outcome = 'Outcome is required';
      isValid = false;
    } else if (outcomeWordCount > WORD_LIMITS.outcome) {
      newErrors.outcome = `Please keep your outcome under ${WORD_LIMITS.outcome} words (currently ${outcomeWordCount})`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // --- Handle Form Submission ---
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      window.scrollTo(0, 0); // Scroll to top to show errors
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Construct the data payload from state
    const formData = {
      author: name,
      email,
      quote,
      description,
      outcome,
      date: new Date().toISOString(),
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

      // Clear the form fields after successful submission
      setName('');
      setEmail('');
      setQuote('');
      setDescription('');
      setOutcome('');

    } catch (error) {
      // Handle errors during fetch or submission
      console.error('Submission failed:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: `Submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
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

        {/* Display any submission error at the top */}
        {submitStatus && submitStatus.type === 'error' && (
          <div className="p-3 mb-4 rounded-md text-sm bg-red-100 text-red-800">
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Your Name <span className="text-red-600">*</span>
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className={`rounded-none border-gray-300 focus:border-black focus:ring-black ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address <span className="text-red-600">*</span>
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="jane@example.com"
              className={`rounded-none border-gray-300 focus:border-black focus:ring-black ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="rejection-quote" className="block text-sm font-medium text-gray-900">
              The Rejection (Quote or Summary) <span className="text-red-600">*</span>
            </label>
            <Textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              id="rejection-quote"
              placeholder="What was the rejection you received?"
              className={`rounded-none border-gray-300 focus:border-black focus:ring-black ${errors.quote ? 'border-red-500' : ''}`}
              rows={3}
            />
            <div className="flex justify-between text-xs">
              {errors.quote && <p className="text-red-600">{errors.quote}</p>}
              <p className={`${quoteWordCount > WORD_LIMITS.quote ? 'text-red-600' : 'text-gray-500'}`}>
                {quoteWordCount}/{WORD_LIMITS.quote} words
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="story" className="block text-sm font-medium text-gray-900">
              Your Story <span className="text-red-600">*</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="story"
              placeholder="Tell us about the rejection and what happened afterward..."
              className={`rounded-none border-gray-300 focus:border-black focus:ring-black ${errors.description ? 'border-red-500' : ''}`}
              rows={6}
            />
            <div className="flex justify-between text-xs">
              {errors.description && <p className="text-red-600">{errors.description}</p>}
              <p className={`${descriptionWordCount > WORD_LIMITS.description ? 'text-red-600' : 'text-gray-500'}`}>
                {descriptionWordCount}/{WORD_LIMITS.description} words
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="outcome" className="block text-sm font-medium text-gray-900">
              The Outcome <span className="text-red-600">*</span>
            </label>
            <Textarea
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              id="outcome"
              placeholder="How did things turn out? What success came from this rejection?"
              className={`rounded-none border-gray-300 focus:border-black focus:ring-black ${errors.outcome ? 'border-red-500' : ''}`}
              rows={3}
            />
            <div className="flex justify-between text-xs">
              {errors.outcome && <p className="text-red-600">{errors.outcome}</p>}
              <p className={`${outcomeWordCount > WORD_LIMITS.outcome ? 'text-red-600' : 'text-gray-500'}`}>
                {outcomeWordCount}/{WORD_LIMITS.outcome} words
              </p>
            </div>
          </div>
 
          {/* Success message */}
          {submitStatus && submitStatus.type === 'success' && (
            <div className="p-3 rounded-md text-sm bg-green-100 text-green-800">
              {submitStatus.message}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-gray-800 text-white rounded-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Your Story'}
          </Button>
        </form>
      </div>
    </div>
  )
}

