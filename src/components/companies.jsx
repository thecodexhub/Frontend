"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function TrustedPartners() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const companies = [
    { name: "KPIT", logo: "/logos/logo1.jpeg", delay: 0 },
    { name: "FinIQ", logo: "/logos/logo2.jpeg", delay: 0.1 },
    { name: "Josh", logo: "/logos/logo3.jpeg", delay: 0.2 },
    { name: "NVIDIA", logo: "/logos/logo4.png", delay: 0.3 },
    { name: "HSBC", logo: "/logos/logo5.png", delay: 0.4 },
    { name: "Infosys", logo: "/logos/logo6.png", delay: 0.5 },
    { name: "TCS", logo: "/logos/logo7.png", delay: 0.6 },
    { name: "LTIMindtree", logo: "/logos/logo8.png", delay: 0.7 },
    { name: "IBM", logo: "/logos/logo9.png", delay: 0.8 },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Function to handle the brochure download
  const handleDownloadBrochure = () => {
    // Create a link element
    const link = document.createElement('a');
    
    // Set the download link to the PDF file path
    // Using the same filename as from the uploaded document
    link.href = '/brochures/WHY CHOOSE CODEX.pdf';
    
    // Set the download attribute to suggest filename
    link.download = 'WHY_CHOOSE_CODEX.pdf';
    
    // Append to the document
    document.body.appendChild(link);
    
    // Trigger the click event
    link.click();
    
    // Clean up by removing the link
    document.body.removeChild(link);
  };

  return (
    <div id="aboutUs" className="w-full bg-black text-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Practice with Industry Standards
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-md"
          >
            Our platform features questions and challenges directly inspired by assessment patterns from leading tech
            companies. Master the exact type of problems you'll face in real interviews.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 max-w-md"
          >
            From algorithmic challenges to aptitude assessments, prepare yourself with industry-standard questions that
            have been asked in actual placement tests.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <button 
              onClick={handleDownloadBrochure}
              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-all"
            >
              Download Brochure
            </button>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={`grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 ${isMobile ? "justify-items-center" : ""}`}
        >
          {companies.map((company, index) => (
            <motion.div key={index} variants={item} whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-gray-900 p-2 w-full max-w-[130px] rounded-lg h-20 hover:bg-gray-800 transition-colors">
                <img
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">{company.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}