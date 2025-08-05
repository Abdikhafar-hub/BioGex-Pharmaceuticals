"use client"

import { useEffect, useState } from "react"
import { Truck, Shield, Globe, HeadphonesIcon, FileText, Clock } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Wholesale Distribution",
    description: "Comprehensive pharmaceutical distribution services with global reach and local expertise.",
    features: ["Cold chain management", "Express delivery", "Bulk orders"],
    bgColor: "bg-blue-100",
    iconColor: "text-blue-700",
    hoverColor: "hover:bg-blue-50",
    image: "/wholesale.png",
  },
  {
    icon: Shield,
    title: "Regulatory Support",
    description: "Expert guidance on pharmaceutical regulations and compliance across multiple jurisdictions.",
    features: ["Documentation support", "Compliance audits", "Regulatory consulting"],
    bgColor: "bg-green-100",
    iconColor: "text-green-700",
    hoverColor: "hover:bg-green-50",
    image: "/regulatory.png",
  },
  {
    icon: Globe,
    title: "International Logistics",
    description: "Seamless cross-border pharmaceutical logistics with customs clearance expertise.",
    features: ["Export documentation", "Customs clearance", "International shipping"],
    bgColor: "bg-purple-100",
    iconColor: "text-purple-700",
    hoverColor: "hover:bg-purple-50",
    image: "/international.png",
  },
  
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    description: "Round-the-clock customer service to ensure your pharmaceutical supply needs are met.",
    features: ["Emergency orders", "Technical support", "Account management"],
    bgColor: "bg-orange-100",
    iconColor: "text-orange-700",
    hoverColor: "hover:bg-orange-50",
    image: "/customer.png",
  },
  {
    icon: FileText,
    title: "Quality Assurance",
    description: "Rigorous quality control processes ensuring pharmaceutical integrity and safety.",
    features: ["Batch tracking", "Quality certificates", "Temperature monitoring"],
    bgColor: "bg-red-100",
    iconColor: "text-red-700",
    hoverColor: "hover:bg-red-50",
    image: "/quality.png",
  },
  {
    icon: Clock,
    title: "Just-in-Time Delivery",
    description: "Optimized inventory management and delivery scheduling to minimize your holding costs.",
    features: ["Inventory optimization", "Scheduled deliveries", "Emergency stock"],
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-700",
    hoverColor: "hover:bg-indigo-50",
    image: "/delivery.png",
  },
]

export default function ServicesSection() {
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

    const element = document.getElementById("services")
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
    <section id="services" className="py-8 sm:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-[#2e7d32]">Services</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive pharmaceutical wholesale services designed to meet the diverse needs of healthcare
            providers worldwide, ensuring reliable supply chains and regulatory compliance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 100}
            >

              {/* Image */}
              <div className="relative h-32 sm:h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-6">
                {/* Icon with colored background */}
                <div
                  className={`${service.bgColor} ${service.iconColor} p-2 sm:p-3 rounded-full w-fit mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon size={20} className="sm:w-8 sm:h-8 group-hover:drop-shadow-lg" />
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-[#2e7d32] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 leading-relaxed">{service.description}</p>

                {/* Features list */}
                <ul className="list-disc pl-3 sm:pl-5 text-xs sm:text-sm text-green-700 space-y-0.5 sm:space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="hover:text-green-800 transition-colors duration-200">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2e7d32]/5 via-transparent to-[#4caf50]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md sm:rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
