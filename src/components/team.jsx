import React from 'react';
import { Github, Linkedin } from "lucide-react";

export function Team() {
  const teamMembers = [
    {
      name: "Yash Aswale",
      role: "React Developer",
      github: "https://github.com/Yashaswale",
      linkedin: "https://www.linkedin.com/in/yash-aswale-591a69249",
    },
    {
      name: "Niraj Tupsundar",
      role: "Angular Developer",
      github: "https://github.com/Niraj-2803",
      linkedin: "https://www.linkedin.com/in/niraj-pawan-tupsundar-20540022a/",
    },
  ];

  return (
    <footer id="team" className="w-full bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Meet Our Team</h2>
          <div className="h-1 w-20 bg-neutral-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative rounded-xl p-5 text-center bg-neutral-900/40 backdrop-blur-md shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Colorful border on hover - uses before pseudo-element */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-clip-padding transition-colors duration-300 group-hover:border-transparent z-10" />
              
              {/* Animated gradient border background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0" />
              
              {/* Inner content background */}
              <div className="absolute inset-0.5 bg-neutral-900 rounded-lg z-10" />

              {/* Content */}
              <div className="relative z-20">
                <h3 className="font-semibold text-white text-xl">{member.name}</h3>
                <p className="text-neutral-400 text-sm mb-3">{member.role}</p>

                <div className="flex justify-center gap-4 mt-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-300 transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github size={20} strokeWidth={1.5} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-300 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin size={20} strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} Team Codex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}