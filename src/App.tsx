import { useState, useEffect, useRef, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import { TREATMENTS, getTreatmentBySlug } from "./treatmentsData";

// ─── Colour tokens ──────────────────────────────────────────────────────────
const C = {
  ivory: "#F4F0E8",
  cream: "#EAE2D5",
  espresso: "#28231F",
  terracotta: "#B9684B",
  rose: "#C99B8D",
  sage: "#849081",
  warmGrey: "#6F6861",
  border: "rgba(40,35,31,0.15)",
  white: "#FFFFFF",
};

// ─── Images ─────────────────────────────────────────────────────────────────
const IMG = {
  logo: new URL("./logonormal.jpg", import.meta.url).href,
  beforeAfter: new URL("./beforeafterimage.png", import.meta.url).href,
  hero: new URL("../smile1hero.jpg", import.meta.url).href,
  smile1: new URL("./beforeafterimage.png", import.meta.url).href,
  smile2: new URL("./beforeafterimage.png", import.meta.url).href,
  smile3:
    "https://images.unsplash.com/photo-1786641982481-9acdde44bbb2?w=800&h=1000&fit=crop&auto=format",
  clinic1:
    "https://images.unsplash.com/photo-1560087542-435cccba352e?w=1200&h=800&fit=crop&auto=format",
  clinic2:
    "https://images.unsplash.com/photo-1642844613096-7b743b7d9915?w=800&h=1000&fit=crop&auto=format",
  clinic3:
    "https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?w=800&h=1000&fit=crop&auto=format",
  doctor: new URL("../drVishal.jpg", import.meta.url).href,
  teeth1:
    "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?w=800&h=600&fit=crop&auto=format",
  teeth2:
    "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?w=800&h=600&fit=crop&auto=format",
  beauty:
    "https://images.unsplash.com/photo-1786520995821-d0e25d09c2f3?w=800&h=1000&fit=crop&auto=format",
  waiting:
    "https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?w=800&h=1000&fit=crop&auto=format",
};

// ─── Reveal hook ─────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Header({
  scrolled,
  hidden,
  onBooking,
}: {
  scrolled: boolean;
  hidden: boolean;
  onBooking: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Treatments", href: "/#treatments", hasMega: true },
    { label: "Our Team", href: "/#team" },
    { label: "Patient Stories", href: "/#testimonials" },
    { label: "Journal", href: "/#journal" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 w-full px-4 pt-4 transition-all duration-500 lg:px-8"
        style={{
          transform: hidden ? "translateY(-150%)" : "translateY(0)",
          opacity: hidden ? 0 : 1,
        }}
      >
        <div className="mx-auto max-w-[1280px] rounded-[28px] border border-[rgba(40,35,31,0.08)] bg-white/95 px-5 shadow-[0_12px_30px_rgba(40,35,31,0.08)] backdrop-blur-sm lg:px-6">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3"
              style={{ textDecoration: "none" }}
            >
              <img
                src={IMG.logo}
                alt="Serene Dentistry logo"
                style={{
                  width: 190,
                  height: 58,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.hasMega && setTreatmentsOpen(true)}
                  onMouseLeave={() => link.hasMega && setTreatmentsOpen(false)}
                >
                  <a
                    href={link.href}
                    className="relative pb-0.5 text-sm font-medium tracking-wide transition-colors duration-200"
                    style={{
                      color: C.espresso,
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: 13,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-px bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 w-full" />
                  </a>
                  {link.hasMega && treatmentsOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[min(880px,92vw)]"
                      style={{ marginTop: -1 }}
                    >
                      <div
                        className="rounded-2xl shadow-2xl p-8 grid grid-cols-4 gap-x-6 gap-y-8"
                        style={{
                          background: C.ivory,
                          border: `1px solid ${C.border}`,
                        }}
                      >
                        {TREATMENTS.map((cat) => (
                          <div key={cat.slug}>
                            <Link
                              to={`/treatments/${cat.slug}`}
                              style={{
                                display: "block",
                                fontFamily: "var(--font-body)",
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: C.terracotta,
                                marginBottom: 12,
                                textDecoration: "none",
                              }}
                            >
                              {cat.title}
                            </Link>
                            {cat.features.map((item) => (
                              <Link
                                key={item}
                                to={`/treatments/${cat.slug}`}
                                style={{
                                  display: "block",
                                  fontFamily: "var(--font-body)",
                                  fontSize: 13,
                                  color: C.espresso,
                                  marginBottom: 8,
                                  textDecoration: "none",
                                  transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.color = C.terracotta)
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.color = C.espresso)
                                }
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden items-center gap-4 lg:flex">
              <a
                href="tel:+918971919743"
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: "transparent",
                  color: C.terracotta,
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.02em",
                  border: `1.5px solid ${C.terracotta}`,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.terracotta;
                  e.currentTarget.style.color = C.white;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = C.terracotta;
                }}
              >
                Call Us
              </a>
              <button
                onClick={onBooking}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: C.terracotta,
                  color: C.white,
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.02em",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#a05a3e")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = C.terracotta)
                }
              >
                Book Appointment
              </button>
            </div>

            {/* Hamburger */}
            <button
              className="p-2 lg:hidden"
              onClick={() => setMenuOpen(true)}
              style={{ color: C.espresso }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: C.cream }}
        >
          <div
            className="flex items-center justify-between px-6 h-16 border-b"
            style={{ borderColor: C.border }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 600,
                color: C.espresso,
              }}
            >
              Serene Dentistry
            </span>
            <button onClick={() => setMenuOpen(false)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.espresso}
                strokeWidth="1.5"
              >
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-8 py-10 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 400,
                  color: C.espresso,
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="px-8 py-8 border-t" style={{ borderColor: C.border }}>
            <button
              onClick={() => {
                setMenuOpen(false);
                onBooking();
              }}
              className="w-full py-4 rounded-full text-base font-semibold"
              style={{
                background: C.terracotta,
                color: C.white,
                fontFamily: "var(--font-body)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Book an Appointment
            </button>
            <a
              href="tel:+918971919743"
              className="block text-center mt-4 text-sm"
              style={{ color: C.warmGrey, textDecoration: "none" }}
            >
              +91-8971919743
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function Hero({ onBooking }: { onBooking: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end pb-20 lg:pb-28"
      style={{ background: "#1a1510" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt="A woman with a radiant smile"
          className="w-full h-full object-cover opacity-85"
          style={{ objectPosition: "center 38%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,21,16,0.12) 0%, rgba(26,21,16,0.3) 60%, rgba(26,21,16,0.62) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-12" style={{ background: C.rose }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.rose,
              }}
            >
              Serene Dentistry
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 400,
              color: C.white,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 28,
            }}
          >
            Exceptional dentistry,
            <br />
            <em style={{ fontStyle: "italic", color: C.rose }}>
              designed around you.
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.75,
              maxWidth: 520,
              marginBottom: 40,
            }}
          >
            Personalised dental care combining advanced technology, thoughtful
            treatment and a beautifully calm experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onBooking}
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300"
              style={{
                background: C.terracotta,
                color: C.white,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.02em",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#a05a3e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = C.terracotta)
              }
            >
              Book an Appointment
            </button>
            <a
              href="#treatments"
              className="px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: C.white,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                backdropFilter: "blur(8px)",
              }}
            >
              Explore Treatments
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.5 }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.white,
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, white, transparent)",
          }}
        />
      </div>

      {/* Curve */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ height: 52 }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M0 80 C360 0 1080 0 1440 80 L1440 80 L0 80 Z"
            fill={C.ivory}
          />
        </svg>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useReveal();
  return (
    <section
      id="about"
      className="py-24 lg:py-36"
      style={{ background: C.ivory }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className="reveal grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: C.terracotta }} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.terracotta,
                }}
              >
                Our Philosophy
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(38px, 5vw, 64px)",
                fontWeight: 400,
                color: C.espresso,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Dental care should feel personal, considered and{" "}
              <em style={{ fontStyle: "italic", color: C.terracotta }}>
                completely comfortable.
              </em>
            </h2>

            {/* Decorative line */}
            <div
              className="mt-10 mb-10"
              style={{ height: 1, background: C.border }}
            />

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.85,
                color: C.warmGrey,
                maxWidth: 500,
              }}
            >
              At Serene Dentistry, we believe exceptional dentistry goes far
              beyond clinical excellence. Every visit is thoughtfully designed —
              from your first consultation to long-term smile maintenance — to
              feel calm, unhurried and entirely personalised to you.
            </div>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#about"
                className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                style={{
                  color: C.terracotta,
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                }}
              >
                Our Story
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="img-zoom rounded-[32px] overflow-hidden aspect-[3/4]">
              <img
                src={new URL("./hall.jpg", import.meta.url).href}
                alt="Comfortable clinic waiting area"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TreatmentsSection() {
  const ref = useReveal();

  return (
    <section
      id="treatments"
      className="py-24 lg:py-36"
      style={{ background: C.cream }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div ref={ref} className="reveal mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: C.terracotta }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.terracotta,
              }}
            >
              Our Treatments
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4.5vw, 60px)",
              fontWeight: 400,
              color: C.espresso,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              maxWidth: 600,
            }}
          >
            Every smile tells a story. Let us help write yours.
          </h2>
        </div>

        <div>
          {TREATMENTS.map((cat, i) => (
            <TreatmentCard
              key={cat.slug}
              {...cat}
              isLast={i === TREATMENTS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Curve */}
      <div
        className="relative mt-24 lg:mt-36 overflow-hidden"
        style={{ height: 80 }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M0 0 C360 80 1080 80 1440 0 L1440 80 L0 80 Z"
            fill={C.ivory}
          />
        </svg>
      </div>
    </section>
  );
}

function TreatmentCard({
  slug,
  title,
  desc,
  img,
  tag,
  subtitle,
  features,
  isLast,
}: {
  slug: string;
  title: string;
  desc: string;
  img: string;
  tag: string;
  subtitle?: string;
  features?: string[];
  isLast?: boolean;
}) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className="reveal grid md:grid-cols-[minmax(0,340px)_1fr] gap-8 lg:gap-14 py-10 lg:py-12"
      style={{
        borderBottom: isLast ? "none" : `1px solid ${C.border}`,
      }}
    >
      <div
        className="img-zoom rounded-[24px] overflow-hidden aspect-[4/3] md:aspect-square cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
      </div>
      <div className="flex flex-col justify-center">
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 400,
            color: C.espresso,
            marginBottom: 12,
          }}
        >
          {tag}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 3.2vw, 44px)",
            fontWeight: 400,
            color: C.espresso,
            lineHeight: 1.1,
            marginBottom: subtitle ? 8 : 16,
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 600,
              color: C.terracotta,
              marginBottom: 16,
            }}
          >
            {subtitle}
          </div>
        )}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: C.warmGrey,
            lineHeight: 1.7,
            marginBottom: 20,
            maxWidth: 560,
          }}
        >
          {desc}
        </p>
        {features && (
          <ul
            className="mb-8 space-y-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: C.warmGrey,
              lineHeight: 1.5,
            }}
          >
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span aria-hidden="true" style={{ color: C.terracotta }}>
                  •
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <div>
          <Link
            to={`/treatments/${slug}`}
            className="inline-block px-7 py-3.5 rounded-full font-semibold transition-all duration-300"
            style={{
              background: C.terracotta,
              color: C.white,
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.02em",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a05a3e")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = C.terracotta)
            }
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function ClinicExperience() {
  const ref = useReveal();
  return (
    <section className="py-24 lg:py-36" style={{ background: C.cream }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className="reveal grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div className="img-zoom rounded-[32px] overflow-hidden aspect-[4/5]">
            <img
              src={new URL("../topview.jpg", import.meta.url).href}
              alt="Serene Dentistry interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: C.terracotta }} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.terracotta,
                }}
              >
                The Experience
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4.5vw, 58px)",
                fontWeight: 400,
                color: C.espresso,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              A sanctuary designed for your comfort
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: C.warmGrey,
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              From the moment you enter our studio, every detail has been
              considered — from the calming palette and natural materials to the
              seamless digital journey and personalised follow-up care.
            </p>
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: "◇",
                  title: "Personalised Treatment Planning",
                  desc: "Every care plan is built around your unique smile, lifestyle and goals.",
                },
                {
                  icon: "◈",
                  title: "Modern Digital Dentistry",
                  desc: "Intraoral scanning, digital imaging and smile design software for precise results.",
                },
                {
                  icon: "◉",
                  title: "Comfort-Led Patient Experience",
                  desc: "Warm consultations, gentle techniques and anxiety-free care at every visit.",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{
                    background: C.ivory,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <span
                    style={{
                      color: C.terracotta,
                      fontSize: 20,
                      lineHeight: 1,
                      marginTop: 2,
                    }}
                  >
                    {b.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: 15,
                        color: C.espresso,
                        marginBottom: 4,
                      }}
                    >
                      {b.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: C.warmGrey,
                        lineHeight: 1.65,
                      }}
                    >
                      {b.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
              style={{
                color: C.terracotta,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              Explore Our Clinic
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorSection() {
  const ref = useReveal();
  return (
    <section
      id="team"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: C.ivory }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className="reveal grid lg:grid-cols-5 gap-12 lg:gap-16 items-center"
        >
          <div className="lg:col-span-2 relative">
            <div className="img-zoom rounded-[32px] overflow-hidden aspect-[3/4]">
              <img
                src={IMG.doctor}
                alt="Dr. Vishal K, Lead Dentist"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
            <div
              className="absolute bottom-6 right-6 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(244,240,232,0.95)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: C.terracotta,
                }}
              >
                Lead Dentist
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  fontWeight: 500,
                  color: C.espresso,
                  marginTop: 2,
                }}
              >
                Dr. Vishal K
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: C.terracotta }} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.terracotta,
                }}
              >
                Meet the Dentist
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4.5vw, 60px)",
                fontWeight: 400,
                color: C.espresso,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              Dr. Vishal K
            </h2>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: C.warmGrey,
                marginBottom: 24,
              }}
            >
              BDS, MDS
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: C.warmGrey,
                lineHeight: 1.85,
                marginBottom: 20,
              }}
            >
              Dr. Vishal K is the founder of Serene Dentistry, with a simple
              belief that every patient deserves unhurried attention,
              compassionate care, and clinical precision in equal measure.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: C.warmGrey,
                lineHeight: 1.85,
                marginBottom: 32,
              }}
            >
              "I want every person who walks through our door to leave with
              confidence — not just in their smile, but in themselves."
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "Cosmetic Dentistry",
                "Dental Implants",
                "Clear Aligners",
                "Smile Design",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: C.cream,
                    border: `1px solid ${C.border}`,
                    color: C.espresso,
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="#team"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{
                color: C.terracotta,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              Full Profile
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-24 grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="relative lg:col-span-2">
            <div className="img-zoom aspect-[3/4] overflow-hidden rounded-[32px]">
              <img
                src={new URL("../drSachin.jpg", import.meta.url).href}
                alt="Dr. Sachin K, Dentist"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
            <div
              className="absolute bottom-6 right-6 rounded-xl px-4 py-3"
              style={{
                background: "rgba(244,240,232,0.95)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  color: C.terracotta,
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Dentist
              </div>
              <div
                style={{
                  color: C.espresso,
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                Dr. Sachin K
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: C.terracotta }} />
              <span
                style={{
                  color: C.terracotta,
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Meet the Dentist
              </span>
            </div>
            <h2
              style={{
                color: C.espresso,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4.5vw, 60px)",
                fontWeight: 400,
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              Dr. Sachin K
            </h2>
            <div
              style={{
                color: C.warmGrey,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                marginBottom: 24,
              }}
            >
              BDS, MDS
            </div>
            <p
              style={{
                color: C.warmGrey,
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.85,
                marginBottom: 32,
              }}
            >
              Dedicated to thoughtful, precise dental care and a comfortable
              experience for every Serene Dentistry patient.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechnologySection() {
  const ref = useReveal();
  const features = [
    {
      title: "Digital Smile Design",
      desc: "Visualise your new smile before treatment begins, with precision digital planning.",
    },
    {
      title: "Intraoral Scanning",
      desc: "No messy impressions — our 3D scanner creates precise digital models in minutes.",
    },
    {
      title: "Modern Imaging",
      desc: "Low-dose digital X-rays and panoramic scans for accurate, safe diagnostics.",
    },
    {
      title: "Sterilisation Standards",
      desc: "Hospital-grade sterilisation protocols and single-use instruments for your safety.",
    },
    {
      title: "Pain-Minimising Techniques",
      desc: "Advanced anaesthetic delivery and sedation options for a truly comfortable experience.",
    },
    {
      title: "Private Treatment Rooms",
      desc: "Dedicated, serene treatment suites designed to put you completely at ease.",
    },
  ];

  return (
    <section className="py-24 lg:py-36" style={{ background: C.espresso }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div ref={ref} className="reveal mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: C.rose }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.rose,
              }}
            >
              Technology & Comfort
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4.5vw, 60px)",
              fontWeight: 400,
              color: C.white,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 620,
            }}
          >
            Advanced technology. Calm, unhurried care.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="p-7 rounded-[20px]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 38,
                  fontWeight: 300,
                  color: C.rose,
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 500,
                  color: C.white,
                  marginBottom: 10,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pos = Math.min(Math.max(((clientX - left) / width) * 100, 5), 95);
    setSliderPos(pos);
  }, []);

  const revRef = useReveal();

  return (
    <section className="py-24 lg:py-36" style={{ background: C.ivory }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div ref={revRef} className="reveal mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: C.terracotta }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.terracotta,
              }}
            >
              Smile Gallery
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4.5vw, 60px)",
              fontWeight: 400,
              color: C.espresso,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Real results, real smiles
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Slider */}
          <div>
            <div
              ref={containerRef}
              className="relative rounded-[24px] overflow-hidden aspect-[4/3] cursor-ew-resize select-none"
              onMouseDown={(e) => {
                isDragging.current = true;
                updateSlider(e.clientX);
              }}
              onMouseMove={(e) => {
                if (isDragging.current) updateSlider(e.clientX);
              }}
              onMouseUp={() => {
                isDragging.current = false;
              }}
              onMouseLeave={() => {
                isDragging.current = false;
              }}
              onTouchStart={(e) => updateSlider(e.touches[0].clientX)}
              onTouchMove={(e) => updateSlider(e.touches[0].clientX)}
            >
              {/* After */}
              <img
                src={IMG.smile1}
                alt="After treatment"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Before */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={IMG.smile2}
                  alt="Before treatment"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "saturate(0.6) brightness(0.9)" }}
                />
              </div>
              {/* Handle */}
              <div
                className="absolute top-0 bottom-0 flex items-center justify-center"
                style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
              >
                <div
                  style={{
                    width: 2,
                    height: "100%",
                    background: "rgba(255,255,255,0.7)",
                    position: "absolute",
                  }}
                />
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: C.white,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    zIndex: 10,
                    position: "relative",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M6 9H2M6 9L4 7M6 9L4 11M12 9H16M12 9L14 7M12 9L14 11"
                      stroke={C.espresso}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {/* Labels */}
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(40,35,31,0.7)",
                  color: C.white,
                  fontFamily: "var(--font-body)",
                }}
              >
                Before
              </div>
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(185,104,75,0.9)",
                  color: C.white,
                  fontFamily: "var(--font-body)",
                }}
              >
                After
              </div>
            </div>
            <p
              className="mt-3 text-xs"
              style={{
                fontFamily: "var(--font-body)",
                color: C.warmGrey,
                opacity: 0.7,
              }}
            >
              *Individual results may vary. Images are for illustrative
              purposes.
            </p>
          </div>

          {/* Cases */}
          <div className="flex flex-col gap-4">
            {[
              {
                treatment: "Smile Makeover",
                name: "Priya M.",
                result:
                  "Complete transformation with veneers and whitening in just 3 visits.",
              },
              {
                treatment: "Clear Aligners",
                name: "Rohan T.",
                result:
                  "Perfectly straightened teeth without braces in 9 months.",
              },
              {
                treatment: "Dental Implants",
                name: "Meena K.",
                result:
                  "A permanent, natural-feeling replacement that changed her confidence entirely.",
              },
            ].map((c) => (
              <div
                key={c.name}
                className="p-5 rounded-2xl flex items-start gap-4"
                style={{ background: C.cream, border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-10 h-10 rounded-full flex-none flex items-center justify-center"
                  style={{ background: C.terracotta }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      fontWeight: 400,
                      color: C.white,
                    }}
                  >
                    {c.name[0]}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.terracotta,
                      }}
                    >
                      {c.treatment}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: C.warmGrey,
                      }}
                    >
                      · {c.name}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: C.espresso,
                      lineHeight: 1.65,
                    }}
                  >
                    {c.result}
                  </p>
                </div>
              </div>
            ))}
            <a
              href="#gallery"
              className="flex items-center gap-2 text-sm font-semibold mt-2"
              style={{
                color: C.terracotta,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              View Full Smile Gallery
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClinicGallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryPaused = useRef(false);
  const galleryImages = [
    {
      src: new URL("../0F8A8522.jpg", import.meta.url).href,
      alt: "Advanced dental imaging equipment at Serene Dentistry",
      label: "Advanced technology",
    },
    {
      src: new URL("../0F8A8520.jpg", import.meta.url).href,
      alt: "Dental imaging room at Serene Dentistry",
      label: "Care with precision",
    },
    {
      src: new URL("../0F8A8518.jpg", import.meta.url).href,
      alt: "Bright dental treatment room at Serene Dentistry",
      label: "Bright, modern treatment rooms",
    },
    {
      src: new URL("../0F8A8508.jpg", import.meta.url).href,
      alt: "Modern dental chair and equipment at Serene Dentistry",
      label: "Designed around your comfort",
    },
    {
      src: new URL("../0F8A8507.jpg", import.meta.url).href,
      alt: "Dental equipment and treatment chair at Serene Dentistry",
      label: "Thoughtful treatment spaces",
    },
    {
      src: new URL("../0F8A8502.jpg", import.meta.url).href,
      alt: "Serene Dentistry treatment suite",
      label: "A calm environment for care",
    },
    {
      src: new URL("../0F8A8488.jpg", import.meta.url).href,
      alt: "Serene Dentistry reception and waiting area",
      label: "A warm welcome, every time",
    },
  ];

  useEffect(() => {
    let frameId = 0;

    const animateGallery = () => {
      const gallery = galleryRef.current;
      if (gallery && !galleryPaused.current) {
        gallery.scrollLeft += 0.55;
        if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
          gallery.scrollLeft -= gallery.scrollWidth / 2;
        }
      }
      frameId = requestAnimationFrame(animateGallery);
    };

    frameId = requestAnimationFrame(animateGallery);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section id="gallery" className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-10">
        <div>
          <span
            style={{
              color: "#009FA8",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Step into serenity
          </span>
          <h2
            className="mt-6"
            style={{
              color: C.espresso,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4.5vw, 58px)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            A beautiful space for better care
          </h2>
          <p
            className="mx-auto mt-6 max-w-[720px]"
            style={{
              color: C.warmGrey,
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            Every detail at Serene Dentistry has been considered to make your
            visit feel calm, personal, and genuinely comfortable.
          </p>
          <p
            className="mt-7"
            style={{
              color: C.terracotta,
              fontFamily: "var(--font-body)",
              fontSize: 12,
              letterSpacing: "0.08em",
            }}
          >
            Drag or swipe to explore the clinic
          </p>
        </div>
      </div>

      <div
        ref={galleryRef}
        className="gallery-scroll mt-16 overflow-x-auto px-6 pb-5 lg:mt-20 lg:px-10"
        onMouseEnter={() => {
          galleryPaused.current = true;
        }}
        onMouseLeave={() => {
          galleryPaused.current = false;
        }}
        onTouchStart={() => {
          galleryPaused.current = true;
        }}
        onTouchEnd={() => {
          galleryPaused.current = false;
        }}
      >
        <div className="flex w-max gap-6 snap-x snap-mandatory">
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="img-zoom group relative h-[360px] w-[min(78vw,520px)] snap-start overflow-hidden rounded-[24px] md:h-[430px] md:w-[min(56vw,620px)] lg:h-[470px] lg:w-[min(42vw,680px)]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent px-7 pb-7 pt-20 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span
                  className="text-sm text-white"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {image.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya M.",
      treatment: "Smile Makeover",
      quote:
        "I was terrified of dentists for years. Dr. Sharma changed everything — the whole team made me feel completely safe, and my smile has never looked better.",
      rating: 5,
      initials: "PM",
    },
    {
      name: "Rohan T.",
      treatment: "Clear Aligners",
      quote:
        "The clinic is absolutely beautiful, and the level of care is extraordinary. My aligners were perfectly planned and the results speak for themselves.",
      rating: 5,
      initials: "RT",
    },
    {
      name: "Sunita A.",
      treatment: "Dental Implants",
      quote:
        "After losing a tooth I felt very self-conscious. The implant looks and feels completely natural — I forget it isn't my own tooth!",
      rating: 5,
      initials: "SA",
    },
    {
      name: "Kabir D.",
      treatment: "Teeth Whitening",
      quote:
        "Exceptional, unhurried, brilliant. I've recommended Serene Dentistry to every friend and colleague. The results from my whitening treatment are stunning.",
      rating: 5,
      initials: "KD",
    },
    {
      name: "Meena K.",
      treatment: "Veneers",
      quote:
        "I finally have the smile I always dreamed of. The team were so patient in explaining every step and the veneers are flawlessly natural-looking.",
      rating: 5,
      initials: "MK",
    },
  ];

  const [current, setCurrent] = useState(0);
  const ref = useReveal();

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-36"
      style={{ background: C.cream }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div ref={ref} className="reveal mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: C.terracotta }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.terracotta,
              }}
            >
              Patient Stories
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4.5vw, 60px)",
              fontWeight: 400,
              color: C.espresso,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Words from our patients
          </h2>
        </div>

        <div
          className="relative rounded-[28px] p-8 lg:p-14 overflow-hidden"
          style={{ background: C.ivory, border: `1px solid ${C.border}` }}
        >
          {/* Big quote mark */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 180,
              lineHeight: 0.8,
              color: C.border,
              position: "absolute",
              top: 24,
              left: 32,
              pointerEvents: "none",
            }}
          >
            "
          </div>

          <div className="relative z-10">
            <div className="flex gap-1 mb-8">
              {Array(testimonials[current].rating)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill={C.terracotta}
                  >
                    <path d="M9 1l2.09 5.26H17l-4.54 3.29 1.73 5.33L9 12l-5.18 3.88 1.72-5.33L1 7.26h5.91z" />
                  </svg>
                ))}
            </div>
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.5vw, 30px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: C.espresso,
                lineHeight: 1.5,
                marginBottom: 32,
                maxWidth: 800,
              }}
            >
              "{testimonials[current].quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: C.terracotta }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: C.white,
                  }}
                >
                  {testimonials[current].initials}
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 15,
                    color: C.espresso,
                  }}
                >
                  {testimonials[current].name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: C.warmGrey,
                  }}
                >
                  {testimonials[current].treatment}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? C.terracotta : C.border,
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
            <div className="flex-1" />
            <button
              onClick={() =>
                setCurrent(
                  (c) => (c - 1 + testimonials.length) % testimonials.length,
                )
              }
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: C.cream,
                border: `1px solid ${C.border}`,
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8l4 4"
                  stroke={C.espresso}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: C.terracotta,
                border: "none",
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4l4 4-4 4"
                  stroke={C.white}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Google reviews link */}
        <div className="mt-6 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: C.warmGrey,
            }}
          >
            4.9 · Based on 200+ Google Reviews
          </span>
        </div>
      </div>
    </section>
  );
}

function PatientVideoSection() {
  const ref = useReveal();
  return (
    <section className="py-24 lg:py-36" style={{ background: C.ivory }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div ref={ref} className="reveal mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: C.terracotta }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.terracotta,
              }}
            >
              In Their Own Words
            </span>
            <div className="h-px w-8" style={{ background: C.terracotta }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4.5vw, 60px)",
              fontWeight: 400,
              color: C.espresso,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Hear From Our Patients
          </h2>
        </div>

        <div
          className="mx-auto max-w-[840px] overflow-hidden rounded-[28px]"
          style={{ border: `1px solid ${C.border}`, background: C.espresso }}
        >
          <video
            src={new URL("./patient1.mp4", import.meta.url).href}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full block"
            style={{ aspectRatio: "16 / 9" }}
          />
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useReveal();
  const steps = [
    {
      num: "01",
      title: "Consultation",
      desc: "A relaxed, unhurried conversation about your smile goals, concerns and medical history. No pressure, just listening.",
    },
    {
      num: "02",
      title: "Personalised Plan",
      desc: "We design a bespoke treatment plan around your unique needs, timeline and budget — with full digital preview.",
    },
    {
      num: "03",
      title: "Treatment",
      desc: "Gentle, precise care delivered in our beautifully designed treatment suites using the latest technology.",
    },
    {
      num: "04",
      title: "Ongoing Care",
      desc: "Long-term follow-up, hygiene support and maintenance to keep your smile in perfect condition for life.",
    },
  ];

  return (
    <section className="py-24 lg:py-36" style={{ background: C.ivory }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div ref={ref} className="reveal mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: C.terracotta }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.terracotta,
              }}
            >
              Your Journey
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4.5vw, 60px)",
              fontWeight: 400,
              color: C.espresso,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            From first visit to lasting smile
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="relative p-7 rounded-[20px]"
              style={{ background: C.cream, border: `1px solid ${C.border}` }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 60,
                  fontWeight: 300,
                  color: "rgba(185,104,75,0.2)",
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {s.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  fontWeight: 500,
                  color: C.espresso,
                  marginBottom: 10,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: C.warmGrey,
                  lineHeight: 1.7,
                }}
              >
                {s.desc}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 -right-4 z-10">
                  <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                    <path
                      d="M0 8h28M24 4l4 4-4 4"
                      stroke={C.border}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onBooking }: { onBooking: () => void }) {
  const ref = useReveal();
  return (
    <section
      className="py-12 lg:py-20 px-6 lg:px-10"
      style={{ background: C.ivory }}
    >
      <div ref={ref} className="reveal max-w-[1280px] mx-auto">
        <div
          className="relative overflow-hidden rounded-[32px] p-10 lg:p-20"
          style={{ background: C.espresso }}
        >
          {/* Background image overlay */}
          <img
            src={IMG.smile3}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 400,
                color: C.white,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              Ready to feel differently about your dental care?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              New patients are warmly welcomed. Book a consultation and discover
              a completely different kind of dental experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onBooking}
                className="px-8 py-4 rounded-full font-semibold transition-all duration-300"
                style={{
                  background: C.terracotta,
                  color: C.white,
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#a05a3e")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = C.terracotta)
                }
              >
                Book an Appointment
              </button>
              <a
                href="tel:+919876543210"
                className="px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: C.white,
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 10.5c-.7-.5-1.5-.8-2-.5l-.9.5c-.6.3-1.3.2-1.8-.3L6.2 8c-.5-.5-.6-1.2-.3-1.8L6.4 5c.3-.5 0-1.3-.5-2L4.8 1.5c-.4-.6-1.1-.7-1.7-.3L1.6 2.5C1 3 .8 3.8 1 4.5c.8 3.2 3.3 6 6.5 7.5.5.2 1.2 0 1.6-.5l1.4-1.5c.4-.6.2-1.1-.5-1.5z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
                Call the Clinic
              </a>
              <a
                href="https://wa.me/918971919743?text=Hi%20Serene%20Dentistry%2C%20I%27d%20like%20to%20book%20an%20appointment."
                className="px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: C.white,
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.549 4.11 1.51 5.843L0 24l6.334-1.49A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.022-1.382l-.36-.214-3.757.884.924-3.667-.236-.376A9.813 9.813 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
            <p
              className="mt-8 text-xs"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
              }}
            >
              Dental emergency? Call us immediately: +91-8971919743
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalSection() {
  const ref = useReveal();
  const posts = [
    {
      category: "Cosmetic Care",
      title: "The Complete Guide to Smile Makeovers in 2026",
      time: "5 min read",
      img: IMG.smile2,
    },
    {
      category: "Patient Care",
      title: "What to Expect During Your First Dental Implant Consultation",
      time: "4 min read",
      img: new URL("./implants.png", import.meta.url).href,
    },
    {
      category: "Oral Health",
      title: "Why Your Dental Hygiene Routine Matters More Than You Think",
      time: "3 min read",
      img: new URL("./fullmouth.png", import.meta.url).href,
    },
  ];

  return (
    <section
      id="journal"
      className="py-24 lg:py-36"
      style={{ background: C.cream }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div ref={ref} className="reveal mb-14 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: C.terracotta }} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.terracotta,
                }}
              >
                Journal
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4.5vw, 60px)",
                fontWeight: 400,
                color: C.espresso,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Insights & advice
            </h2>
          </div>
          <a
            href="#journal"
            className="hidden lg:flex items-center gap-2 text-sm font-semibold"
            style={{
              color: C.terracotta,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            All Articles
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article
              key={p.title}
              className="group rounded-[20px] overflow-hidden cursor-pointer"
              style={{ background: C.ivory, border: `1px solid ${C.border}` }}
            >
              <div className="img-zoom aspect-[4/3]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: C.cream,
                      color: C.terracotta,
                      fontFamily: "var(--font-body)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: C.warmGrey,
                    }}
                  >
                    {p.time}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 21,
                    fontWeight: 500,
                    color: C.espresso,
                    lineHeight: 1.3,
                    marginBottom: 16,
                  }}
                >
                  {p.title}
                </h3>
                <div
                  className="flex items-center gap-1"
                  style={{
                    color: C.terracotta,
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Read Article
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" style={{ background: C.espresso, color: C.white }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div
          className="grid lg:grid-cols-5 gap-12 pb-16 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 400,
                color: C.white,
                marginBottom: 4,
              }}
            >
              Serene Dentistry
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.rose,
                marginBottom: 16,
              }}
            >
              Smile Studio
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
                maxWidth: 300,
              }}
            >
              Thoughtful, modern dental care designed around comfort,
              confidence, and long-term oral health.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {["instagram", "facebook", "youtube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = C.terracotta)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.08)")
                  }
                >
                  <span style={{ fontSize: 12, color: C.white }}>
                    {s[0].toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Treatments */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.rose,
                marginBottom: 16,
              }}
            >
              Treatments
            </div>
            {[
              "Smile Makeovers",
              "Dental Implants",
              "Teeth Whitening",
              "Clear Aligners",
              "Veneers",
              "Root Canal",
              "Crowns & Bridges",
            ].map((t) => (
              <a
                key={t}
                href="#treatments"
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 8,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                }
              >
                {t}
              </a>
            ))}
          </div>

          {/* Info */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.rose,
                marginBottom: 16,
              }}
            >
              Information
            </div>
            {[
              "About Us",
              "Our Team",
              "Patient Stories",
              "Journal",
              "Smile Gallery",
              "New Patient Info",
              "Privacy Policy",
            ].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 8,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                }
              >
                {l}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.rose,
                marginBottom: 16,
              }}
            >
              Contact
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
                marginBottom: 12,
              }}
            >
              Arka shine 1st Floor-#196
              <br />
              3rd cross, ECC Rd, Prithvi Layout,
              <br />
              Bengaluru, Karnataka 560066
            </div>
            <a
              href="tel:+918971919743"
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                marginBottom: 6,
              }}
            >
              +91-8971919743
            </a>
            <a
              href="mailto:serenedentistrywhitefield@gmail.com"
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                marginBottom: 16,
              }}
            >
              serenedentistrywhitefield@gmail.com
            </a>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.rose,
                marginBottom: 8,
              }}
            >
              Hours
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
              }}
            >
              9 AM to 9 PM
              <br />
              All 7 days
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            © 2026 Serene Dentistry. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              textAlign: "center",
            }}
          >
            The information on this website is for general guidance only and
            does not constitute medical advice.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    treatment: "",
    date: "",
    time: "",
    type: "new",
    message: "",
    consent: false,
  });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(40,35,31,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full sm:max-w-lg sm:rounded-[28px] rounded-t-[28px] overflow-hidden"
        style={{ background: C.ivory, maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6 border-b"
          style={{ borderColor: C.border }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 400,
                color: C.espresso,
              }}
            >
              Book an Appointment
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: C.warmGrey,
                marginTop: 2,
              }}
            >
              Serene Dentistry, Bengaluru
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: C.cream, border: `1px solid ${C.border}` }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke={C.espresso}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form
          className="px-8 py-8 flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            const lines = [
              "New Appointment Request",
              `Name: ${form.name}`,
              `Phone: ${form.phone}`,
              `Email: ${form.email}`,
              `Treatment: ${form.treatment || "Not specified"}`,
              `Preferred Date: ${form.date || "Not specified"}`,
              `Preferred Time: ${form.time || "Not specified"}`,
              `Patient Type: ${form.type === "new" ? "New Patient" : "Existing Patient"}`,
              form.message ? `Message: ${form.message}` : null,
            ]
              .filter(Boolean)
              .join("\n");
            const whatsappUrl = `https://wa.me/918971919743?text=${encodeURIComponent(lines)}`;
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            setStep(2);
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              ["name", "Full Name", "text"],
              ["phone", "Phone Number", "tel"],
            ].map(([k, l, t]) => (
              <div key={k}>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.warmGrey,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {l}
                </label>
                <input
                  type={t}
                  placeholder={l}
                  value={(form as any)[k]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [k]: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    fontFamily: "var(--font-body)",
                    color: C.espresso,
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = C.terracotta)
                  }
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>
            ))}
          </div>
          <div>
            <label
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: C.warmGrey,
                display: "block",
                marginBottom: 6,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Your email address"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                fontFamily: "var(--font-body)",
                color: C.espresso,
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = C.terracotta)
              }
              onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
            />
          </div>
          <div>
            <label
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: C.warmGrey,
                display: "block",
                marginBottom: 6,
              }}
            >
              Treatment of Interest
            </label>
            <select
              value={form.treatment}
              onChange={(e) =>
                setForm((f) => ({ ...f, treatment: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                fontFamily: "var(--font-body)",
                color: form.treatment ? C.espresso : C.warmGrey,
                appearance: "none",
              }}
            >
              <option value="">Select a treatment</option>
              {TREATMENTS.map((t) => (
                <option key={t.slug} value={t.title}>
                  {t.title}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.warmGrey,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Preferred Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  fontFamily: "var(--font-body)",
                  color: C.espresso,
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.warmGrey,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Preferred Time
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm((f) => ({ ...f, time: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  fontFamily: "var(--font-body)",
                  color: form.time ? C.espresso : C.warmGrey,
                }}
              />
            </div>
          </div>
          <div className="flex gap-3">
            {["new", "existing"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type }))}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: form.type === type ? C.terracotta : C.white,
                  border: `1px solid ${form.type === type ? C.terracotta : C.border}`,
                  color: form.type === type ? C.white : C.espresso,
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                }}
              >
                {type === "new" ? "New Patient" : "Existing Patient"}
              </button>
            ))}
          </div>
          <div>
            <label
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: C.warmGrey,
                display: "block",
                marginBottom: 6,
              }}
            >
              Message (Optional)
            </label>
            <textarea
              placeholder="Any additional information or concerns..."
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                fontFamily: "var(--font-body)",
                color: C.espresso,
              }}
            />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) =>
                setForm((f) => ({ ...f, consent: e.target.checked }))
              }
              className="mt-1"
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: C.warmGrey,
                lineHeight: 1.6,
              }}
            >
              I consent to Serene Dentistry processing my personal data for
              appointment booking purposes, in accordance with the Privacy
              Policy.
            </span>
          </label>

          {step === 2 ? (
            <div className="text-center py-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#e8f5e9" }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M5 14l7 7 11-11"
                    stroke="#4caf50"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  color: C.espresso,
                  marginBottom: 8,
                }}
              >
                Thank you!
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: C.warmGrey,
                }}
              >
                We'll confirm your appointment shortly.
              </p>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-4 rounded-full font-semibold transition-all duration-300"
              style={{
                background: C.terracotta,
                color: C.white,
                fontFamily: "var(--font-body)",
                fontSize: 15,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#a05a3e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = C.terracotta)
              }
            >
              Request Appointment
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

// ─── Scroll-follow hook ────────────────────────────────────────────────────────
// Gives fixed-position elements a visible lag/bounce so they feel like they are
// physically tracking the user's scroll motion instead of sitting perfectly still.
function useScrollFollow() {
  const [offset, setOffset] = useState(0);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;
      setOffset((o) => Math.max(-22, Math.min(22, o + delta * 0.35)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let frame: number;
    const tick = () => {
      setOffset((o) => (Math.abs(o) < 0.4 ? 0 : o * 0.88));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return offset;
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const followOffset = useScrollFollow();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Scroll to top"
      className="fixed right-6 z-[90] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-[opacity,background] duration-300 bottom-[152px] lg:bottom-[92px]"
      style={{
        background: C.terracotta,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: `translateY(${(visible ? 0 : 12) + followOffset}px) scale(${hovered ? 1.1 : 1})`,
        transition: "transform 0.15s ease-out, opacity 0.3s, background 0.3s",
        border: "none",
        cursor: "pointer",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 13V3M3.5 7.5L8 3l4.5 4.5"
          stroke={C.white}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const followOffset = useScrollFollow();

  return (
    <a
      href="https://wa.me/918971919743?text=Hi%20Serene%20Dentistry%2C%20I%27d%20like%20to%20book%20an%20appointment."
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-24 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-lg lg:bottom-6"
      style={{
        background: "#25d366",
        transform: `translateY(${followOffset}px) scale(${hovered ? 1.1 : 1})`,
        transition: "transform 0.15s ease-out",
      }}
      aria-label="WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.549 4.11 1.51 5.843L0 24l6.334-1.49A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.022-1.382l-.36-.214-3.757.884.924-3.667-.236-.376A9.813 9.813 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
      </svg>
    </a>
  );
}

function MobileBookingBar({ onBooking }: { onBooking: () => void }) {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[80] p-4"
      style={{
        background: C.ivory,
        borderTop: `1px solid ${C.border}`,
        boxShadow: "0 -4px 24px rgba(40,35,31,0.08)",
      }}
    >
      <div className="flex gap-3">
        <a
          href="tel:+919876543210"
          className="flex-none w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: C.cream, border: `1px solid ${C.border}` }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 10.5c-.7-.5-1.5-.8-2-.5l-.9.5c-.6.3-1.3.2-1.8-.3L6.2 8c-.5-.5-.6-1.2-.3-1.8L6.4 5c.3-.5 0-1.3-.5-2L4.8 1.5c-.4-.6-1.1-.7-1.7-.3L1.6 2.5C1 3 .8 3.8 1 4.5c.8 3.2 3.3 6 6.5 7.5.5.2 1.2 0 1.6-.5l1.4-1.5c.4-.6.2-1.1-.5-1.5z"
              stroke={C.espresso}
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </a>
        <button
          onClick={onBooking}
          className="flex-1 py-3 rounded-full font-semibold"
          style={{
            background: C.terracotta,
            color: C.white,
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
}

// ─── SEO helper ───────────────────────────────────────────────────────────────
const SITE_URL = "https://serenedentalwhitefield.com";

function useSeo(
  title: string,
  description: string,
  keywords?: string[],
  path = "/",
) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    setMeta("description", description);
    if (keywords && keywords.length) setMeta("keywords", keywords.join(", "));

    const canonicalUrl = `${SITE_URL}${path}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [title, description, keywords ? keywords.join(",") : undefined, path]);
}

// ─── Structured data (JSON-LD) for local business / dentist rich results ───────
function useLocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: "Serene Dentistry",
      image: `${SITE_URL}/og-image.jpg`,
      url: SITE_URL,
      telephone: "+91-8971919743",
      email: "serenedentistrywhitefield@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Whitefield, Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      priceRange: "$$",
      medicalSpecialty: [
        "Orthodontics",
        "Cosmetic Dentistry",
        "Oral Surgery",
        "Dental Implants",
      ],
    };
    let script = document.getElementById("local-business-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "local-business-schema";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, []);
}


// ─── Scroll management on route change ─────────────────────────────────────────
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return null;
}

function HomePage({ onBooking }: { onBooking: () => void }) {
  useSeo(
    "Serene Dentistry | Personalised Dental Care & Smile Design",
    "Serene Dentistry offers orthodontics, digital smile design, general dentistry, dental implants, veneers, oral surgery and full mouth rehabilitation with unhurried, personalised care.",
    [
      "dentist",
      "dental clinic",
      "cosmetic dentistry",
      "dental implants",
      "orthodontics",
      "smile makeover",
    ],
    "/",
  );
  return (
    <main>
      <Hero onBooking={onBooking} />
      <PhilosophySection />
      <TreatmentsSection />
      <ClinicExperience />
      <DoctorSection />
      <TechnologySection />
      <BeforeAfterSection />
      <ClinicGallerySection />
      <TestimonialsSection />
      <PatientVideoSection />
      <ProcessSection />
      <CTASection onBooking={onBooking} />
      <JournalSection />
    </main>
  );
}

function TreatmentDetailPage({ onBooking }: { onBooking: () => void }) {
  const { slug } = useParams();
  const treatment = getTreatmentBySlug(slug);

  useSeo(
    treatment
      ? `${treatment.metaTitle}`
      : "Treatment Not Found | Serene Dentistry",
    treatment
      ? treatment.metaDescription
      : "The treatment you're looking for could not be found at Serene Dentistry.",
    treatment?.keywords,
    `/treatments/${slug ?? ""}`,
  );

  if (!treatment) {
    return (
      <main
        className="flex flex-col items-center justify-center px-6 py-40 text-center"
        style={{ background: C.ivory }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4vw, 48px)",
            color: C.espresso,
            marginBottom: 16,
          }}
        >
          Treatment Not Found
        </h1>
        <Link
          to="/"
          style={{
            color: C.terracotta,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main style={{ background: C.ivory }}>
      {/* Hero */}
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: C.terracotta,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.terracotta,
                }}
              >
                Service Detail
              </span>
              <div className="h-px w-8" style={{ background: C.border }} />
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 400,
                color: C.espresso,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginBottom: 24,
              }}
            >
              {treatment.title}
            </h1>
            {treatment.heroParagraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  color: C.warmGrey,
                  lineHeight: 1.8,
                  marginBottom: 16,
                  maxWidth: 560,
                }}
              >
                {p}
              </p>
            ))}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8">
              {treatment.checklist.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{ flex: "none" }}
                  >
                    <circle cx="10" cy="10" r="10" fill="#DCEFE1" />
                    <path
                      d="M6 10.3l2.4 2.4L14 7.3"
                      stroke="#2F8F4E"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: C.espresso,
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="img-zoom rounded-[28px] overflow-hidden aspect-[4/3]">
            <img
              src={treatment.img}
              alt={treatment.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* What We Provide / Expected Result */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-6">
          <div
            className="rounded-[24px] p-8 lg:p-10"
            style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderTop: `3px solid ${C.terracotta}`,
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full mb-6"
              style={{
                background: C.cream,
                color: C.terracotta,
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              What We Provide
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 2.6vw, 32px)",
                fontWeight: 400,
                color: C.espresso,
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              {treatment.whatWeProvide.heading}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: C.warmGrey,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              {treatment.whatWeProvide.desc}
            </p>
            <ul className="space-y-3">
              {treatment.whatWeProvide.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: C.espresso,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: C.terracotta,
                      display: "inline-block",
                      flex: "none",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-[24px] p-8 lg:p-10"
            style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderTop: `3px solid ${C.terracotta}`,
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full mb-6"
              style={{
                background: C.cream,
                color: C.terracotta,
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              Expected Result
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 2.6vw, 32px)",
                fontWeight: 400,
                color: C.espresso,
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              Life After Treatment
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: C.warmGrey,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              {treatment.expectedResult.desc}
            </p>
            <ul className="space-y-3">
              {treatment.expectedResult.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: C.espresso,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: C.terracotta,
                      display: "inline-block",
                      flex: "none",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div
            className="relative overflow-hidden rounded-[32px] p-10 lg:p-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center"
            style={{ background: C.espresso }}
          >
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: C.rose,
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                Let's Get Started
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.2vw, 44px)",
                  fontWeight: 400,
                  color: C.white,
                  lineHeight: 1.15,
                  marginBottom: 16,
                  maxWidth: 640,
                }}
              >
                {treatment.ctaQuestion}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                  maxWidth: 560,
                }}
              >
                {treatment.ctaDesc}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={onBooking}
                className="px-8 py-4 rounded-full font-semibold whitespace-nowrap transition-all duration-300"
                style={{
                  background: C.terracotta,
                  color: C.white,
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#a05a3e")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = C.terracotta)
                }
              >
                Book Appointment
              </button>
              <Link
                to="/"
                className="px-8 py-4 rounded-full font-semibold whitespace-nowrap flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: C.white,
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AppShell() {
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const lastScrollY = useRef(0);
  const onBooking = () => setBookingOpen(true);

  useLocalBusinessSchema();

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y <= 60) {
        setHeaderHidden(false);
      } else if (y > lastScrollY.current) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: C.ivory }}>
      <ScrollManager />
      <Header scrolled={scrolled} hidden={headerHidden} onBooking={onBooking} />
      <Routes>
        <Route path="/" element={<HomePage onBooking={onBooking} />} />
        <Route
          path="/treatments/:slug"
          element={<TreatmentDetailPage onBooking={onBooking} />}
        />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
      <MobileBookingBar onBooking={onBooking} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
