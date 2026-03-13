"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "99.97", suffix: "%", label: "Recognition Accuracy", desc: "Industry-leading biometric precision" },
  { value: "<150", suffix: "ms", label: "Authentication Speed", desc: "Real-time verification latency" },
  { value: "50K+", suffix: "", label: "Daily Authentications", desc: "Enterprise-grade throughput" },
  { value: "256", suffix: "-bit", label: "AES Encryption", desc: "Military-grade data protection" },
];

function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isNumeric = !value.startsWith("<") && !value.includes("+") && !value.includes("K");

  return (
    <span ref={ref} style={{ display: "inline-flex", alignItems: "baseline", gap: "2px" }}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: "clamp(40px, 5vw, 64px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #ffffff 0%, #00D6FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </motion.span>
      {suffix && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 600,
            color: "#00D6FF",
            letterSpacing: "-0.01em",
          }}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="platform"
      style={{
        background: "#050505",
        padding: "140px 6vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(0,80,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <div className="kicker" style={{ marginBottom: "16px" }}>
            Performance Benchmarks
          </div>
          <h2 className="heading-large gradient-text">
            Numbers that define excellence
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2px",
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-card"
              style={{
                padding: "48px 40px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "all 0.4s ease",
              }}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.05)",
                scale: 1.01,
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(0,80,255,0.5), rgba(0,214,255,0.5), transparent)",
                }}
              />

              {/* Shimmer overlay */}
              <div className="shimmer" style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none" }} />

              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  marginTop: "12px",
                  marginBottom: "8px",
                  letterSpacing: "-0.01em",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.40)",
                  lineHeight: 1.5,
                }}
              >
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
