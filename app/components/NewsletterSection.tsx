"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, CheckCircle, Send, AlertCircle } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("newsletter")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        setEmail("")
        
        // Reset success message after 6 seconds
        setTimeout(() => {
          setIsSubscribed(false)
        }, 6000)
      } else {
        setError(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="newsletter"
      className="py-6 sm:py-14 px-3 sm:px-6 bg-gradient-to-br from-green-600/90 to-green-700/90 relative overflow-hidden"
      style={{
        backgroundImage: `url('/news.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      {/* Background overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {isSubscribed ? (
          <div
            className={`text-white transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="mb-3 sm:mb-6">
              <CheckCircle className="mx-auto mb-2 sm:mb-4 animate-bounce sm:w-16 sm:h-16" size={40} />
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2 sm:mb-4">Thank You for Subscribing!</h2>
            <p className="text-xs sm:text-sm lg:text-base text-white/90 max-w-2xl mx-auto">
              You've been successfully subscribed to our newsletter! We've sent you a welcome email with details about what you'll receive.
            </p>
            <div className="mt-3 sm:mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4 max-w-md mx-auto">
              <p className="text-xs sm:text-sm text-white/80">
                Check your inbox for your welcome email from BioGex Pharmaceuticals.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Animated Mail Icon */}
            <div
              className={`mb-3 sm:mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-4 rounded-full w-fit mx-auto mb-2 sm:mb-4 animate-pulse">
                <Mail className="text-white sm:w-12 sm:h-12" size={28} />
              </div>
            </div>

            {/* Title and Subtitle */}
            <div
              className={`mb-4 sm:mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-1 sm:mb-2">
                Stay Updated with Industry Insights
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-white/80 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest pharmaceutical distribution trends, regulatory updates, and
                company news delivered directly to your inbox.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-3 sm:mb-6 bg-red-500/20 backdrop-blur-sm border border-red-300/30 rounded-lg p-2 sm:p-4 max-w-md mx-auto" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
                <div className="flex items-center justify-center">
                  <AlertCircle className="text-red-300 mr-2 sm:w-5 sm:h-5" size={14} />
                  <p className="text-xs sm:text-sm text-red-100">{error}</p>
                </div>
              </div>
            )}

            {/* Subscription Form */}
            <form
              onSubmit={handleSubmit}
              className={`max-w-md mx-auto transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <div className="flex flex-col gap-2 sm:gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-3 sm:px-6 py-2 sm:py-4 rounded-full text-xs sm:text-base text-gray-900 placeholder-gray-500 bg-white/95 backdrop-blur-sm border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 shadow-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-green-700 font-medium px-3 sm:px-6 py-2 sm:py-4 rounded-full hover:bg-green-100 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-1 sm:gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-2.5 w-2.5 sm:h-4 sm:w-4 border-b-2 border-green-700" />
                      <span className="text-xs sm:text-sm">Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={12} className="sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Privacy Notice */}
            <p
              className={`text-white/70 text-xs mt-3 sm:mt-6 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100" : "opacity-0"}`}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="500"
            >
              We respect your privacy. Unsubscribe at any time. No spam, just valuable insights.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
