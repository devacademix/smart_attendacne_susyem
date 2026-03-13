"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "80px 6vw 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,80,255,0.4), rgba(0,214,255,0.4), transparent)",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "60px",
            marginBottom: "80px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #0050FF, #00D6FF)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(0,80,255,0.3)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C5.582 2 2 5.582 2 10s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 2a6 6 0 110 12A6 6 0 0110 4zm0 2a4 4 0 110 8 4 4 0 010-8z" fill="white" fillOpacity="0.9"/>
                  <circle cx="10" cy="10" r="2" fill="white"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>
                  AI Auth System
                </div>
                <div style={{ fontSize: "10px", color: "#00D6FF", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Face Intelligence
                </div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: "280px", marginBottom: "24px" }}>
              Next-generation AI-powered face authentication and automated attendance for the modern institution.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {["X", "in", "gh", "yt"].map((s) => (
                <div
                  key={s}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Links columns */}
          {[
            {
              title: "Product",
              links: ["Overview", "Technology", "AI Recognition", "Security", "Platform", "Changelog"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Blog", "Press Kit", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security Policy"],
            },
          ].map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "20px",
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>
            © 2026 AI Auth System. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.25)")}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
