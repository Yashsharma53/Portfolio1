"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import MagneticButton from "@/components/ui/MagneticButton";
import { personalInfo, socialLinks } from "@/data/portfolio";

const contactItems = [
  {
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: personalInfo.location,
    href: null,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+91 7701808288",
    href: "https://wa.me/917701808288",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "10px",
  background: "rgba(26, 26, 46, 0.85)",
  border: "1px solid rgba(220, 38, 38, 0.15)",
  color: "#E5E5E5",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "rgba(229, 229, 229, 0.5)",
  marginBottom: "8px",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(220, 38, 38, 0.1)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.15)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      style={{ background: "transparent", paddingTop: "1rem", paddingBottom: "6rem" }}
    >
      <div className="section-container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1.25rem, 3vw, 3rem)" }}>
        <SectionTitle title="Get In Touch" />

        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(1.5rem, 3vw, 3rem)", marginTop: "1rem" }}>
          {/* Left — Contact Info */}
          <div>
            {/* Intro text */}
            <p style={{
              fontSize: "1rem",
              lineHeight: "1.8",
              color: "rgba(229, 229, 229, 0.6)",
              marginBottom: "2.5rem",
            }}>
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
              Feel free to reach out through any of the channels below.
            </p>

            {/* Contact items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="amaterasu-hover"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    background: "rgba(26, 26, 46, 0.85)",
                    border: "1px solid rgba(220, 38, 38, 0.12)",
                    transition: "border-color 0.3s ease, transform 0.3s ease",
                    position: "relative",
                    cursor: item.href ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.35)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.12)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                  onClick={() => { if (item.href) window.open(item.href, item.href.startsWith("mailto") || item.href.startsWith("tel") ? "_self" : "_blank"); }}
                >
                  {/* Icon */}
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(220, 38, 38, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#DC2626",
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>

                  <div>
                    <div style={{
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(229, 229, 229, 0.4)",
                      marginBottom: "2px",
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: "0.9rem",
                      color: "#E5E5E5",
                      fontWeight: "500",
                    }}>
                      {item.value}
                    </div>
                  </div>

                  {/* Arrow for clickable items */}
                  {item.href && (
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(220,38,38,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ marginLeft: "auto", flexShrink: 0 }}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ marginTop: "2rem" }}>
              <div style={{
                fontSize: "0.7rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(229, 229, 229, 0.35)",
                marginBottom: "12px",
              }}>
                Connect
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
                {/* Email icon */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    background: "rgba(26, 26, 46, 0.85)",
                    border: "1px solid rgba(220, 38, 38, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(229, 229, 229, 0.5)",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#DC2626";
                    e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.4)";
                    e.currentTarget.style.background = "rgba(220, 38, 38, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(229, 229, 229, 0.5)";
                    e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.12)";
                    e.currentTarget.style.background = "rgba(26, 26, 46, 0.85)";
                  }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>

                {/* Social links */}
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "rgba(26, 26, 46, 0.85)",
                      border: "1px solid rgba(220, 38, 38, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(229, 229, 229, 0.5)",
                      transition: "all 0.3s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#DC2626";
                      e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.4)";
                      e.currentTarget.style.background = "rgba(220, 38, 38, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(229, 229, 229, 0.5)";
                      e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.12)";
                      e.currentTarget.style.background = "rgba(26, 26, 46, 0.85)";
                    }}
                  >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      {link.label === "GitHub" && <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />}
                      {link.label === "LinkedIn" && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
                      {link.label === "WhatsApp" && <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div
            className="amaterasu-hover"
            style={{
              background: "rgba(26, 26, 46, 0.85)",
              borderRadius: "16px",
              border: "1px solid rgba(220, 38, 38, 0.15)",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(to right, #DC2626, #991B1B, transparent)",
            }} />

            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#E5E5E5",
              marginBottom: "0.5rem",
            }}>
              Send a Message
            </h3>
            <p style={{
              fontSize: "0.85rem",
              color: "rgba(229, 229, 229, 0.45)",
              marginBottom: "2rem",
            }}>
              Fill out the form below and I&apos;ll get back to you soon.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle} htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  rows={5}
                  placeholder="Your message..."
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <MagneticButton onClick={() => {}} variant="filled" className="hero-btn">
                  Send Message
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
