"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        setError(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-12 sm:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white relative" data-aos="fade-up" data-aos-duration="800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-16" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Get in <span className="text-[#2e7d32]">Touch</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to partner with us? Contact our team for personalized pharmaceutical solutions and expert guidance.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8" data-aos="fade-right" data-aos-duration="800" data-aos-delay="200">
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Contact Information</h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-[#2e7d32] p-2 sm:p-3 rounded-full flex-shrink-0">
                  <MapPin className="text-white sm:w-6 sm:h-6" size={16} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-lg font-semibold text-gray-900">Address</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Godown 8, Roy Business Park
                    <br />
                    Baba Dogo Road, Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-[#2e7d32] p-2 sm:p-3 rounded-full flex-shrink-0">
                  <Phone className="text-white sm:w-6 sm:h-6" size={16} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-lg font-semibold text-gray-900">Phone</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    +254 748 210210
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-[#2e7d32] p-2 sm:p-3 rounded-full flex-shrink-0">
                  <Mail className="text-white sm:w-6 sm:h-6" size={16} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-lg font-semibold text-gray-900">Email</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    info@biogexpharma.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-[#2e7d32] p-2 sm:p-3 rounded-full flex-shrink-0">
                  <Clock className="text-white sm:w-6 sm:h-6" size={16} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-lg font-semibold text-gray-900">Business Hours</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Monday - Friday: 8:00 AM - 6:00 PM
                    <br />
                    Saturday: 9:00 AM - 2:00 PM
                    <br />
                    24/7 Emergency Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/30" data-aos="fade-left" data-aos-duration="800" data-aos-delay="300">
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Send us a Message</h3>

            {isSubmitted ? (
              <div className="text-center py-8 sm:py-12">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                  <CheckCircle className="text-green-600 mx-auto mb-4 sm:w-16 sm:h-16" size={48} />
                  <h4 className="text-lg sm:text-2xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h4>
                  <p className="text-sm sm:text-base text-green-700">
                    Thank you for contacting us. We've sent you a confirmation email and will get back to you within 24-48 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <AlertCircle className="text-red-600 mr-2" size={20} />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                    placeholder="Tell us about your pharmaceutical needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2e7d32] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-lg font-semibold hover:bg-[#1b5e20] transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="sm:w-5 sm:h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Full-width Map */}
        <div className="relative z-0" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d36.8894134!3d-1.2410655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1587933d4403%3A0x845c3be514cb9d4e!2sRoy%20Business%20Park!5e0!3m2!1sen!2ske!4v1722244080305!5m2!1sen!2ske"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
