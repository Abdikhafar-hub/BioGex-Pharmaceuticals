"use client"

import { useEffect, useState } from "react"
import { Award, Trophy, Medal, Star } from "lucide-react"

const awards = [
  {
    icon: Trophy,
    title: "Excellence in Pharmaceutical Distribution",
    year: "2023",
    organization: "International Pharma Association",
    description: "Recognized for outstanding service quality and innovation",
  },
  {
    icon: Medal,
    title: "Best Supply Chain Management",
    year: "2022",
    organization: "Healthcare Logistics Awards",
    description: "Leading pharmaceutical supply chain optimization",
  },
  {
    icon: Star,
    title: "Quality Assurance Excellence",
    year: "2023",
    organization: "Global Health Standards",
    description: "Maintaining highest quality standards in distribution",
  },
  {
    icon: Award,
    title: "Customer Service Excellence",
    year: "2022",
    organization: "Healthcare Business Awards",
    description: "Outstanding customer satisfaction and support",
  },
]

export default function AwardsSection() {
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

    const element = document.getElementById("awards")
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
    <section id="awards" className="py-12 sm:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Awards & <span className="text-[#2e7d32]">Recognition</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence has been recognized through various industry awards and certifications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className={`bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 100}
            >
              <div className="text-[#2e7d32] mb-3 sm:mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                <award.icon size={32} className="sm:w-12 sm:h-12 lg:w-16 lg:h-16 group-hover:drop-shadow-lg" />
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2e7d32] mb-1 sm:mb-2">{award.year}</div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">{award.title}</h3>
              <p className="text-xs sm:text-sm text-[#2e7d32] font-medium mb-2 sm:mb-3">{award.organization}</p>
              <p className="text-xs sm:text-sm text-gray-600">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
