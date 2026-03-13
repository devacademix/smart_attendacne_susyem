"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    id: "camera-capture",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="7" width="24" height="17" rx="3" stroke="#00D6FF" strokeWidth="1.5"/>
        <circle cx="14" cy="15.5" r="4.5" stroke="#0050FF" strokeWidth="1.5"/>
        <circle cx="14" cy="15.5" r="2" fill="#00D6FF" fillOpacity="0.5"/>
        <path d="M10 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#00D6FF" strokeWidth="1.5"/>
        <circle cx="22" cy="11" r="1" fill="#00D6FF"/>
      </svg>
    ),
    step: "01",
    title: "Multi-Camera Capture",
    desc: "High-resolution IR cameras capture facial data across multiple angles simultaneously, supporting up to 10 concurrent camera streams per deployment.",
  },
  {
    id: "face-detection",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 9V5a1 1 0 011-1h4M19 4h4a1 1 0 011 1v4M24 19v4a1 1 0 01-1 1h-4M9 24H5a1 1 0 01-1-1v-4" stroke="#00D6FF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="5" stroke="#0050FF" strokeWidth="1.5"/>
        <path d="M11 13c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="#00D6FF" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="1.5" fill="#00D6FF" fillOpacity="0.7"/>
      </svg>
    ),
    step: "02",
    title: "Face Detection & Alignment",
    desc: "YOLO-based real-time face detection with sub-50ms latency. Automatic alignment corrects for pose, lighting, and angle variations.",
  },
  {
    id: "neural-encoding",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="7" cy="7" r="2" stroke="#00D6FF" strokeWidth="1.5"/>
        <circle cx="21" cy="7" r="2" stroke="#00D6FF" strokeWidth="1.5"/>
        <circle cx="7" cy="21" r="2" stroke="#00D6FF" strokeWidth="1.5"/>
        <circle cx="21" cy="21" r="2" stroke="#00D6FF" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="3" stroke="#0050FF" strokeWidth="1.5"/>
        <path d="M9 7h5M14 7v5M19 7h-5M14 19v-5M9 21h5M19 21h-5M7 9v5M7 14v5M21 9v5M21 14v5" stroke="#00D6FF" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="1.5" fill="#00D6FF" fillOpacity="0.5"/>
      </svg>
    ),
    step: "03",
    title: "Neural Face Encoding",
    desc: "Deep CNN encoder transforms facial geometry into a 512-dimensional identity vector — unique, encrypted, and non-reversible.",
  },
  {
    id: "identity-match",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="4" stroke="#00D6FF" strokeWidth="1.5"/>
        <path d="M8 14l4 4 8-8" stroke="#0050FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 10h22" stroke="#00D6FF" strokeWidth="1" strokeOpacity="0.3"/>
      </svg>
    ),
    step: "04",
    title: "Identity Verification",
    desc: "Cosine similarity matching against encrypted vector database. Sub-100ms identity confirmation with configurable confidence thresholds.",
  },
  {
    id: "attendance",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="18" rx="3" stroke="#00D6FF" strokeWidth="1.5"/>
        <path d="M9 6V4M19 6V4" stroke="#00D6FF" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 11h20" stroke="#00D6FF" strokeWidth="1" strokeOpacity="0.4"/>
        <path d="M9 16h10M9 20h6" stroke="#00D6FF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    step: "05",
    title: "Attendance Confirmed",
    desc: "Instant timestamp-stamped attendance log with geo-tagging, conflict detection, and real-time dashboard updates across all tenants.",
  },
  {
    id: "analytics",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22V16M10 22V12M16 22V8M22 22V4" stroke="#00D6FF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 16c6-4 12 4 18-12" stroke="#0050FF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
      </svg>
    ),
    step: "06",
    title: "Analytics & Reporting",
    desc: "Advanced attendance analytics, trend detection, department-level dashboards, export to CSV/PDF, and automated report scheduling.",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="technology"
      style={{
        background: "#0A0A0C",
        padding: "140px 6vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,80,255,0.3), rgba(0,214,255,0.3), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,80,255,0.2), rgba(0,214,255,0.2), transparent)",
        }}
      />

      {/* Ambient */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,80,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "100px" }}
        >
          <div className="kicker" style={{ marginBottom: "16px" }}>
            AI Pipeline Architecture
          </div>
          <h2 className="heading-large gradient-text" style={{ marginBottom: "20px" }}>
            Six-stage authentication engine
          </h2>
          <p className="body-large" style={{ maxWidth: "560px", margin: "0 auto" }}>
            Every authentication flows through a precision-engineered pipeline
            optimized for speed, accuracy, and security.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="glass-card"
              style={{
                padding: "36px",
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "border-color 0.3s ease",
              }}
              id={`feature-${f.id}`}
            >
              {/* Hover glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at top left, rgba(0,80,255,0.08) 0%, transparent 60%)",
                  borderRadius: "inherit",
                  pointerEvents: "none",
                }}
              />

              {/* Step number */}
              <div
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  color: "rgba(0,214,255,0.3)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {f.step}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: "rgba(0,80,255,0.08)",
                  border: "1px solid rgba(0,80,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                {f.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.90)",
                  letterSpacing: "-0.01em",
                  marginBottom: "12px",
                }}
              >
                {f.title}
              </h3>

              {/* Description */}
              <p className="body-regular">{f.desc}</p>

              {/* Bottom connector */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "36px",
                  right: "36px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(0,80,255,0.3), transparent)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
