import { useState, useEffect } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [clickedItem, setClickedItem] = useState(null)

  // Handle scroll effect for floating navbar and section detection
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar appearance
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Detect active section
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: "smooth"
      })
    }
    setClickedItem(sectionId) // Set clicked item
    setIsOpen(false) // Close mobile menu after clicking
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("home")
          }}
          href="#home" 
          className="text-white font-bold text-xl md:text-2xl flex items-center space-x-2 cursor-pointer"
        >
          <img src="/codex1.png" alt="Logo" className="h-10 w-30" />
          {/* <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 text-transparent bg-clip-text">
            CodeArena
          </span> */}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink 
            href="#home" 
            sectionId="home"
            active={activeSection === "home"}
            clicked={clickedItem === "home"}
            onClick={() => scrollToSection("home")}
          >
            Home
          </NavLink>
          <NavLink 
            href="#features" 
            sectionId="features"
            active={activeSection === "features"}
            clicked={clickedItem === "features"}
            onClick={() => scrollToSection("features")}
          >
            About Us
          </NavLink>
          <NavLink 
            href="#features" 
            sectionId="features"
            active={activeSection === "features"}
            clicked={clickedItem === "features"}
            onClick={() => scrollToSection("features")}
          >
            Features
          </NavLink>
          <NavLink 
            href="#testimonials" 
            sectionId="testimonials"
            active={activeSection === "testimonials"}
            clicked={clickedItem === "testimonials"}
            onClick={() => scrollToSection("testimonials")}
          >
            Testimonials
          </NavLink>
          <NavLink 
            href="#waitlist" 
            sectionId="waitlist"
            active={activeSection === "waitlist"}
            clicked={clickedItem === "waitlist"}
            onClick={() => scrollToSection("waitlist")}
          >
            Join Waitlist
          </NavLink>
          <NavLink 
            href="#team" 
            sectionId="team"
            active={activeSection === "team"}
            clicked={clickedItem === "team"}
            onClick={() => scrollToSection("team")}
          >
            Our Team
          </NavLink>
          <LoginButton onClick={() => {
            scrollToSection("login")
            setClickedItem("login")
          }} />
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute w-full bg-gray-900 shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <MobileNavLink 
            href="#home" 
            active={activeSection === "home"}
            clicked={clickedItem === "home"}
            onClick={() => scrollToSection("home")}
          >
            Home
          </MobileNavLink>
          <MobileNavLink 
            href="#features" 
            active={activeSection === "features"}
            clicked={clickedItem === "features"}
            onClick={() => scrollToSection("features")}
          >
            About Us
          </MobileNavLink>
          <MobileNavLink 
            href="#features" 
            active={activeSection === "features"}
            clicked={clickedItem === "features"}
            onClick={() => scrollToSection("features")}
          >
            Features
          </MobileNavLink>
          <MobileNavLink 
            href="#testimonials" 
            active={activeSection === "testimonials"}
            clicked={clickedItem === "testimonials"}
            onClick={() => scrollToSection("testimonials")}
          >
            Testimonials
          </MobileNavLink>
          <MobileNavLink 
            href="#waitlist" 
            active={activeSection === "waitlist"}
            clicked={clickedItem === "waitlist"}
            onClick={() => scrollToSection("waitlist")}
          >
            Join Waitlist
          </MobileNavLink>
          <MobileNavLink 
            href="#team" 
            active={activeSection === "team"}
            clicked={clickedItem === "team"}
            onClick={() => scrollToSection("team")}
          >
            Our Team
          </MobileNavLink>
          <div className="pt-2">
            <LoginButton 
              isMobile 
              onClick={() => {
                scrollToSection("login")
                setClickedItem("login")
              }} 
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

// Desktop Navigation Link
const NavLink = ({ href, sectionId, children, active, clicked, onClick }) => {
  return (
    <a
      href={href}
      className={`text-sm font-medium relative cursor-pointer transition-colors duration-200 ${
        active ? "text-gray-300" : "text-gray-300 hover:text-white"
      }`}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
      <span className={`absolute bottom-0 left-0 h-0. ${
        active || clicked ? "w-full" : "w-0"
      }`}></span>
    </a>
  )
}

// Mobile Navigation Link
const MobileNavLink = ({ href, children, active, clicked, onClick }) => (
  <a
    href={href}
    className={`transition-colors duration-200 text-base font-medium py-2 block cursor-pointer ${
      active || clicked ? "text-white" : "text-gray-300 hover:text-white"
    }`}
    onClick={(e) => {
      e.preventDefault()
      onClick()
    }}
  >
    {children}
  </a>
)

// Login Button
const LoginButton = ({ isMobile = false, onClick }) => (
  <a
    href="/login"
    onClick={(e) => {
      e.preventDefault()
      window.location.href = '/login'
    }}
    className={`
      inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer
      bg-purple-600 hover:bg-purple-700 text-white
      ${isMobile ? "w-full py-2 px-4 text-base" : "py-2 px-4 text-sm"}
    `}
  >
    Login
  </a>
)

// Icon components
const MenuIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const XIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default Navbar