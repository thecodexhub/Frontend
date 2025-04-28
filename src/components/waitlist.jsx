"use client"
import { useState, useEffect, useMemo, useCallback } from "react"
import { BackgroundBeams } from "./ui/background-beams"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Import these libraries:
// npm install react-hook-form zod @hookform/resolvers

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

// Separate components for better code organization
const SuccessNotification = ({ showSuccess }) => {
  if (!showSuccess) return null;
  
  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in">
      <div className="bg-emerald-900/90 backdrop-blur-sm border border-emerald-700 text-emerald-100 p-4 rounded-lg shadow-xl flex items-start max-w-md">
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
        <div>
          <h3 className="font-medium text-emerald-100">Registration Successful!</h3>
          <p className="text-emerald-200 text-sm mt-1">
            Thank you for registering. Please check your email inbox or spam folder for confirmation.
          </p>
        </div>
      </div>
    </div>
  );
};

const PriceDisplay = () => (
  <div className="relative z-10 flex flex-col items-center justify-center mt-6 mb-8">
    <div className="bg-gradient-to-r from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/50 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <div className="text-center">
          <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium">Early Bird Offer</p>
          <p className="text-4xl font-bold text-white mt-1">
            ₹249<span className="text-lg font-normal text-neutral-400">/-</span>
          </p>
          <p className="text-emerald-400 text-xs mt-1">Valid till 30th May</p>
        </div>

        <div className="hidden sm:block h-12 w-px bg-neutral-700/50"></div>

        <div className="text-center">
          <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium">Regular Price</p>
          <p className="text-3xl font-bold text-neutral-500 mt-1 line-through">
            ₹349<span className="text-lg font-normal text-neutral-600">/-</span>
          </p>
          <p className="text-neutral-500 text-xs mt-1">After 30th May</p>
        </div>
      </div>
    </div>
  </div>
);

const FormField = ({ label, error, children, required = false }) => (
  <div>
    <label className="block text-neutral-300 text-sm font-medium mb-1">
      {label}{required && "*"}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export function BackgroundBeamsDemo() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

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

  const onSubmit = useCallback(async (data) => {
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
      }
    } catch (err) {
      setError("An error occurred. Please try again later.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }, [reset])

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
            transition-all duration-500 ease-out transform 
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

      <SuccessNotification showSuccess={showSuccess} />

      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800/50 text-neutral-200 rounded-xl p-6 w-full max-w-[550px] shadow-2xl animate-fade-in">
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
              <div className="grid grid-cols-3 gap-4">
                <FormField label="First Name" error={errors.firstName?.message} required>
                  <input
                    {...register("firstName")}
                    placeholder="First Name"
                    className="w-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 text-neutral-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                  />
                </FormField>
                <FormField label="Middle Name">
                  <input
                    {...register("middleName")}
                    placeholder="Middle Name"
                    className="w-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 text-neutral-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                  />
                </FormField>
                <FormField label="Last Name" error={errors.lastName?.message} required>
                  <input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="w-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 text-neutral-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Email" error={errors.email?.message} required>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    className="w-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 text-neutral-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                  />
                </FormField>
                <FormField label="Mobile Number" error={errors.mobileNo?.message} required>
                  <input
                    type="tel"
                    {...register("mobileNo")}
                    placeholder="Mobile Number"
                    className="w-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 text-neutral-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Year of Study" error={errors.year?.message} required>
                  <select
                    {...register("year")}
                    className="w-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 text-neutral-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999' strokeWidth='2'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "1rem",
                    }}
                  >
                    <option value="">Select Year</option>
                    <option value="FY">FY</option>
                    <option value="SY">SY</option>
                    <option value="TY">TY</option>
                    <option value="LY">LY</option>
                  </select>
                </FormField>
                <FormField label="Department" error={errors.department?.message} required>
                  <select
                    {...register("department")}
                    className="w-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 text-neutral-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999' strokeWidth='2'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "1rem",
                    }}
                  >
                    <option value="">Select Department</option>
                    <option value="Computer">Computer</option>
                    <option value="IT">IT</option>
                    <option value="AI & DS">AI & DS</option>
                    <option value="CSD">CSD</option>
                    <option value="ENTC">ENTC</option>
                    <option value="Other">Other</option>
                  </select>
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

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-neutral-200 to-neutral-500 text-neutral-900 font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(229,229,229,0.3)] disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}