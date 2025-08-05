"use client"

import { useEffect, useState } from "react"

const partners = [
  { name: "Global Pharma Corp", logo: "/sanofi.png" },
  { name: "MediCare Solutions", logo: "/gsk.png" },
  { name: "BioTech Industries", logo: "/bayerlogo.png" },
  { name: "HealthFirst Alliance", logo: "/astrz.png" },
  { name: "PharmaTech Global", logo: "/Pfizer.png" },
  { name: "Medical Innovations", logo: "/GSK-logo.png" },
]

export default function PartnersSection() {
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

    const element = document.getElementById("partners")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="partners" className="py-8 sm:py-20 bg-gradient-to-t from-green-100 via-white to-white">
      <div className="max-w-screen-sm sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-[#2e7d32]">Partners</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by leading pharmaceutical companies and healthcare organizations worldwide.
          </p>
        </div>

        {/* Scrolling Partners */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll-left space-x-4 sm:space-x-12 pb-4 sm:pb-0">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-gray-50 p-3 sm:p-6 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-w-[80px] sm:min-w-0"
              >
                <img
                  src={partner.logo || "/logocrop.png"}
                  alt={partner.name}
                  className="h-8 sm:h-12 w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Partner Stats */}
        <div
          className={`mt-8 sm:mt-16 grid grid-cols-3 md:grid-cols-3 gap-4 sm:gap-8 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center">
            <div className="text-xl sm:text-4xl font-bold text-[#2e7d32] mb-1 sm:mb-2">98%</div>
            <div className="text-sm sm:text-base text-gray-600">Partner Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-4xl font-bold text-[#2e7d32] mb-1 sm:mb-2">24/7</div>
            <div className="text-sm sm:text-base text-gray-600">Partner Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-4xl font-bold text-[#2e7d32] mb-1 sm:mb-2">15+</div>
            <div className="text-sm sm:text-base text-gray-600">Years Average Partnership</div>
          </div>
        </div>
      </div>
    </section>
  )
}
