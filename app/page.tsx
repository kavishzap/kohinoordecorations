"use client"

import Header from "@/components/Header"
import HeroSlider from "@/components/HeroSlider"
import About from "@/components/About"
import Themes from "@/components/Themes"
import GalleryTabs from "@/components/GalleryTabs"
import Packages from "@/components/Packages"
import Services from "@/components/Services"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import FloatingPetals from "@/components/FloatingPetals"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <About />
        <Themes />
        <GalleryTabs />
        <Packages />
        <Services />
        <Contact />
      </main>
      <Footer />
      <FloatingPetals />
    </>
  )
}
