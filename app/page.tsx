"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import AboutSection from "./components/AboutSection"
import ProductsSection from "./components/ProductsSection"
import ServicesSection from "./components/ServicesSection"
import PartnersSection from "./components/PartnersSection"
import TestimonialsSection from "./components/TestimonialsSection"
import ContactSection from "./components/ContactSection"
import StatsSection from "./components/StatsSection"
import AwardsSection from "./components/AwardsSection"
import BlogSection from "./components/BlogSection"
import NewsletterSection from "./components/NewsletterSection"
import Footer from "./components/Footer"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <StatsSection />
      <PartnersSection />
      <TestimonialsSection />
      <BlogSection />
      <AwardsSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
