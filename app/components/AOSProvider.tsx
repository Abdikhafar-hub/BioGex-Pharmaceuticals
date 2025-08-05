"use client"

import { useEffect } from 'react'
import AOS from 'aos'

export default function AOSProvider() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100,
      delay: 0,
    })
  }, [])

  return null
} 