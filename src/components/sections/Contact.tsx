"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/ui/SectionTitle";
import MagneticButton from "@/components/ui/MagneticButton";
import { personalInfo, socialLinks } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contact info animation
      const infoItems =
        contentRef.current?.querySelectorAll(".contact-info-item");
      gsap.from(infoItems!, {
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Form fields animation
      const formFields = formRef.current?.querySelectorAll(".form-field");
      gsap.from(formFields!, {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Quote animation
      gsap.from(quoteRef.current!, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted:", formData);
  };

  const getSocialIcon = (label: string) => {
    switch (label) {
      case "GitHub":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "LinkedIn":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      case "Twitter":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.3698a8.306 8.306 0 01-2.357.6461 4.118 4.118 0 001.804-2.27 8.221 8.221 0 01-2.606.9961 4.104 4.104 0 00-6.993 3.7427 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477 4.072 4.072 0 01-1.858-.5134v.0517a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.0702 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.843c7.547 0 11.675-6.253 11.675-11.675 0-.178-.004-.355-.012-.53a8.348 8.348 0 002.048-2.124z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32"
      style={{ background: "rgba(10, 10, 10, 0.75)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle title="Get In Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Left — Contact Info */}
          <div ref={contentRef} className="flex flex-col gap-8">
            <div className="contact-info-item flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-[#DC2626]/10">
                <svg
                  className="w-5 h-5 text-[#DC2626]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-[#E5E5E5] font-medium">Email</h4>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-[#E5E5E5]/60 hover:text-[#DC2626] transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="contact-info-item flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-[#DC2626]/10">
                <svg
                  className="w-5 h-5 text-[#DC2626]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-[#E5E5E5] font-medium">Phone</h4>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-[#E5E5E5]/60 hover:text-[#DC2626] transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            <div className="contact-info-item flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-[#DC2626]/10">
                <svg
                  className="w-5 h-5 text-[#DC2626]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-[#E5E5E5] font-medium">Location</h4>
                <p className="text-[#E5E5E5]/60">{personalInfo.location}</p>
              </div>
            </div>

            {/* Itachi quote */}
            <div ref={quoteRef} className="mt-6">
              <div className="relative pl-5 border-l-2 border-[#DC2626]/40">
                <p className="text-[#E5E5E5]/50 text-sm italic leading-relaxed">
                  &ldquo;Those who forgive themselves, and are able to accept
                  their true nature... They are the strong ones.&rdquo;
                </p>
                <p className="mt-2 text-[#DC2626]/50 text-xs uppercase tracking-wider">
                  — Itachi Uchiha
                </p>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="form-field">
              <label
                htmlFor="name"
                className="block text-[#E5E5E5]/70 text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg text-[#E5E5E5] placeholder-[#E5E5E5]/30 border border-[#E5E5E5]/10 focus:border-[#DC2626] focus:outline-none focus:ring-1 focus:ring-[#DC2626]/50 transition-colors duration-300"
                style={{ background: "#1A1A2E" }}
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label
                htmlFor="email"
                className="block text-[#E5E5E5]/70 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg text-[#E5E5E5] placeholder-[#E5E5E5]/30 border border-[#E5E5E5]/10 focus:border-[#DC2626] focus:outline-none focus:ring-1 focus:ring-[#DC2626]/50 transition-colors duration-300"
                style={{ background: "#1A1A2E" }}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-field">
              <label
                htmlFor="message"
                className="block text-[#E5E5E5]/70 text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg text-[#E5E5E5] placeholder-[#E5E5E5]/30 border border-[#E5E5E5]/10 focus:border-[#DC2626] focus:outline-none focus:ring-1 focus:ring-[#DC2626]/50 transition-colors duration-300 resize-none"
                style={{ background: "#1A1A2E" }}
                placeholder="Your message..."
              />
            </div>

            <div className="form-field mt-2">
              <MagneticButton onClick={() => {}} variant="filled">
                Send Message
              </MagneticButton>
            </div>
          </form>
        </div>

        {/* Social links row */}
        <div className="mt-16 pt-8 border-t border-[#E5E5E5]/10 flex justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#E5E5E5]/10 flex items-center justify-center text-[#E5E5E5]/50 hover:text-[#DC2626] hover:border-[#DC2626]/50 transition-all duration-300"
              aria-label={link.label}
            >
              {getSocialIcon(link.label)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
