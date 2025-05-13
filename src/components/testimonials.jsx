import React from 'react';

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-black text-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center pb-6 mb-4 md:p-10 md:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold leading-none text-center text-white">
            What Teachers at K.K.Wagh Say
          </h1>
          <p className="text-gray-400 text-center mt-4 text-base sm:text-lg md:text-xl">
            Hear from our experienced faculty members about their suggestions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* First Testimonial */}
          <div className="flex flex-col items-center px-4 sm:px-6">
            <div className="relative text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
              <p className="px-6 py-1 text-base sm:text-lg italic text-gray-300">
                "As a tech industry expert, I recommend Codex for its practical approach to coding mastery. Students who engage with this platform consistently demonstrate stronger problem-solving skills and technical confidence."
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg bg-fuchsia-600"></span>
            <p className="text-gray-300 text-base sm:text-lg">Prof. Dr. S.M. Kamlapur</p>
            <p className="text-gray-500 text-xs sm:text-sm">Head of Department</p>
          </div>

          {/* Second Testimonial */}
          <div className="flex flex-col items-center px-4 sm:px-6">
            <div className="relative text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path fill="currentColor" d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path fill="currentColor" d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
              <p className="px-6 py-1 text-base sm:text-lg italic text-gray-300">
                "As a professional, I recommend Codex who want a hands-on approach that makes coding easier to understand. It's an excellent platform for building strong coding skills and getting industry-ready."
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path fill="currentColor" d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                <path fill="currentColor" d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg bg-fuchsia-600"></span>
            <p className="text-gray-300 text-base sm:text-lg">Prof. Shweta Jadhav</p>
            <p className="text-gray-500 text-xs sm:text-sm">Mentor for Codex</p>
          </div>
        </div>
      </div>
    </section>
  );
}