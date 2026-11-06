import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AppShowcase from './components/AppShowcase'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Pricing from './components/Pricing'
import TestimonialsAndFAQ from './components/TestimonialsAndFAQ'
import Footer from './components/Footer'
import DownloadModal from './components/DownloadModal'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  const handleOpenDownload = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setDownloadModalOpen(true)
  }

  return (
    <div className="bg-baa-cream font-sans text-baa-charcoal overflow-x-hidden">
      <Navbar onOpenDownload={handleOpenDownload} />
      <Hero onOpenDownload={handleOpenDownload} />
      <AppShowcase />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing onOpenDownload={handleOpenDownload} />
      <TestimonialsAndFAQ />
      <Footer onOpenDownload={handleOpenDownload} />
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </div>
  )
}

