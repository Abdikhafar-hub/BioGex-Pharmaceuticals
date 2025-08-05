"use client"

import { useEffect, useState } from "react"
import { Users, Lightbulb, Target, Award, Building2, Globe, CheckCircle } from "lucide-react"

export default function AboutSection() {
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

    const element = document.getElementById("about")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openProductSheet = () => {
    window.open("https://docs.google.com/spreadsheets/d/1example", "_blank")
  }

  return (
    <section id="about" className="py-12 sm:py-20 bg-gradient-to-br from-green-100 via-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            About <span className="text-[#2e7d32]">BioGex Pharmaceuticals</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the future of pharmaceutical distribution with innovation, integrity, and unwavering commitment to
            healthcare excellence.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Who We <span className="text-[#2e7d32]">Are</span>
              </h3>
              <p className="text-sm sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                <span className="text-[#2e7d32] font-semibold">BioGex Pharmaceuticals</span> is a leading wholesale
                pharmaceutical distributor with over two decades of experience in connecting healthcare providers
                with premium medical products. We serve as the vital link between manufacturers and healthcare
                institutions worldwide, ensuring seamless access to life-saving medications.
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[#2e7d32] mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base text-gray-700">Global pharmaceutical distribution network</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[#2e7d32] mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base text-gray-700">Regulatory compliance expertise</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[#2e7d32] mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base text-gray-700">Quality assurance and control</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[#2e7d32] mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm sm:text-base text-gray-700">24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="relative max-w-[300px] mx-auto lg:max-w-none lg:mx-0">
              <img
                src="/biogexx.png"
                alt="BioGex Pharmaceuticals"
                className="rounded-lg sm:rounded-2xl shadow-xl w-full h-64 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-lg sm:rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-12 sm:mt-20 grid md:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          <div className="text-center p-6 sm:p-8 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-[#2e7d32] text-white p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4">
              <Users size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Our Mission</h4>
            <p className="text-sm sm:text-base text-gray-600">
              To provide exceptional pharmaceutical wholesale services through innovative supply chain solutions and regulatory expertise.
            </p>
          </div>

          <div className="text-center p-6 sm:p-8 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-[#2e7d32] text-white p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4">
              <Lightbulb size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Our Vision</h4>
            <p className="text-sm sm:text-base text-gray-600">
              To be the global leader in pharmaceutical distribution, ensuring life-saving medications reach every corner of the world.
            </p>
          </div>

          <div className="text-center p-6 sm:p-8 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-[#2e7d32] text-white p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4">
              <Award size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Our Values</h4>
            <p className="text-sm sm:text-base text-gray-600">
              Integrity, innovation, and unwavering commitment to healthcare excellence and regulatory compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
