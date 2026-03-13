"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Technology", href: "#technology" },
  { label: "AI Recognition", href: "#ai-recognition" },
  { label: "Security", href: "#security" },
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          background: scrolled
            ? "rgba(5,5,5,0.80)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 40px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          {/* Logo */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              flexShrink: 0,
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Logo icon */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #0050FF 0%, #00D6FF 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 0 16px rgba(0,80,255,0.4)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 2C5.134 2 2 5.134 2 9s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2a5 5 0 110 10A5 5 0 019 4zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <circle cx="9" cy="9" r="1.5" fill="white" />
                <path d="M9 3v1.5M9 13.5V15M3 9h1.5M13.5 9H15" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.95)",
                  lineHeight: 1,
                }}
              >
                AI Auth System
              </div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "500",
                  letterSpacing: "0.15em",
                  color: "#00D6FF",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Face Intelligence
              </div>
            </div>
          </motion.div>

          {/* Center Nav Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
              flex: 1,
              justifyContent: "center",
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
            <motion.button
              className="btn-primary hidden md:block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              id="navbar-demo-btn"
            >
              Request Demo
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "8px",
                cursor: "pointer",
                color: "white",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {mobileOpen ? (
                  <path d="M4 4L16 16M16 4L4 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M3 5h14M3 10h14M3 15h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(5,5,12,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 40px 30px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link"
                  onClick={() => setMobileOpen(false)}
                  style={{ fontSize: "16px" }}
                >
                  {link.label}
                </a>
              ))}
              <button className="btn-primary" style={{ marginTop: "8px" }}>
                Request Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
