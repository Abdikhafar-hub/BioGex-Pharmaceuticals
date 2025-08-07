"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#2e7d32] shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/logofullbgless.png"
                alt="BioGex Pharmaceuticals"
                className="h-8 sm:h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden md:block`}>
              <div className="ml-10 flex items-baseline space-x-2">
                {[
                  { name: "Home", id: "home" },
                  { name: "About", id: "about" },
                  { name: "Products", id: "products" },
                  { name: "Services", id: "services" },
                  { name: "Stats", id: "stats" },
                  { name: "Partners", id: "partners" },
                  { name: "Testimonials", id: "testimonials" },
                  { name: "Blog", id: "blog" },
                  { name: "Awards", id: "awards" },
                  { name: "Contact", id: "contact" },
                  { name: "Get a Quote", id: "contact", isCTA: true }
                ].map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group overflow-hidden ${
                      isScrolled ? "text-white hover:text-white" : "text-white hover:text-white"
                    } ${item.isCTA ? "bg-[#2e7d32] text-white hover:scale-105 hover:shadow-xl hover:shadow-[#2e7d32]/30" : ""}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {!item.isCTA && (
                      <div className="absolute inset-0 bg-white/10 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                    {item.isCTA && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1b5e20] to-[#2e7d32] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                    )}
                    <span className={`relative z-10 group-hover:font-semibold transition-all duration-300 group-hover:drop-shadow-lg ${item.isCTA ? "group-hover:text-white" : ""}`}>
                      {item.name}
                    </span>
                    {!item.isCTA && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                    {item.isCTA && (
                      <div className="absolute inset-0 rounded-lg bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />

        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-gradient-to-b from-[#2e7d32] via-[#1b5e20] to-[#2e7d32] shadow-2xl transform transition-all duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <img
              src="/logofullbgless.png"
              alt="BioGex Pharmaceuticals"
              className="h-8 w-auto brightness-0 invert"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-6">
            <div className="space-y-2">
              {[
                { name: "Home", id: "home", icon: "🏠" },
                { name: "About", id: "about", icon: "ℹ️" },
                { name: "Products", id: "products", icon: "📦" },
                { name: "Services", id: "services", icon: "🔧" },
                { name: "Stats", id: "stats", icon: "📊" },
                { name: "Partners", id: "partners", icon: "🤝" },
                { name: "Testimonials", id: "testimonials", icon: "💬" },
                { name: "Blog", id: "blog", icon: "📝" },
                { name: "Awards", id: "awards", icon: "🏆" },
                { name: "Contact", id: "contact", icon: "📞" }
              ].map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center space-x-4 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-105 group"
                >
                  <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium group-hover:font-semibold transition-all duration-200">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-white text-[#2e7d32] px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Get a Quote</span>
                <span className="text-lg">💬</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/20 text-center text-white/60 text-xs">
              <p>Leading pharmaceutical distribution</p>
              <p className="text-white/40 mt-1">© 2024 BioGex Pharmaceuticals</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
