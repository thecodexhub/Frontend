"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { BackgroundBeams } from "./ui/background-beams"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Form Schema - Moved outside component to prevent recreation
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobileNo: z.string().min(10, "Mobile number must be at least 10 digits"),
  year: z.string().min(1, "Year of study is required"),
  department: z.string().min(1, "Department is required"),
  shift: z.string().default("Regular"),
})

// Discord redirect URL
const DISCORD_INVITE_URL = "https://discord.gg/MAAb5bRa"

// Custom Dialog Component
const Dialog = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      style={{
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div
        ref={dialogRef}
        className="bg-neutral-900 border border-neutral-800/50 text-neutral-200 rounded-xl shadow-2xl w-full max-w-[550px]"
        style={{
          animation: "scaleIn 0.2s ease-out",
          transformOrigin: "center",
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Success notification with Discord redirect button
const SuccessNotification = ({ showSuccess, onDismiss, onRedirect }) => {
  if (!showSuccess) return null

  return (
    <div
      className="fixed top-6 right-6 z-50"
      style={{
        animation: "slideDown 0.3s ease-out",
      }}
    >
      <div className="bg-emerald-900/90 backdrop-blur-sm border border-emerald-700 text-emerald-100 p-4 rounded-lg shadow-xl flex flex-col items-start max-w-md">
        <div className="flex items-start w-full">
          <div className="bg-emerald-500 rounded-full p-1 mr-3 mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-emerald-100">Registration Successful!</h3>
            <p className="text-emerald-200 text-sm mt-1">
              Thank you for registering. Please check your email inbox or spam folder for confirmation.
            </p>
          </div>
          <button onClick={onDismiss} className="ml-4 text-emerald-400 hover:text-emerald-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        
        <button 
          onClick={onRedirect}
          className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center justify-center transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
          </svg>
          Join Discord Server
        </button>
      </div>
    </div>
  )
}

const PriceDisplay = () => (
  <div className="relative z-10 flex flex-col items-center justify-center mt-6 mb-8">
    <div className="bg-gradient-to-r from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/50 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <div className="text-center">
          <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium">Early Bird Offer</p>
          <p className="text-4xl font-bold text-white mt-1">
            ₹299<span className="text-lg font-normal text-neutral-400">/-</span>
          </p>
          <p className="text-emerald-400 text-xs mt-1">Valid till 31st May</p>
        </div>

        <div className="hidden sm:block h-12 w-px bg-neutral-700/50"></div>

        <div className="text-center">
          <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium">Regular Price</p>
          <p className="text-3xl font-bold text-neutral-500 mt-1">
            <span className="line-through">₹499</span>
            <span className="text-lg font-normal text-neutral-600">/-</span>
          </p>
          <p className="text-neutral-500 text-xs mt-1">After 31st May</p>
        </div>
      </div>
    </div>
  </div>
)

// Custom Form Components
const FormField = ({ label, error, children, required = false }) => (
  <div className="mb-3">
    <label className="block text-neutral-300 text-sm font-medium mb-1">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
)

const CustomInput = ({ register, name, error, ...props }) => (
  <input
    {...register(name)}
    {...props}
    className={`w-full bg-neutral-800/70 backdrop-blur-sm border ${
      error ? "border-red-500" : "border-neutral-700"
    } text-neutral-200 rounded-lg p-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-neutral-500 focus:border-transparent ${
      props.className || ""
    }`}
  />
)

const CustomSelect = ({ register, name, error, children, ...props }) => (
  <div className="relative">
    <select
      {...register(name)}
      {...props}
      className={`w-full bg-neutral-800/70 backdrop-blur-sm border ${
        error ? "border-red-500" : "border-neutral-700"
      } text-neutral-200 rounded-lg p-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-neutral-500 focus:border-transparent appearance-none ${
        props.className || ""
      }`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999' strokeWidth='2'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "1rem",
      }}
    >
      {children}
    </select>
  </div>
)

const CustomButton = ({ children, isLoading, ...props }) => (
  <button
    {...props}
    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
      props.variant === "ghost"
        ? "bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
        : "bg-gradient-to-r from-neutral-200 to-neutral-500 text-neutral-900 hover:shadow-[0_0_15px_rgba(229,229,229,0.3)]"
    } ${props.className || ""} ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
    disabled={isLoading || props.disabled}
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing...
      </div>
    ) : (
      children
    )}
  </button>
)

export function BackgroundBeamsDemo() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  // Adding a state for redirect countdown
  const [redirectCountdown, setRedirectCountdown] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      year: "",
      department: "",
      shift: "Regular",
    },
  })

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      
      @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .form-transition-enter {
        opacity: 0;
        transform: translateY(10px);
      }
      
      .form-transition-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 300ms, transform 300ms;
      }
      
      .form-transition-exit {
        opacity: 1;
      }
      
      .form-transition-exit-active {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 300ms, transform 300ms;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Redirect handler
  const handleRedirectToDiscord = useCallback(() => {
    window.location.href = DISCORD_INVITE_URL
  }, [])

  const onSubmit = useCallback(
    async (data) => {
      setIsSubmitting(true)
      setError(null)

      try {
        const response = await fetch("https://codex-reg-f766.onrender.com/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok) {
          if (result.errmsg && result.errmsg.includes("duplicate key error")) {
            if (result.errmsg.includes("email")) {
              setError("This email is already registered.")
            } else if (result.errmsg.includes("mobileNo")) {
              setError("This mobile number is already registered.")
            } else {
              setError("A user with this information already exists.")
            }
          } else {
            setError(result.message || "Failed to register. Please try again.")
          }
        } else {
          setOpen(false)
          reset()
          setShowSuccess(true)
          
         // Start a 5-second countdown before automatic redirect
          let countdown = 5
          setRedirectCountdown(countdown)
          const redirectTimer = setInterval(() => {
            countdown -= 1
            setRedirectCountdown(countdown)
            if (countdown <= 0) {
              clearInterval(redirectTimer)
              handleRedirectToDiscord()
            }
          }, 1000)
        }
      } catch (err) {
        setError("An error occurred. Please try again later.")
        console.error(err)
      } finally {
        setIsSubmitting(false)
      }
    },
    [reset, handleRedirectToDiscord],
  )

  const handleDismissSuccess = useCallback(() => {
    setShowSuccess(false)
  }, [])

  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <div
      id="waitlist"
      className="h-[40rem] w-full bg-black relative flex flex-col items-center justify-center antialiased"
    >
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-800 text-center font-sans font-bold">
          Join the waitlist
        </h1>

        <PriceDisplay />

        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => setOpen(true)}
            className="relative z-10 px-8 py-3 rounded-lg 
            bg-gradient-to-b from-neutral-200 to-neutral-600 
            text-[#0a0a0a] font-medium text-lg
            transition-all duration-300 ease-out transform 
            hover:scale-105 hover:shadow-[0_0_30px_rgba(229,229,229,0.3)]
            hover:from-neutral-100 hover:to-neutral-500
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            Register Now
          </button>
        </div>
      </div>
      <BackgroundBeams />

      <SuccessNotification 
        showSuccess={showSuccess} 
        onDismiss={handleDismissSuccess} 
        onRedirect={handleRedirectToDiscord} 
      />

      <Dialog isOpen={open} onClose={handleClose}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl text-white font-bold">Registration Form</h2>
              <p className="text-neutral-400 text-sm mt-1">Join now at our special early bird price</p>
            </div>
            <button
              onClick={handleClose}
              className="text-neutral-400 hover:text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-full p-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-950/70 backdrop-blur-sm border border-red-800 text-red-200 p-4 rounded-lg mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="max-h-[60vh] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="First Name" error={errors.firstName?.message} required>
                  <CustomInput register={register} name="firstName" placeholder="First Name" error={errors.firstName} />
                </FormField>
                <FormField label="Middle Name">
                  <CustomInput register={register} name="middleName" placeholder="Middle Name" />
                </FormField>
                <FormField label="Last Name" error={errors.lastName?.message} required>
                  <CustomInput register={register} name="lastName" placeholder="Last Name" error={errors.lastName} />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Email" error={errors.email?.message} required>
                  <CustomInput register={register} name="email" type="email" placeholder="Email" error={errors.email} />
                </FormField>
                <FormField label="Mobile Number" error={errors.mobileNo?.message} required>
                  <CustomInput
                    register={register}
                    name="mobileNo"
                    type="tel"
                    placeholder="Mobile Number"
                    error={errors.mobileNo}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Year of Study" error={errors.year?.message} required>
                  <CustomSelect register={register} name="year" error={errors.year}>
                    <option value="">Select Year</option>
                    <option value="FY">FY</option>
                    <option value="SY">SY</option>
                    <option value="TY">TY</option>
                    <option value="LY">LY</option>
                  </CustomSelect>
                </FormField>
                <FormField label="Department" error={errors.department?.message} required>
                  <CustomSelect register={register} name="department" error={errors.department}>
                    <option value="">Select Department</option>
                    <option value="Computer">Computer</option>
                    <option value="IT">IT</option>
                    <option value="AI & DS">AI & DS</option>
                    <option value="CSD">CSD</option>
                    <option value="ENTC">ENTC</option>
                    <option value="Other">Other</option>
                  </CustomSelect>
                </FormField>
              </div>

              <div>
                <label className="block text-neutral-300 text-sm font-medium mb-2">Shift</label>
                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="morning"
                      value="Morning"
                      {...register("shift")}
                      className="w-4 h-4 accent-neutral-400"
                    />
                    <label htmlFor="morning" className="text-neutral-300 font-medium">
                      Morning
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="regular"
                      value="Regular"
                      {...register("shift")}
                      className="w-4 h-4 accent-neutral-400"
                      defaultChecked
                    />
                    <label htmlFor="regular" className="text-neutral-300 font-medium">
                      Regular
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 pt-4 border-t border-neutral-800 mt-4">
              <CustomButton type="button" variant="ghost" onClick={handleClose}>
                Cancel
              </CustomButton>
              <CustomButton type="submit" isLoading={isSubmitting}>
                Register Now
              </CustomButton>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  )
}