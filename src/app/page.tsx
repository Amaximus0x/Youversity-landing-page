'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Play, ArrowRight, Sparkles, Book, Trophy, Home, PlusCircle, User } from "lucide-react"
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import { Poppins } from 'next/font/google'
import Lottie from "lottie-react"
import { useState, useEffect, useRef } from "react"
// import HeroAnimation from './hero-animation'
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import { useCallback } from "react"
import type { Engine } from "tsparticles-engine"
import Image from "next/image"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const HeroAnimation = () => {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch("https://lottie.host/1ff58174-71fa-4262-bb0b-ad1f59fd0fc2/mbDxxZpWrO.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Error fetching Lottie animation:", error))
  }, [])

  if (!animationData) {
    return <div>Loading animation...</div>
  }

  return (
    <div className="bg-[#F5F5F5]">
      <Lottie
        animationData={animationData}
        className="w-full h-full"
        loop={true}
        autoplay={true}
      />
    </div>
  )
}

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const isMediaQuery = useMediaQuery({ maxWidth: 767 });
  const isMobile = isMounted ? isMediaQuery : false;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const menuItems = [
    { name: "Home", icon: Home, comingSoon: false },
    { name: "My Courses", icon: Book, comingSoon: true },
    { name: "Create Course", icon: PlusCircle, comingSoon: true },
  ]

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesOptions = {
    fpsLimit: 120,
    particles: {
      color: {
        value: "#2A4D61",
      },
      links: {
        color: "#2A4D61",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.1,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.5, max: 1 },
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: false,
        },
      },
    },
    detectRetina: true,
  }

  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const emailFormRef = useRef<HTMLFormElement>(null)

  const scrollToEmailForm = () => {
    emailFormRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EE434A]"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F5F5F5] text-[#1E3443] pb-16 md:pb-0 ${poppins.variable} font-sans relative overflow-hidden`}>
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Particles
          className="absolute inset-0"
          id="background-particles"
          init={particlesInit}
          options={particlesOptions}
        />
      </div>
      <div className="relative z-[2]">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-30">
          <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div className="flex items-center space-x-2 bg-white/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YouVersity-OaDJMiQwgpRDm2eaJ4e7fXRjimyir2.png"
                alt="YouVersity Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              {/* <span className="text-xl font-bold text-[#2A4D61]">YouVersity</span> */}
            </motion.div>
            {!isMounted && isMobile && (
              <motion.nav
                className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-lg z-50"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-around items-center py-2">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.name}
                      className="relative group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href="#"
                        className={`flex flex-col items-center text-[#2A4D61] hover:text-[#EE434A] transition-colors ${
                          item.comingSoon ? 'pointer-events-none' : ''
                        }`}
                      >
                        <item.icon className="w-6 h-6 mb-1" />
                        <span className="text-xs">{item.name}</span>
                      </a>
                      {item.comingSoon && (
                        <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-[#EE434A] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          Coming Soon
                        </span>
                      )}
                    </motion.div>
                  ))}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-[#EE434A] hover:bg-[#D93D44] text-white rounded-full p-2">
                      <User className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </motion.nav>
            )}
            {isMounted && !isMobile && (
              <div className="hidden md:flex space-x-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <a
                      href="#"
                      className={`text-[#2A4D61] hover:text-[#EE434A] transition-colors flex items-center ${
                        item.comingSoon ? 'pointer-events-none' : ''
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {item.name}
                    </a>
                    {item.comingSoon && (
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#EE434A] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Coming Soon
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#EE434A] hover:bg-[#D93D44] text-white rounded-full" onClick={scrollToEmailForm}>
                Join the Waitlist
              </Button>
            </motion.div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-16">
          <motion.section 
            className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 py-12 relative z-[10]" 
            {...fadeInUp}
          >
            <div className="md:w-1/2 space-y-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YouVersity2-42P77EuIMRuHQm4d9vtrw0tOCKefMJ.png"
                alt="YouVersity Logo"
                width={400}
                height={107}
                priority
                className="w-[400px] mb-6"
              />
              <motion.h1
                className="text-3xl md:text-4xl font-bold text-[#2A4D61]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Turn YouTube into Your University
              </motion.h1>
              <motion.p
                className="text-base md:text-lg text-[#1E3443] max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Unlock the power of AI-driven learning and transform your educational journey with personalized content from YouTube.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button className="bg-[#EE434A] hover:bg-[#D93D44] text-white rounded-full" onClick={scrollToEmailForm}>
                  Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
            <div className="md:w-1/2 bg-[#F5F5F5]">
              <HeroAnimation />
            </div>
          </motion.section>

          <motion.section className="grid md:grid-cols-2 gap-8" {...fadeInUp}>
            <motion.div whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} transition={{ duration: 0.3 }}>
              <Card className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl overflow-hidden h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-[#2A4D61] flex items-center bg-white/80">
                    <Sparkles className="w-6 h-6 mr-2 text-[#EE434A]" />
                    For HR and L&D Professionals
                  </h2>
                  <ul className="space-y-2">
                    {[
                      "Cost-effective training solutions",
                      "Custom courses at your fingertips",
                      "Up-to-date content leveraging the latest YouTube videos",
                      "Flexibility to create company-specific training programs"
                    ].map((item, index) => (
                      <motion.li key={index} className="flex items-start" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                        <CheckCircle className="w-5 h-5 text-[#42C1C8] mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} transition={{ duration: 0.3 }}>
              <Card className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl overflow-hidden h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-[#2A4D61] flex items-center">
                    <Book className="w-6 h-6 mr-2 text-[#42C1C8]" />
                    For Individual Learners
                  </h2>
                  <ul className="space-y-2">
                    {[
                      "Personalized learning paths",
                      "Learn at your own pace",
                      "Access to a vast library of educational content",
                      "AI-powered course recommendations"
                    ].map((item, index) => (
                      <motion.li key={index} className="flex items-start" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                        <CheckCircle className="w-5 h-5 text-[#EE434A] mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>

          <motion.section {...fadeInUp}>
            <h2 className="text-2xl font-bold mb-6 text-center text-[#2A4D61]">How YouVersity Works</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step: 1, description: "Select your learning goals", icon: Sparkles },
                { step: 2, description: "AI curates relevant content", icon: Play },
                { step: 3, description: "Engage with interactive quizzes", icon: Book },
                { step: 4, description: "Track progress and earn certificates", icon: Trophy }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center bg-white/80 backdrop-blur-sm p-4 md:p-6 shadow-md rounded-2xl flex flex-col items-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#EE434A] text-white text-xl md:text-2xl font-bold flex items-center justify-center mb-3 md:mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.step}
                  </motion.div>
                  <div className="bg-white/80">
                    <item.icon className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 text-[#2A4D61]" />
                  </div>
                  <p className="text-xs md:text-sm font-medium">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section {...fadeInUp}>
            <h2 className="text-2xl font-bold mb-6 text-center text-[#2A4D61]">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { quote: "YouVersity has revolutionized our corporate training. It's efficient, cost-effective, and our employees love it!", author: "Jane Doe, HR Manager at TechCorp" },
                { quote: "I've learned more in the past month with YouVersity than I did in a year of casual YouTube watching. The structure makes all the difference.", author: "John Smith, Freelance Developer" }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl overflow-hidden h-full">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <p className="italic mb-4 text-sm">{testimonial.quote}</p>
                      <p className="text-right text-[#2A4D61] text-sm font-semibold">- {testimonial.author}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="bg-[#2A4D61] text-white rounded-2xl p-6 md:p-8 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
          >
            <div className="absolute inset-0 z-[1] pointer-events-none">
              <Particles
                className="absolute inset-0"
                id="cta-particles"
                init={particlesInit}
                options={{
                  ...particlesOptions,
                  particles: {
                    ...particlesOptions.particles,
                    color: {
                      value: "#ffffff",
                    },
                    opacity: {
                      value: 0.3,
                    },
                    links: {
                      ...particlesOptions.particles.links,
                      color: "#ffffff",
                      opacity: 0.3,
                      width: 1,
                    },
                  },
                }}
              />
            </div>
            <div className="relative z-[2]">
              <motion.h2
                className="text-xl md:text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ready to Start Your Learning Journey?
              </motion.h2>
              <motion.p
                className="mb-6 max-w-2xl mx-auto text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Join thousands of learners who are already transforming their education with YouVersity.
              </motion.p>
              <motion.form
                ref={emailFormRef}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission here
                  console.log("Email submitted:", e.currentTarget.email.value);
                  setEmailSubmitted(true);
                  setTimeout(() => setEmailSubmitted(false), 5000); // Hide success message after 5 seconds
                }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                  className="w-full sm:w-64 px-4 py-2 rounded-full bg-white text-[#2A4D61] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EE434A]"
                />
                <Button type="submit" className="w-full sm:w-auto bg-[#EE434A] hover:bg-[#D93D44] text-white rounded-full">
                  Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.form>
              {emailSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-green-400 font-semibold"
                >
                  Thank you for joining our waitlist!
                </motion.div>
              )}
            </div>
          </motion.section>
        </main>

        <footer className="bg-[#2A4D61] text-white py-8 md:py-12 mt-16 rounded-t-3xl relative z-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <motion.div
                className="flex items-center space-x-2 mb-4 md:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YouVersity2%20copy-FzJhVH52dq1Ne1m34vYDJjhXN1o1Ac.png"
                  alt="YouVersity Logo"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </motion.div>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
                {["Home", "My Courses", "Create New Course", "About Us", "Contact"].map((item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="hover:text-[#42C1C8] transition-colors mb-2"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
            <motion.div
              className="text-center text-sm opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              2024 YouVersity. All rights reserved.
            </motion.div>
          </div>
        </footer>

        {isMounted && isMobile && (
          <motion.nav
            className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-lg z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-around items-center py-2">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="#"
                    className={`flex flex-col items-center text-[#2A4D61] hover:text-[#EE434A] transition-colors ${
                      item.comingSoon ? 'pointer-events-none' : ''
                    }`}
                  >
                    <item.icon className="w-6 h-6 mb-1" />
                    <span className="text-xs">{item.name}</span>
                  </a>
                  {item.comingSoon && (
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-[#EE434A] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Coming Soon
                    </span>
                  )}
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-[#EE434A] hover:bg-[#D93D44] text-white rounded-full p-2">
                  <User className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </div>
    </div>
  )
}