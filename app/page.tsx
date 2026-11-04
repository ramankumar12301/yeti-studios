"use client";

import { useCallback, useEffect, useState } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "team", label: "Team" },
  { id: "gallery", label: "Our Gallery" },
  { id: "contact", label: "Contact Us" },
];

const bannerImages = [
  { src: "/Banner%20Images/Banner_1.png", alt: "Classic Indian cinema couple" },
  { src: "/Banner%20Images/Banner_2.png", alt: "Golden era leading lady" },
  { src: "/Banner%20Images/Banner_3.png", alt: "Vintage cinema couple in black and white" },
];

const galleryPhotos = [
  { src: "/Our%20Gallery/3.avif", alt: "Filmmaker with a vintage film projector" },
  { src: "/Our%20Gallery/13.jpg", alt: "Classic bridal portrait in black and white" },
  { src: "/Our%20Gallery/1.jpg", alt: "Timeless on-screen couple in a classic film" },
  { src: "/Our%20Gallery/4.jpg", alt: "Golden era couple embracing in a film still" },
  { src: "/Our%20Gallery/7.jpg", alt: "Black and white portrait of a leading man" },
  { src: "/Our%20Gallery/11.jpg", alt: "Classic actress in a floral embroidered sari" },
  { src: "/Our%20Gallery/5.jpg", alt: "Vintage glamour portrait of a leading lady" },
  { src: "/Our%20Gallery/12.webp", alt: "Classic cinema couple in a black and white still" },
  { src: "/Our%20Gallery/6.jpg", alt: "Three legendary wrestlers from Indian cinema" },
  { src: "/Our%20Gallery/8.jpg", alt: "Golden era actress in a patterned sari" },
  { src: "/Our%20Gallery/9.jpg", alt: "Leading lady with a rose in her hair" },
  { src: "/Our%20Gallery/2.webp", alt: "Black and white portrait of a classic actress" },
  { src: "/Our%20Gallery/10.jpg", alt: "Portrait of a classic Indian film actor" },
  { src: "/Our%20Gallery/14.webp", alt: "Smiling actress from the golden era of cinema" },
];

const team = [
  { name: "Ananya Rao", role: "Curator & Film Historian", photo: "/Our%20Gallery/13.jpg" },
  { name: "Vikram Mehta", role: "Archive Director", photo: "/Our%20Gallery/3.avif" },
  { name: "Meera Kapoor", role: "Creative Producer", photo: "/Our%20Gallery/9.jpg" },
  { name: "Rohan Iyer", role: "Restoration Lead", photo: "/Our%20Gallery/10.jpg" },
];

export default function Home() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const moveHeroSlide = useCallback((direction: number) => {
    setHeroSlide((current) => (current + direction + bannerImages.length) % bannerImages.length);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showNextPhoto = useCallback(() => {
    setLightboxIndex((current) => (current === null ? current : (current + 1) % galleryPhotos.length));
  }, []);
  const showPreviousPhoto = useCallback(() => {
    setLightboxIndex((current) => (current === null ? current : (current - 1 + galleryPhotos.length) % galleryPhotos.length));
  }, []);

  const scrollToSection = useCallback((event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const header = document.querySelector<HTMLElement>(".topbar");
    const offset = (header?.offsetHeight ?? 76) + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    setActiveSection(id);
    setMenuOpen(false);
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector<HTMLElement>(".topbar");
      const offset = (header?.offsetHeight ?? 76) + 24;
      const position = window.scrollY + offset;

      let current = navItems[0].id;
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= position) current = item.id;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = "contact";
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 800) setMenuOpen(false);
    };

    window.addEventListener("keydown", closeMenu);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeMenu);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHeroSlide((current) => (current + 1) % bannerImages.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [heroSlide]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNextPhoto();
      if (event.key === "ArrowLeft") showPreviousPhoto();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showNextPhoto, showPreviousPhoto]);

  const selectedPhoto = lightboxIndex === null ? null : galleryPhotos[lightboxIndex];

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:hello@timelesscinema.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main>
      <header className={`topbar ${menuOpen ? "menu-open" : ""}`}>
        <a className="wordmark" href="#home" onClick={(event) => scrollToSection(event, "home")} aria-label="Home">
          <img src="/logo/yeti-studio-foot-logo-001.png" alt="Yeti Studio" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="primary-navigation" aria-label="Main navigation" className={menuOpen ? "open" : ""}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "selected" : undefined}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={(event) => scrollToSection(event, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button className="search" aria-label="Search"><span /></button>
      </header>

      <section className="hero" id="home" aria-label="Featured cinema banners">
        <div className="hero-shade" />
        <div className="hero-photo" aria-hidden="true">
          {bannerImages.map((banner, index) => (
            <div
              key={banner.src}
              className={`hero-slide ${heroSlide === index ? "active" : ""}`}
              style={{ backgroundImage: `url("${banner.src}")` }}
            />
          ))}
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><i /> CLASSIC COLLECTION</p>
          <h1>Timeless<br />Indian Cinema</h1>
          <div className="pink-rule" />
          <p className="intro">A curated collection of iconic films, legendary actors and unforgettable moments from Indian cinema.</p>
          <div className="actions">
            <a className="button primary" href="#gallery" onClick={(event) => scrollToSection(event, "gallery")}><span>▷</span> Explore Collection</a>
          </div>
        </div>
        <div className="hero-slider-controls" aria-label="Hero banner controls">
          <button className="hero-arrow" type="button" onClick={() => moveHeroSlide(-1)} aria-label="Previous banner">‹</button>
          <div className="hero-dots">
            {bannerImages.map((banner, index) => (
              <button
                key={banner.src}
                type="button"
                className={`hero-dot ${heroSlide === index ? "active" : ""}`}
                onClick={() => setHeroSlide(index)}
                aria-label={`Go to banner ${index + 1}`}
                aria-current={heroSlide === index ? "true" : undefined}
              />
            ))}
          </div>
          <button className="hero-arrow" type="button" onClick={() => moveHeroSlide(1)} aria-label="Next banner">›</button>
        </div>
      </section>

      <section className="below" id="about">
        <p className="eyebrow">ABOUT US · A JOURNEY THROUGH THE YEARS</p>
        <h2>Celebrating the magic of cinema.</h2>
        <p>Stories, faces and unforgettable moments that continue to inspire generations.</p>
      </section>

      <section className="team" id="team" aria-labelledby="team-heading">
        <p className="eyebrow"><i /> THE PEOPLE BEHIND THE ARCHIVE</p>
        <h2 id="team-heading">Meet the Team</h2>
        <p className="section-lead">A small group of curators, archivists and storytellers keeping the golden era of Indian cinema alive.</p>
        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <img src={member.photo} alt={member.name} />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="premium-gallery" id="gallery" aria-labelledby="gallery-heading">
        <div className="gallery-heading-wrap">
          <p className="eyebrow"><i /> THE ARCHIVE IN FRAMES</p>
          <h2 id="gallery-heading">OUR GALLERY</h2>
          <p className="gallery-subtitle">A cinematic collection of iconic faces, unforgettable scenes and rare moments from the golden age of Indian cinema.</p>
        </div>
        <div className="gallery-grid">
          {galleryPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              className="gallery-card"
              onClick={() => setLightboxIndex(index)}
              aria-haspopup="dialog"
              aria-label={`View image ${index + 1} full screen`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-heading">
        <div className="contact-inner">
          <p className="eyebrow"><i /> GET IN TOUCH</p>
          <h2 id="contact-heading">CONTACT US</h2>
          <p className="contact-description">For business enquiries, creative collaborations and archive partnerships, connect with the YETI STUDIOS team.</p>

          <div className="contact-details">
            <a className="contact-detail" href="mailto:hello@timelesscinema.in">
              <span>Email</span>
              <strong>hello@timelesscinema.in</strong>
            </a>
            <div className="contact-detail">
              <span>Location</span>
              <strong>Mumbai · India</strong>
            </div>
            <div className="contact-detail">
              <span>Business Hours</span>
              <strong>Mon – Fri, 10:00 – 18:00 IST</strong>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="contact-form-row">
              <label>
                <span>Full Name</span>
                <input type="text" name="name" placeholder="Your full name" autoComplete="name" required />
              </label>
              <label>
                <span>Email Address</span>
                <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input type="text" name="subject" placeholder="How can we help?" required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={5} placeholder="Tell us about your enquiry or collaboration idea..." required />
            </label>
            <button className="button primary contact-submit" type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <footer>
        <span>YETI STUDIOS</span>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "selected" : undefined}
              onClick={(event) => scrollToSection(event, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <small>© 2026. All rights reserved.</small>
      </footer>

      {selectedPhoto && lightboxIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${lightboxIndex + 1} of ${galleryPhotos.length}: ${selectedPhoto.alt}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={closeLightbox}
            aria-label="Close gallery"
            autoFocus
          >
            ×
          </button>
          <button className="lightbox-nav lightbox-prev" type="button" onClick={showPreviousPhoto} aria-label="Previous photo">‹</button>
          <figure className="lightbox-figure">
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
          </figure>
          <button className="lightbox-nav lightbox-next" type="button" onClick={showNextPhoto} aria-label="Next photo">›</button>
        </div>
      )}
    </main>
  );
}
