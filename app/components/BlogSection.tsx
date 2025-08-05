"use client"

import { useEffect, useState } from "react"
import { Calendar, ArrowRight, User } from "lucide-react"

const blogPosts = [
  {
    title: "Artificial Intelligence in Pharmaceuticals and Biotechnology: Current Trends and Innovations",
    excerpt:
      "Explore emerging trends in pharmaceutical logistics, including AI-driven supply chains and sustainable distribution practices.",
    image: "/ai-in-pharma.jpg",
    author: "Dr. Sarah Mitchell",
    
    readTime: "5 min read",
    link: "https://www.coherentsolutions.com/insights/artificial-intelligence-in-pharmaceuticals-and-biotechnology-current-trends-and-innovations?utm_source=chatgpt.com",
  },
  {
    title: "Regulatory Compliance in Global Pharmaceutical Trade",
    excerpt:
      "Understanding the complex regulatory landscape for international pharmaceutical distribution and ensuring compliance.",
    image: "reg.webp",
    author: "Michael Chen",
    
    readTime: "7 min read",
    link: "https://www.fda.gov/drugs/drug-supply-chain-integrity/drug-supply-chain-security-act-dscsa",
  },
  {
    title: "Oncology (Cancer)/Hematologic Malignancies Approval Notifications",
    excerpt:
      "Precision oncology dominates: 80%+ of new approvals are biomarker-specific (e.g., EGFR, ALK, ROS1, PD-L1).",
    image: "/can.webp",
    author: "FDA",
    
    readTime: "6 min read",
    link: "https://www.fda.gov/drugs/resources-information-approved-drugs/oncology-cancerhematologic-malignancies-approval-notifications",
  },
]

export default function BlogSection() {
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

    const element = document.getElementById("blog")
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
    <section id="blog" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-6 sm:mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Latest <span className="text-[#2e7d32]">Insights</span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with our latest articles on pharmaceutical trends, industry updates, and healthcare innovations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className={`bg-gray-50 rounded-md sm:rounded-2xl overflow-hidden hover:shadow-sm sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-3 group flex flex-col min-w-0 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/greenpillsgreenbg.jpg"}
                  alt={post.title}
                  className="w-full h-32 sm:h-48 object-cover rounded-lg sm:rounded-none group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-1 sm:top-4 right-1 sm:right-4 bg-[#2e7d32] text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                  {post.readTime}
                </div>
              </div>

              <div className="p-1.5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-sm sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-3 group-hover:text-[#2e7d32] transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-base text-gray-600 mb-2 sm:mb-4 leading-tight sm:leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(post.link, '_blank', 'noopener,noreferrer');
                  }}
                  className="flex items-center text-[#2e7d32] font-semibold hover:gap-1 sm:hover:gap-3 transition-all duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2 cursor-pointer text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-3 rounded-md border border-[#2e7d32]/20 hover:border-[#2e7d32]/40 self-start"
                >
                  Read More
                  <ArrowRight size={10} className="sm:w-4 sm:h-4 ml-0.5 sm:ml-2" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <a
            href="https://www.pharmaceutical-journal.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://www.pharmaceutical-journal.com/', '_blank', 'noopener,noreferrer');
            }}
            className="inline-block bg-[#2e7d32] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md sm:rounded-full text-sm sm:text-base font-semibold hover:bg-[#1b5e20] transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  )
}
