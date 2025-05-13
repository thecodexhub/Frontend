
import { useState, useEffect } from "react"
import React from 'react';

// Custom Button component to replace @/components/ui/button
const Button = ({ children, size = "md", variant, className = "", ...props }) => {
  const sizeClasses = size === "lg" ? "py-3 px-6 text-lg" : size === "sm" ? "py-1 px-3 text-sm" : "py-2 px-4";
  const variantClasses = variant === "outline" 
    ? "border border-current bg-transparent" 
    : "bg-purple-600 hover:bg-purple-700";
  
  return (
    <button 
      className={`rounded-md font-medium transition-colors ${sizeClasses} ${variantClasses} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Badge component
const Badge = ({ children, className = "", ...props }) => {
  return (
    <span 
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${className}`} 
      {...props}
    >
      {children}
    </span>
  );
};

// Custom icons components
const IconWrapper = ({ children, className = "" }) => (
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
    {children}
  </svg>
);

const Code2 = (props) => (
  <IconWrapper {...props}>
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </IconWrapper>
);

const Trophy = (props) => (
  <IconWrapper {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 22V8a4 4 0 0 1 4-4h.5" />
    <path d="M8 22v-7" />
    <path d="M16 22v-7" />
    <path d="M8 15h8" />
  </IconWrapper>
);

const Users = (props) => (
  <IconWrapper {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconWrapper>
);

const Zap = (props) => (
  <IconWrapper {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </IconWrapper>
);

const ChevronRight = (props) => (
  <IconWrapper {...props}>
    <polyline points="9 18 15 12 9 6" />
  </IconWrapper>
);

const Terminal = (props) => (
  <IconWrapper {...props}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </IconWrapper>
);

const Calendar = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </IconWrapper>
)

// TypewriterCode component
function TypewriterCode() {
  const codeLines = [
    "// Start your fresh semester with us...",
    "function prepareForPlacement() {",
    "  const skills = ['DSA', 'Problem Solving', 'Aptitude'];",
    "  const companies = getTopCompanies();",
    "  const path = choosePath('Full Stack', 'AI/ML', 'Android');",
    "  ",
    "  return { skills, companies, path };",
    "  // Registration open now!",
  ]

  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= codeLines.length) return

    const timer = setTimeout(() => {
      if (currentChar < codeLines[currentLine].length) {
        setDisplayedLines((prev) => {
          const newLines = [...prev]
          if (newLines.length <= currentLine) {
            newLines.push("")
          }
          newLines[currentLine] = codeLines[currentLine].substring(0, currentChar + 1)
          return newLines
        })
        setCurrentChar((prev) => prev + 1)
      } else {
        setCurrentLine((prev) => prev + 1)
        setCurrentChar(0)
      }
    }, 30)

    return () => clearTimeout(timer)
  }, [currentLine, currentChar])

  return (
    <div id="home" className="min-h-[200px]">
      {displayedLines.map((line, index) => (
        <div
          key={index}
          className={
            line.includes("//")
              ? "text-gray-400"
              : line.includes("function")
                ? "text-purple-400"
                : line.includes("Time remaining")
                  ? "text-green-400"
                  : "text-gray-300"
          }
        >
          {line || " "}
        </div>
      ))}
      <div className="h-4 w-2 bg-purple-400 inline-block animate-pulse ml-1"></div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      {/* Background code pattern */}
      <div className="absolute inset-0 opacity-5">
        <pre className="text-xs sm:text-sm text-green-500 font-mono overflow-hidden h-full">
          {Array(50)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="whitespace-nowrap">
                {`function solve(n) { let dp = Array(n+1).fill(0); dp[0] = 1; for(let i=1; i<=n; i++) { for(let j=i; j<=n; j++) { dp[j] += dp[j-i]; } } return dp[n]; }`}
              </div>
            ))}
        </pre>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge className="px-3 py-1 bg-purple-900 text-purple-100 hover:bg-purple-800 border-none">
              Beta Access Now Open
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="block">Code. Compete.</span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 text-transparent bg-clip-text">
                Conquer.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              Join the ultimate coding battleground where you can sharpen your skills, compete with peers, and climb the
              weekly leaderboard to prove your programming prowess.
            </p>

            <div className="flex flex-row gap-3">
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white border-none flex items-center"
                onClick={() => {
                  const waitlistSection = document.getElementById('waitlist');
                  if (waitlistSection) {
                    window.scrollTo({
                      top: waitlistSection.offsetTop - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <span>Register Now</span> <ChevronRight className="ml-1 h-4 w-4 inline-block" />
              </Button>
              <Button 
                variant="outline" 
                className="border-purple-700 text-purple-300 hover:bg-purple-900/30"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    window.scrollTo({
                      top: featuresSection.offsetTop - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">Year Wise</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">College Level</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">Weekly Contests</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Terminal-like editor */}
            <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden h-auto">
              <div className="bg-gray-800 px-4 py-1.5 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <div className="ml-2 text-xs text-gray-400 font-mono">placement-prep.js</div>
              </div>

              <div className="p-3 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Launching Next Semester</span>
                  </div>
                  <Badge className="bg-purple-600/30 text-purple-300 border-none text-[10px] py-0">Pre-register</Badge>
                </div>

                <div className="space-y-1">
                  <TypewriterCode />
                </div>

                <div className="-mt-14 border-t border-gray-700 pt-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-gray-300 text-xs">What to expect</span>
                    </div>
                    <span className="text-[10px] text-purple-300">Full Roadmap</span>
                  </div>

                  <div className="bg-purple-900/30 rounded p-1.5 border border-purple-800/50 text-[10px]">
                    <div className="grid grid-cols-12 gap-1 mb-1 text-gray-400">
                      <div className="col-span-7">Feature</div>
                      <div className="col-span-5">Benefit</div>
                    </div>
                    <div className="grid grid-cols-12 gap-1 py-0.5 border-b border-gray-700">
                      <div className="col-span-7 text-white">Weekly Year-wise DSA Contests</div>
                      <div className="col-span-5 text-green-400">Placement Preparation</div>
                    </div>
                    <div className="grid grid-cols-12 gap-1 py-0.5 border-b border-gray-700">
                      <div className="col-span-7 text-white">Top 3 on leaderboard</div>
                      <div className="col-span-5 text-green-400">Paid Internship/Prizes</div>
                    </div>
                    <div className="grid grid-cols-12 gap-1 py-0.5">
                      <div className="col-span-7 text-white">Specialization Paths</div>
                      <div className="col-span-5 text-green-400">Career Growth</div>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-[10px] text-gray-400">
                    <span className="text-purple-300">Note:</span> Register Fast !
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-700 text-purple-300 hover:bg-purple-900/30 text-[10px] py-0.5 px-2"
                    >
                      Early Access
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-amber-500 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}