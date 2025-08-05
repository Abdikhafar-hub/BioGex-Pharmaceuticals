"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Package, Shield, FlaskRoundIcon as Flask, Target, Award, Building2, Globe } from "lucide-react"

const products = [
  {
    icon: Package,
    title: "Generic Medications",
    description: "High-quality generic pharmaceuticals across all therapeutic categories with proven efficacy",
    count: 500,
    suffix: "+",
    bgColor: "bg-green-100",
    iconColor: "text-green-700",
    accentColor: "text-green-600",
  },
  {
    icon: Shield,
    title: "Branded Products",
    description: "Premium branded medications from leading pharmaceutical manufacturers worldwide",
    count: 300,
    suffix: "+",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-700",
    accentColor: "text-blue-600",
  },
  {
    icon: Flask,
    title: "Specialty Drugs",
    description: "Specialized medications for rare diseases and complex medical conditions",
    count: 200,
    suffix: "+",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-700",
    accentColor: "text-purple-600",
  },
]

export default function ProductsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedCounts, setAnimatedCounts] = useState(products.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateCounts()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("products")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const animateCounts = () => {
    products.forEach((product, index) => {
      let current = 0
      const increment = product.count / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= product.count) {
          current = product.count
          clearInterval(timer)
        }
        setAnimatedCounts((prev) => {
          const newCounts = [...prev]
          newCounts[index] = Math.floor(current)
          return newCounts
        })
      }, 40)
    })
  }

  const openProductSheet = () => {
    window.open("https://docs.google.com/spreadsheets/d/1example", "_blank")
  }

  return (
    <section id="products" className="py-12 sm:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-[#2e7d32]">Product Portfolio</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive range of pharmaceutical products sourced from leading manufacturers worldwide,
            ensuring quality, reliability, and regulatory compliance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-10 mb-8 sm:mb-12">
          {products.map((product, index) => (
            <div
              key={index}
              className={`group bg-white/60 backdrop-blur-md shadow-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 hover:scale-105 hover:shadow-xl transition-all duration-500 border border-white/20 max-w-xs mx-auto w-full ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 100}
            >
              {/* Icon */}
              <div
                className={`${product.bgColor} ${product.iconColor} p-3 sm:p-4 rounded-full w-fit mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}
              >
                <product.icon size={24} className="sm:w-8 sm:h-8 group-hover:drop-shadow-lg" />
              </div>

              {/* Animated Count */}
              <div className="mb-3 sm:mb-4">
                <div
                  className={`text-3xl sm:text-5xl font-bold ${product.accentColor} mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300`}
                  style={{
                    textShadow: "0 0 20px rgba(46, 125, 50, 0.3)",
                    animation: isVisible ? "pulse 2s infinite" : "none",
                  }}
                >
                  {animatedCounts[index]}
                  {product.suffix}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-2 sm:mb-3 group-hover:text-[#2e7d32] transition-colors duration-300">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div
          className={`relative bg-gradient-to-r from-[#2e7d32] to-[#4caf50] rounded-lg sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl transition-all duration-1000 delay-600 overflow-hidden ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 max-h-[240px] sm:max-h-none"
            style={{
              backgroundImage: `url('/pexels-pixabay-208512.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          
          {/* Content */}
          <div className="relative z-20 max-w-4xl mx-auto text-center">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#2e7d32] bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg inline-block">Complete Product Catalog</h3>
            <p className="text-sm sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
              Access our comprehensive product database with detailed specifications, pricing, and availability
              information. Updated in real-time for your convenience.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <button
                onClick={openProductSheet}
                className="bg-white text-[#2e7d32] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl"
              >
                <ExternalLink size={20} className="sm:w-6 sm:h-6" />
                View Full Product List
              </button>

              {/* Info Badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                <div className="flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-300 rounded-full animate-pulse" />
                  <span className="text-xs text-white/90 font-medium">Live inventory</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-300 rounded-full animate-pulse" />
                  <span className="text-xs text-white/90 font-medium">Real-time updates</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-300 rounded-full animate-pulse" />
                  <span className="text-xs text-white/90 font-medium">Detailed specs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div
          className={`mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { label: "Therapeutic Areas", value: "25+", icon: Target, color: "bg-green-100 text-green-700" },
            { label: "Regulatory Approvals", value: "100%", icon: Shield, color: "bg-blue-100 text-blue-700" },
            { label: "Quality Certifications", value: "15+", icon: Award, color: "bg-purple-100 text-purple-700" },
            { label: "Global Suppliers", value: "50+", icon: Globe, color: "bg-orange-100 text-orange-700" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center border border-white/30"
            >
              <div className={`${stat.color} p-1.5 sm:p-2 rounded-full w-fit mx-auto mb-1.5 sm:mb-2`}>
                <stat.icon size={16} className="sm:w-4 sm:h-4" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stat.value}</div>
              <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
