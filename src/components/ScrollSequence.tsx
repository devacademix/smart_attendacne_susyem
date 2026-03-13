"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 240;

// Scroll storytelling sections with their scroll position triggers (0-1)
const sections = [
  {
    id: "hero",
    startScroll: 0,
    endScroll: 0.15,
    kicker: "AI Face Authentication",
    headline: "Attendance,\nautomated.",
    sub: "Next-generation biometric verification for institutions and enterprises worldwide.",
    align: "center",
    frameStart: 0,
    frameEnd: 35,
  },
  {
    id: "engineering",
    startScroll: 0.15,
    endScroll: 0.40,
    kicker: "Engineering Reveal",
    headline: "Built for\nprecision recognition",
    sub: "Advanced biometric scanning with multi-sensor detection. Neural AI processing converts faces into secure digital identity vectors — designed for speed, accuracy, and real-time authentication.",
    align: "left",
    frameStart: 35,
    frameEnd: 95,
  },
  {
    id: "ai-detection",
    startScroll: 0.40,
    endScroll: 0.65,
    kicker: "AI Detection Pipeline",
    headline: "Real-time AI\nrecognition",
    sub: null,
    bullets: [
      "Multi-camera intelligent detection",
      "Deep neural face encoding",
      "Secure identity matching",
      "Attendance verified instantly",
    ],
    align: "right",
    frameStart: 95,
    frameEnd: 160,
  },
  {
    id: "security",
    startScroll: 0.65,
    endScroll: 0.85,
    kicker: "Data & Security",
    headline: "Secure by\narchitecture",
    sub: "Encrypted identity storage protects biometric data. Scalable infrastructure supports thousands of simultaneous authentications. Built for institutions, enterprises, and secure environments.",
    align: "center",
    frameStart: 160,
    frameEnd: 210,
  },
  {
    id: "cta",
    startScroll: 0.85,
    endScroll: 1.0,
    kicker: "Ready to Transform",
    headline: "Authenticate instantly.\nTrack effortlessly.",
    sub: "AI-powered attendance built for the modern world.",
    align: "center",
    frameStart: 210,
    frameEnd: 240,
    showCTA: true,
  },
];

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 1920, h: 1080 });
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });

  // Canvas sizing
  useEffect(() => {
    const resize = () => {
      setCanvasSize({ w: window.innerWidth, h: window.innerHeight });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const drawFrame = useCallback(
    (frameIndex: number, images?: HTMLImageElement[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const imgs = images || imagesRef.current;
      const img = imgs[Math.min(frameIndex, imgs.length - 1)];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;

      // Clear
      ctx.clearRect(0, 0, cw, ch);

      // Draw image cover-fit
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = cw / ch;

      let drawW, drawH, drawX, drawY;
      if (imgAspect > canvasAspect) {
        drawH = ch;
        drawW = ch * imgAspect;
        drawX = (cw - drawW) / 2;
        drawY = 0;
      } else {
        drawW = cw;
        drawH = cw / imgAspect;
        drawX = 0;
        drawY = (ch - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    []
  );

  // Preload images
  useEffect(() => {
    let loadedItems = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${num}.png`;
      img.onload = () => {
        loadedItems++;
        setLoadProgress(Math.round((loadedItems / TOTAL_FRAMES) * 100));
        if (loadedItems === TOTAL_FRAMES) {
          setLoaded(true);
          // Draw first frame immediately
          drawFrame(0, images);
        }
      };
      img.onerror = () => {
        loadedItems++;
        setLoadProgress(Math.round((loadedItems / TOTAL_FRAMES) * 100));
        if (loadedItems === TOTAL_FRAMES) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [drawFrame]);

  // Determine active section based on either scroll or auto-play progress
  useEffect(() => {
    const unsubScroll = scrollYProgress.on("change", (val) => {
      if (!isAutoPlaying) {
        const idx = sections.findIndex(
          (s) => val >= s.startScroll && val < s.endScroll
        );
        setActiveSection(idx !== -1 ? idx : sections.length - 1);
      }
    });

    return () => unsubScroll();
  }, [scrollYProgress, isAutoPlaying]);

  // Handle active section during auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      const idx = sections.findIndex(
        (s) => autoPlayProgress >= s.startScroll && autoPlayProgress < s.endScroll
      );
      setActiveSection(idx !== -1 ? idx : sections.length - 1);
    }
  }, [autoPlayProgress, isAutoPlaying]);

  // Auto-play logic (Looping)
  useEffect(() => {
    if (!loaded || !isAutoPlaying) return;

    let startTime: number | null = null;
    const duration = 20000; // 20 seconds for full sequence

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      let progress = (timestamp - startTime) / duration;

      // Handle looping
      if (progress > 1) {
        startTime = timestamp;
        progress = 0;
      }

      setAutoPlayProgress(progress);
      const targetFrame = Math.floor(progress * (TOTAL_FRAMES - 1));
      drawFrame(targetFrame);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, isAutoPlaying, drawFrame]);

  // Pause auto-play on manual scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isAutoPlaying) {
        setIsAutoPlaying(false);
      }
    };
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isAutoPlaying]);

  // Scroll-driven frame update (only if NOT auto-playing)
  useEffect(() => {
    if (!loaded || isAutoPlaying) return;

    return scrollYProgress.on("change", (val) => {
      const targetFrame = Math.min(
        Math.floor(val * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      if (targetFrame === currentFrameRef.current) return;
      currentFrameRef.current = targetFrame;
      drawFrame(targetFrame);
    });
  }, [loaded, isAutoPlaying, scrollYProgress, drawFrame]);

  const sec = sections[activeSection] ?? sections[0];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "500vh",
        background: "#050505",
      }}
    >
      {/* Loading overlay */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "#050505",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            {/* Logo */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #0050FF, #00D6FF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(0,80,255,0.5)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14 14-6.268 14-14S25.732 4 18 4zm0 4a10 10 0 110 20 10 10 0 010-20zm0 3a7 7 0 100 14A7 7 0 0018 11zm0 3a4 4 0 110 8 4 4 0 010-8z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <circle cx="18" cy="18" r="3" fill="white" />
              </svg>
            </motion.div>

            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Initializing AI System
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: "200px",
                height: "2px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "1px",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #0050FF, #00D6FF)",
                  borderRadius: "1px",
                  width: `${loadProgress}%`,
                  transition: "width 0.2s ease",
                }}
              />
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.25)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {loadProgress}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky canvas + overlay */}
      <div className="canvas-sticky radial-bg" id="overview">
        {/* Holographic grid */}
        <div
          className="grid-bg"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.4,
            zIndex: 0,
          }}
        />

        {/* Radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5,5,5,0.7) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={canvasSize.w}
          height={canvasSize.h}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "block",
          }}
        />

        {/* Ambient glows */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,80,255,0.12) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              position: "absolute",
              width: "800px",
              height: "800px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,214,255,0.06) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Scroll progress indicator */}
        <ScrollProgressBar scrollYProgress={scrollYProgress} />

        {/* Section copy overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent:
              sec.align === "left"
                ? "flex-start"
                : sec.align === "right"
                ? "flex-end"
                : "center",
            padding: "0 6vw",
            pointerEvents: "none",
          }}
        >
          <AnimatePresence mode="wait">
            <SectionCopy key={sec.id} section={sec} />
          </AnimatePresence>
        </div>

        {/* Auto-play toggle or indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "30px",
              padding: "8px 16px",
              color: "white",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: isAutoPlaying ? "#00D6FF" : "rgba(255,255,255,0.2)",
                boxShadow: isAutoPlaying ? "0 0 10px #00D6FF" : "none",
              }}
            />
            {isAutoPlaying ? "Cinematic Mode" : "Manual Core"}
          </button>
        </div>

        {/* Mini scroll indicator at bottom */}
        <ScrollIndicator loaded={loaded} scrollYProgress={scrollYProgress} />

        {/* Section dots */}
        <SectionDots activeSection={activeSection} />
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScrollProgressBar({ scrollYProgress }: { scrollYProgress: any }) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #0050FF, #00D6FF)",
        scaleX,
        transformOrigin: "left",
        zIndex: 50,
      }}
    />
  );
}

function SectionCopy({ section }: { section: (typeof sections)[0] }) {
  const isCenter = section.align === "center";
  const isRight = section.align === "right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        maxWidth: isCenter ? "700px" : "460px",
        textAlign: isCenter ? "center" : isRight ? "right" : "left",
        pointerEvents: "auto",
        marginLeft: isRight ? "auto" : undefined,
        marginRight: isRight ? undefined : undefined,
        ...(section.id === "cta"
          ? {
              background: "rgba(5,5,12,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "48px 52px",
            }
          : {}),
      }}
    >
      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="kicker"
        style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px", justifyContent: isCenter ? "center" : isRight ? "flex-end" : "flex-start" }}
      >
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "1px",
            background: "#00D6FF",
            flexShrink: 0,
          }}
        />
        {section.kicker}
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`heading-large gradient-text`}
        style={{
          marginBottom: "20px",
          whiteSpace: "pre-line",
        }}
      >
        {section.headline}
      </motion.h2>

      {/* Sub copy */}
      {section.sub && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="body-large"
          style={{ marginBottom: section.showCTA ? "32px" : 0 }}
        >
          {section.sub}
        </motion.p>
      )}

      {/* Bullet points */}
      {section.bullets && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "4px",
          }}
        >
          {section.bullets.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: isRight ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "16px",
                color: "rgba(255,255,255,0.75)",
                justifyContent: isRight ? "flex-end" : "flex-start",
              }}
            >
              {isRight && (
                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px" }}>
                  {b}
                </span>
              )}
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0050FF, #00D6FF)",
                  flexShrink: 0,
                  boxShadow: "0 0 8px rgba(0,214,255,0.6)",
                }}
              />
              {!isRight && (
                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px" }}>
                  {b}
                </span>
              )}
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* CTA Buttons */}
      {section.showCTA && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            id="hero-demo-btn"
            style={{ fontSize: "14px", padding: "14px 36px" }}
          >
            Request Demo
          </motion.button>
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            id="explore-platform-btn"
            style={{ fontSize: "14px", padding: "14px 36px" }}
          >
            Explore Platform
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

function ScrollIndicator({
  loaded,
  scrollYProgress,
}: {
  loaded: boolean;
  scrollYProgress: any;
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    return scrollYProgress.on("change", (v: number) => setShow(v < 0.05));
  }, [scrollYProgress]);

  if (!loaded) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            bottom: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: "24px",
              height: "36px",
              borderRadius: "12px",
              border: "1.5px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "6px",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "8px",
                borderRadius: "2px",
                background: "linear-gradient(180deg, #0050FF, #00D6FF)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionDots({ activeSection }: { activeSection: number }) {
  return (
    <div
      style={{
        position: "absolute",
        right: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        pointerEvents: "none",
      }}
    >
      {sections.map((s, i) => (
        <motion.div
          key={s.id}
          animate={{
            height: i === activeSection ? "28px" : "6px",
            opacity: i === activeSection ? 1 : 0.3,
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: "2px",
            borderRadius: "2px",
            background:
              i === activeSection
                ? "linear-gradient(180deg, #0050FF, #00D6FF)"
                : "rgba(255,255,255,0.4)",
          }}
        />
      ))}
    </div>
  );
}
