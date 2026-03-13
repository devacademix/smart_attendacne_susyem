"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    price: "$299",
    period: "/month",
    desc: "For small institutions and pilot programs",
    highlight: false,
    features: [
      "Up to 500 students/employees",
      "5 camera streams",
      "Real-time attendance dashboard",
      "Basic analytics & CSV export",
      "Email support",
      "99.5% uptime SLA",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$899",
    period: "/month",
    desc: "For growing universities and enterprise teams",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 5,000 students/employees",
      "25 camera streams",
      "Multi-department management",
      "Advanced analytics & reporting",
      "API access & webhooks",
      "Priority 24/7 support",
      "99.9% uptime SLA",
      "Custom integrations",
    ],
    cta: "Request Demo",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large institutions with complex requirements",
    highlight: false,
    features: [
      "Unlimited students/employees",
      "Unlimited camera streams",
      "Multi-tenant architecture",
      "White-label customization",
      "Dedicated infrastructure",
      "On-premise deployment option",
      "99.99% uptime SLA",
      "Dedicated success manager",
    ],
    cta: "Contact Sales",
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="pricing"
      style={{
        background: "#0A0A0C",
        padding: "140px 6vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Divider top */}
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

      {/* Ambient */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(0,80,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <div className="kicker" style={{ marginBottom: "16px" }}>
            Transparent Pricing
          </div>
          <h2 className="heading-large gradient-text" style={{ marginBottom: "20px" }}>
            Scale with confidence
          </h2>
          <p className="body-large" style={{ maxWidth: "480px", margin: "0 auto" }}>
            Simple, predictable pricing. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                borderRadius: "20px",
                padding: tier.highlight ? "2px" : "0",
                background: tier.highlight
                  ? "linear-gradient(135deg, #0050FF, #00D6FF)"
                  : "transparent",
                position: "relative",
              }}
              id={`pricing-${tier.id}`}
            >
              <div
                style={{
                  borderRadius: tier.highlight ? "18px" : "20px",
                  padding: "40px 36px",
                  background: tier.highlight ? "#050815" : "rgba(255,255,255,0.02)",
                  border: tier.highlight ? "none" : "1px solid rgba(255,255,255,0.07)",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Popular badge */}
                {tier.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "24px",
                      right: "24px",
                      background: "linear-gradient(135deg, #0050FF, #00D6FF)",
                      borderRadius: "20px",
                      padding: "4px 12px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "white",
                      textTransform: "uppercase",
                    }}
                  >
                    {tier.badge}
                  </div>
                )}

                {/* Glow if highlighted */}
                {tier.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-40px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(0,80,255,0.2) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                {/* Tier name */}
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: tier.highlight ? "#00D6FF" : "rgba(255,255,255,0.5)",
                    marginBottom: "20px",
                  }}
                >
                  {tier.name}
                </div>

                {/* Price */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(40px, 4vw, 56px)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      background: "linear-gradient(135deg, #fff, #00D6FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.4)",
                      fontWeight: 400,
                    }}
                  >
                    {tier.period}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "32px",
                    lineHeight: 1.5,
                  }}
                >
                  {tier.desc}
                </p>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={tier.highlight ? "btn-primary" : "btn-secondary"}
                  style={{ width: "100%", marginBottom: "32px" }}
                  id={`pricing-cta-${tier.id}`}
                >
                  {tier.cta}
                </motion.button>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.06)",
                    marginBottom: "24px",
                  }}
                />

                {/* Features */}
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.4,
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          marginTop: "2px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "rgba(0,214,255,0.12)",
                          border: "1px solid rgba(0,214,255,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-4" stroke="#00D6FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            textAlign: "center",
            marginTop: "48px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          All plans include a 30-day free trial. No credit card required. Enterprise pricing includes volume discounts.
        </motion.p>
      </div>
    </section>
  );
}
