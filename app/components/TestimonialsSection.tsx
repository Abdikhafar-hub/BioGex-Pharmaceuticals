"use client"

import { useEffect, useState } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Pharmacist, Metro Hospital",
    image: "/logocrop.png",
    quote:
      "BioGex has been our trusted pharmaceutical partner for over 8 years. Their reliability and quality assurance are unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Supply Chain Director, HealthCare Plus",
    image: "/logocrop.png",
    quote:
      "The efficiency of their distribution network and their commitment to regulatory compliance makes BioGex our preferred pharmaceutical wholesaler.",
    rating: 5,
  },
  {
    name: "Dr. Maria Rodriguez",
    role: "Hospital Administrator, Regional Medical Center",
    image: "/logocrop.png",
    quote:
      "Their 24/7 customer support and emergency delivery services have been crucial for our hospital operations. Highly recommended!",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Pharmacy Chain Owner",
    image: "/logocrop.png",
    quote:
      "BioGex provides competitive pricing without compromising on quality. Their product range covers all our pharmaceutical needs.",
    rating: 5,
  },
  {
    name: "Dr. Emily Thompson",
    role: "Clinical Director, Community Health",
    image: "/logocrop.png",
    quote:
      "The quality of their products and their commitment to healthcare excellence has made them our go-to pharmaceutical partner.",
    rating: 5,
  },
  {
    name: "Robert Martinez",
    role: "Procurement Manager, Regional Pharmacy",
    image: "/logocrop.png",
    quote:
      "BioGex's customer service and delivery reliability have exceeded our expectations. They truly understand our needs.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("testimonials")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-8 sm:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Our <span className="text-[#2e7d32]">Clients Say</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from healthcare professionals who trust BioGex for their pharmaceutical needs.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Wrapper */}
          <div className="w-full px-2 sm:px-8">
            <div className="relative w-full max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="w-full"
                >
                  <div className="p-4 sm:p-8 max-w-md mx-auto bg-white rounded-2xl shadow-md text-center">
                    <Quote className="text-[#2e7d32] mx-auto mb-4 sm:mb-6 sm:w-8 sm:h-8" size={24} />
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic mb-4 sm:mb-6">
                      "{testimonials[currentIndex].quote}"
                    </p>
                    <div className="flex justify-center mb-4 sm:mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-current sm:w-5 sm:h-5" size={16} />
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <img
                        src={testimonials[currentIndex].image || "/logocrop.png"}
                        alt={testimonials[currentIndex].name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <h4 className="text-xl sm:text-2xl font-semibold text-center text-gray-900">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#2e7d32] font-medium">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="w-8 h-8 p-2 sm:w-10 sm:h-10 absolute top-1/2 -translate-y-1/2 bg-white shadow rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110 left-0 sm:left-4 z-10"
          >
            <ChevronLeft size={16} className="sm:w-6 sm:h-6 text-[#2e7d32]" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 p-2 sm:w-10 sm:h-10 absolute top-1/2 -translate-y-1/2 bg-white shadow rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110 right-0 sm:right-4 z-10"
          >
            <ChevronRight size={16} className="sm:w-6 sm:h-6 text-[#2e7d32]" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 sm:h-3 sm:w-3 mx-1 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentIndex 
                    ? "bg-[#2e7d32] scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
