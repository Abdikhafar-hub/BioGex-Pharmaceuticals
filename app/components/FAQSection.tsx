"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How can I request a quote for pharmaceutical products?",
    answer:
      "You can request a quote by filling out our contact form, calling our sales team directly, or emailing us at sales@biogexpharma.com. Our team will respond within 24 hours with detailed pricing and availability information.",
  },
  {
    question: "What is your delivery coverage area?",
    answer:
      "We provide pharmaceutical distribution services across 10+ countries with our global network. Our coverage includes North America, Europe, Asia-Pacific, and select regions in Africa and South America. Contact us to confirm delivery to your specific location.",
  },
  {
    question: "Do you provide export documentation and regulatory support?",
    answer:
      "Yes, we provide comprehensive export documentation including certificates of analysis, export licenses, and regulatory compliance documentation. Our regulatory team ensures all shipments meet international pharmaceutical standards and local requirements.",
  },
  {
    question: "What are your minimum order quantities?",
    answer:
      "Minimum order quantities vary by product and destination. We work with healthcare providers of all sizes, from small clinics to large hospital systems. Contact our sales team to discuss your specific requirements and flexible ordering options.",
  },
  {
    question: "How do you ensure product quality and cold chain integrity?",
    answer:
      "We maintain strict quality control through temperature-controlled storage, real-time monitoring systems, and validated cold chain logistics. All products are stored and transported according to manufacturer specifications and regulatory requirements.",
  },
  {
    question: "What payment terms do you offer?",
    answer:
      "We offer flexible payment terms including net 30, net 60, and letter of credit options for qualified customers. Payment methods include wire transfer, ACH, and other secure banking solutions. Terms are established based on credit evaluation and order history.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-[#2e7d32]">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our pharmaceutical distribution services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="text-[#2e7d32]" size={24} />
                  ) : (
                    <ChevronDown className="text-[#2e7d32]" size={24} />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button
            onClick={() => {
              const element = document.getElementById("contact")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="bg-[#2e7d32] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1b5e20] transition-all duration-300 hover:shadow-lg"
          >
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  )
}
