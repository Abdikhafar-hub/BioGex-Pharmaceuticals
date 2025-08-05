"use client"

import { useEffect, useState } from "react"
import { Award, Package, Globe, Users } from "lucide-react"

const stats = [
  {
    icon: Award,
    number: 20,
    suffix: "+",
    label: "Years of Experience",
    description: "Decades of pharmaceutical excellence",
    bgColor: "bg-green-100",
    iconColor: "text-green-700",
    accentColor: "text-green-600",
  },
  {
    icon: Package,
    number: 1000,
    suffix: "+",
    label: "Products Distributed",
    description: "Comprehensive pharmaceutical portfolio",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-700",
    accentColor: "text-blue-600",
  },
  {
    icon: Globe,
    number: 10,
    suffix: "+",
    label: "Countries Served",
    description: "Global healthcare reach",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-700",
    accentColor: "text-purple-600",
  },
  {
    icon: Users,
    number: 500,
    suffix: "+",
    label: "Healthcare Partners",
    description: "Trusted relationships worldwide",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-700",
    accentColor: "text-orange-600",
  },
]

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateNumbers()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const animateNumbers = () => {
    stats.forEach((stat, index) => {
      let current = 0
      const increment = stat.number / 60 // Smooth 60-step animation
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.number) {
          current = stat.number
          clearInterval(timer)
        }
        setAnimatedNumbers((prev) => {
          const newNumbers = [...prev]
          newNumbers[index] = Math.floor(current)
          return newNumbers
        })
      }, 25) // Fast interval for smooth animation
    })
  }

  return (
    <section id="stats" className="py-8 sm:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-[#2e7d32]">Impact</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Numbers that reflect our commitment to excellence in pharmaceutical distribution and healthcare support.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group bg-white/60 backdrop-blur-md rounded-lg sm:rounded-2xl shadow-md p-3 sm:p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-center h-full flex flex-col justify-center border border-white/40 w-full max-w-[340px] mx-auto ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 100}
            >
              {/* Icon with colored background */}
              <div className="flex items-center justify-center mb-3 sm:mb-6">
                <div
                  className={`${stat.bgColor} ${stat.iconColor} p-2 sm:p-4 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  style={{
                    boxShadow: `0 4px 20px ${
                      stat.iconColor.includes("green")
                        ? "rgba(34, 197, 94, 0.2)"
                        : stat.iconColor.includes("blue")
                          ? "rgba(59, 130, 246, 0.2)"
                          : stat.iconColor.includes("purple")
                            ? "rgba(147, 51, 234, 0.2)"
                            : "rgba(249, 115, 22, 0.2)"
                    }`,
                  }}
                >
                  <stat.icon size={20} className="sm:w-8 sm:h-8 group-hover:drop-shadow-lg" />
                </div>
              </div>

              {/* Animated Number */}
              <div className="mb-2 sm:mb-4">
                <div
                  className={`text-2xl sm:text-5xl font-bold ${stat.accentColor} mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300`}
                  style={{
                    textShadow: `0 0 20px ${
                      stat.accentColor.includes("green")
                        ? "rgba(34, 197, 94, 0.3)"
                        : stat.accentColor.includes("blue")
                          ? "rgba(59, 130, 246, 0.3)"
                          : stat.accentColor.includes("purple")
                            ? "rgba(147, 51, 234, 0.3)"
                            : "rgba(249, 115, 22, 0.3)"
                    }`,
                  }}
                >
                  {animatedNumbers[index]}
                  {stat.suffix}
                </div>
              </div>

              {/* Label */}
              <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-[#2e7d32] transition-colors duration-300">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                {stat.description}
              </p>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-lg sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${
                    stat.accentColor.includes("green")
                      ? "rgba(34, 197, 94, 0.1)"
                      : stat.accentColor.includes("blue")
                        ? "rgba(59, 130, 246, 0.1)"
                        : stat.accentColor.includes("purple")
                          ? "rgba(147, 51, 234, 0.1)"
                          : "rgba(249, 115, 22, 0.1)"
                  } 0%, transparent 70%)`,
                }}
              />

              {/* Animated border on hover */}
              <div
                className="absolute inset-0 rounded-lg sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, ${
                    stat.accentColor.includes("green")
                      ? "rgba(34, 197, 94, 0.2)"
                      : stat.accentColor.includes("blue")
                        ? "rgba(59, 130, 246, 0.2)"
                        : stat.accentColor.includes("purple")
                          ? "rgba(147, 51, 234, 0.2)"
                          : "rgba(249, 115, 22, 0.2)"
                  }, transparent, ${
                    stat.accentColor.includes("green")
                      ? "rgba(34, 197, 94, 0.2)"
                      : stat.accentColor.includes("blue")
                        ? "rgba(59, 130, 246, 0.2)"
                        : stat.accentColor.includes("purple")
                          ? "rgba(147, 51, 234, 0.2)"
                          : "rgba(249, 115, 22, 0.2)"
                  })`,
                  padding: "1px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                }}
              />
            </div>
          ))}
        </div>

        {/* Main Banner */}
        <div
          className={`mt-8 sm:mt-16 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-lg sm:rounded-3xl p-4 sm:p-8 text-white text-center shadow-2xl transition-all duration-1000 delay-800 overflow-hidden relative ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="600"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('/world.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          
          {/* Content */}
          <div className="relative z-20 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Driving Healthcare Excellence Across Africa</h3>
            <p className="text-green-100 text-sm sm:text-lg mb-4 sm:mb-6">
              Our commitment to quality and innovation has made us a trusted partner in pharmaceutical distribution
              across the globe.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-300 rounded-full animate-pulse" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-300 rounded-full animate-pulse" />
                <span>GMP Compliant</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-300 rounded-full animate-pulse" />
                <span>FDA Approved</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-300 rounded-full animate-pulse" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
