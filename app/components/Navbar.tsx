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

  const openProductSheet = () => {
    window.open("https://docs.google.com/spreadsheets/d/1example", "_blank")
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#2e7d32] shadow-lg" : "bg-transparent"
        } ${isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
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
            <div className="hidden md:block">
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
                  { name: "Contact", id: "contact" }
                ].map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group overflow-hidden ${
                      isScrolled ? "text-white hover:text-white" : "text-white hover:text-white"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Background hover effect */}
                    <div className="absolute inset-0 bg-white/10 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    
                    {/* Text with glow effect */}
                    <span className="relative z-10 group-hover:font-semibold transition-all duration-300 group-hover:drop-shadow-lg">
                      {item.name}
                    </span>
                    
                    {/* Underline animation */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                ))}
                
                {/* CTA Button with enhanced styling */}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="relative bg-white text-[#2e7d32] px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/30 group overflow-hidden ml-4"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  
                  {/* Text with color transition */}
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Get a Quote
                  </span>
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-full bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  isScrolled ? "text-white" : "text-white"
                }`}
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
            <div className="flex items-center space-x-3">
              <img
                src="/logofullbgless.png"
                alt="BioGex Pharmaceuticals"
                className="h-8 w-auto brightness-0 invert"
              />
             
            </div>
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
                  style={{ animationDelay: `${index * 50}ms` }}
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

            {/* CTA Button */}
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
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs">
                  Leading pharmaceutical distribution
                </p>
                <p className="text-white/40 text-xs mt-1">
                  © 2024 BioGex Pharmaceuticals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
