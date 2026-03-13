"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const securityFeatures = [
  {
    title: "AES-256 Biometric Encryption",
    desc: "All facial embeddings are encrypted at rest and in transit using military-grade AES-256 encryption.",
    icon: "🔐",
  },
  {
    title: "Zero-Knowledge Architecture",
    desc: "Raw biometric data never leaves the device. Only encrypted vectors are transmitted to the cloud.",
    icon: "🛡️",
  },
  {
    title: "GDPR & PDPA Compliance",
    desc: "Full data sovereignty controls, consent management, and right-to-erasure compliance built in.",
    icon: "⚖️",
  },
  {
    title: "Multi-Tenant Isolation",
    desc: "Enterprise-grade data isolation between tenants. No shared infrastructure at the data layer.",
    icon: "🏛️",
  },
  {
    title: "Audit Trail & Logging",
    desc: "Immutable audit logs for every authentication event with tamper-proof timestamping.",
    icon: "📋",
  },
  {
    title: "Liveness Detection",
    desc: "AI-powered anti-spoofing with 3D depth mapping detects photos, videos, and masks with 99.9% accuracy.",
    icon: "👁️",
  },
];

export default function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="security"
      style={{
        background: "#050505",
        padding: "140px 6vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        className="grid-bg"
        style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,214,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="security-grid"
        >
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="kicker" style={{ marginBottom: "20px" }}>
              Enterprise Security
            </div>
            <h2 className="heading-large gradient-text" style={{ marginBottom: "28px" }}>
              Secure by design,{"\n"}trusted by enterprise
            </h2>
            <p className="body-large" style={{ marginBottom: "40px" }}>
              Every layer of our architecture is designed with a security-first
              mindset. From biometric encryption to zero-knowledge data flows,
              your institution&apos;s data is always protected.
            </p>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {["ISO 27001", "SOC 2 Type II", "GDPR Ready", "PDPA Compliant"].map(
                (badge) => (
                  <div
                    key={badge}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      background: "rgba(0,80,255,0.08)",
                      border: "1px solid rgba(0,80,255,0.2)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.7)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {badge}
                  </div>
                )
              )}
            </div>

            {/* Encryption viz */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                marginTop: "48px",
                padding: "24px",
                borderRadius: "12px",
                background: "rgba(0,80,255,0.06)",
                border: "1px solid rgba(0,80,255,0.12)",
                fontFamily: "'Courier New', monospace",
              }}
            >
              <div style={{ fontSize: "11px", color: "#00D6FF", marginBottom: "12px", letterSpacing: "0.1em" }}>
                // IDENTITY VECTOR — ENCRYPTED
              </div>
              {[
                "0x8F3A2C...D4E1 ◎ SHA-256",
                "0x1B7E9D...F0C3 ◎ AES-256",
                "0xC49A1E...8B72 ◎ ECDSA-P384",
              ].map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    padding: "4px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{line.split("◎")[0]}</span>
                  <span style={{ color: "rgba(0,214,255,0.5)" }}>◎ {line.split("◎")[1]}</span>
                </motion.div>
              ))}
              <div
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  color: "rgba(0,214,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#00D6FF",
                    display: "inline-block",
                    animation: "pulseGlow 2s infinite",
                  }}
                />
                Real-time encryption active
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Feature cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {securityFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.2 + i * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass-card"
                style={{ padding: "24px", borderRadius: "12px", cursor: "default" }}
              >
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>{f.icon}</div>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: "8px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .security-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
