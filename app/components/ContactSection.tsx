"use client"

import type React from "react"
import { useEffect } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactSection() {
  // Load GHL Script on Mount
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://api.carasant.com/js/form_embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="contact" className="py-12 sm:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Get in <span className="text-[#2e7d32]">Touch</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to partner with us? Contact our team for personalized pharmaceutical solutions and expert guidance.
          </p>
        </div>

        {/* Contact Content */}
        <div className="flex flex-wrap gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Contact Information */}
          <div className="w-full md:w-1/4 space-y-6 sm:space-y-8">
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

          {/* Contact Form Iframe */}
          <div className="backdrop-blur-sm rounded-xl border border-white/30 h-[800px] overflow-hidden flex-1">
            <iframe
              src="https://api.carasant.com/widget/form/D9e0toSFuAgLGXY9YGYL"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
              id="inline-D9e0toSFuAgLGXY9YGYL"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="3. Website Contact Form"
              data-height="undefined"
              data-layout-iframe-id="inline-D9e0toSFuAgLGXY9YGYL"
              data-form-id="D9e0toSFuAgLGXY9YGYL"
              title="3. Website Contact Form"
            >
            </iframe>
          </div>
        </div>

        {/* Full-width Map */}
        <div className="relative z-0">
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
