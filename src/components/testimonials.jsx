import React from 'react';

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-black text-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center pb-6 mb-4 md:p-10 md:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-semibold leading-none text-center text-white">
            What Teachers at KK WAGH Say
          </h1>
          <p className="text-gray-400 text-center mt-4 text-base sm:text-lg md:text-xl">
            Hear from our experienced faculty members about their suggestions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* First Testimonial */}
          <div className="flex flex-col items-center px-4 sm:px-6">
            <div className="w-20 sm:w-24 h-20 sm:h-24 mb-4 overflow-hidden rounded-full">
              <img 
                src="https://source.unsplash.com/100x100/?professor?1" 
                alt="Professor 1"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
              <p className="px-6 py-1 text-base sm:text-lg italic text-gray-300">
                "The dedication and innovation I see in our computer science department is remarkable. Our students are getting hands-on experience with cutting-edge technologies."
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg bg-fuchsia-600"></span>
            <p className="text-gray-300 text-base sm:text-lg">Dr. Rajesh Patil</p>
            <p className="text-gray-500 text-xs sm:text-sm">HOD, Computer Engineering</p>
          </div>

          {/* Second Testimonial */}
          <div className="flex flex-col items-center px-4 sm:px-6">
            <div className="w-20 sm:w-24 h-20 sm:h-24 mb-4 overflow-hidden rounded-full">
              <img 
                src="https://source.unsplash.com/100x100/?professor?2" 
                alt="Professor 2"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path fill="currentColor" d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path fill="currentColor" d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
              <p className="px-6 py-1 text-base sm:text-lg italic text-gray-300">
                "Our programming lab facilities and curriculum are designed to give students real-world experience. It's wonderful to see them excel in their projects."
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path fill="currentColor" d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                <path fill="currentColor" d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg bg-fuchsia-600"></span>
            <p className="text-gray-300 text-base sm:text-lg">Prof. Priya Sharma</p>
            <p className="text-gray-500 text-xs sm:text-sm">Associate Professor</p>
          </div>

          {/* Third Testimonial */}
          <div className="flex flex-col items-center px-4 sm:px-6">
            <div className="w-20 sm:w-24 h-20 sm:h-24 mb-4 overflow-hidden rounded-full">
              <img 
                src="https://source.unsplash.com/100x100/?professor?3" 
                alt="Professor 3"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path fill="currentColor" d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path fill="currentColor" d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
              <p className="px-6 py-1 text-base sm:text-lg italic text-gray-300">
                "The enthusiasm and creativity of our students in developing innovative solutions is inspiring. They're truly preparing for the industry."
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path fill="currentColor" d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                <path fill="currentColor" d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg bg-fuchsia-600"></span>
            <p className="text-gray-300 text-base sm:text-lg">Dr. Amit Deshmukh</p>
            <p className="text-gray-500 text-xs sm:text-sm">Professor, Data Science</p>
          </div>

          {/* Fourth Testimonial */}
          <div className="flex flex-col items-center px-4 sm:px-6">
            <div className="w-20 sm:w-24 h-20 sm:h-24 mb-4 overflow-hidden rounded-full">
              <img 
                src="https://source.unsplash.com/100x100/?professor?4" 
                alt="Professor 4"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path fill="currentColor" d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path fill="currentColor" d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
              <p className="px-6 py-1 text-base sm:text-lg italic text-gray-300">
                "Our focus on practical learning and industry collaboration has helped students develop strong technical foundations and problem-solving skills."
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 text-gray-400">
                <path fill="currentColor" d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                <path fill="currentColor" d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg bg-fuchsia-600"></span>
            <p className="text-gray-300 text-base sm:text-lg">Prof. Sunil Pawar</p>
            <p className="text-gray-500 text-xs sm:text-sm">Assistant Professor</p>
          </div>
        </div>
      </div>
    </section>
  );
}
