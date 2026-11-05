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
  {
    src: "/Banner%20Images/Banner_1.png",
    alt: "Classic Indian cinema couple",
    focus: "70% 50%",
    heading: "Premium & International",
    description: "Connecting Content. Creating Possibilities. Expanding Intellectual Property.",
  },
  {
    src: "/Banner%20Images/Banner_2.png",
    alt: "Golden era leading lady",
    focus: "68% 50%",
    heading: "Business & Industry Focused",
    description: "Your Strategic Partner in Content Acquisition, Licensing and Intellectual Property.",
  },
  {
    src: "/Banner%20Images/Banner_3.png",
    alt: "Vintage cinema couple in black and white",
    focus: "55% 50%",
    heading: "Creative & Contemporary",
    description: "Where Stories Travel, Ideas Evolve and Content Finds New Markets.",
  },
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
  {
    name: "Saumin Suresh Patel",
    photo: "/Our%20Gallery/10.jpg",
    instagram: { label: "@sauminspatel", url: "https://www.instagram.com/sauminspatel/" },
    bio: [
      "Saumin Suresh Patel is an Illustrator from Mumbai, India. He has been actively creating dynamic and stunning illustrations for prestigious projects which include – A graphic novel: Agent Vinod-The Jungfrau Encounter for Westland, various comics like Bahubali-Battle of the Bold, in addition to Multiple Comic Books with International Brands such as – 18 Days, The Mighty Yeti for Graphic India & Black Cloud for Image Comics. He has worked closely on visualizing the stories of some of the finest film directors like Vidhu Vinod Chopra, Sriram Raghavan, Ashutosh Gowarikar, Rajesh Krishnan and more.",
      "He has a deep understanding of art & artists and his core objective is to create a body of work, which can be distinct & have dynamic visual expression, and take the art from India to global levels. You can follow his work on Instagram-@sauminspatel.",
      "Apart from creating comics, Saumin has been involved in curating various works of art over time, including films, animated shows, tv shows and others.",
    ],
  },
  {
    name: "Arjun Mogre",
    photo: "/Our%20Gallery/7.jpg",
    instagram: null,
    bio: [
      "Arjun Mogre is an internationally awarded film-maker, writer and producer with more than 18 years of experience across films, television, digital and adfilms. He has previously worked with RSVP, UTV motion pictures and also headed the unscripted division at Applause Entertainment where he produced several shows and developed more than 15 original IPs. At Applause he has also been responsible in the commissioning of various successful web-series and films such as The Hunt, Sharmaji Ki Beti, Kafas, Kaun Banegi Shikharwati etc. The documentaries he produced, Indira's Emergency and Modern Masters both garnered immense love from audiences and bagged various awards. Arjun has worked with industry stalwarts like Sameer Nair, Subhash Ghai, Madhur Bhandarkar, Vikramaditya Motwane, Priyanka Chopra, Mira Nair and has also helped partner deals with international players like Imagine Entertainment and Mirabai Films.",
      "Arjun also is a visiting faculty at Whistling Woods International, IIM Mumbai, Mumbai University and has been associated with other institutions such as Aditya Birla World Academy, Oberoi World School, Dhirubhai Ambani World School, RIMS International School, Nashik Cambridge School and others.",
      "Arjun has been involved in content acquisition of original film content, tv shows, international fiction and non-fiction formats and has closely worked with remaking popular formats from BBC, ITV, All3 Media, Red Arrow (Germany), Studio TF1 (France) and others.",
      "His short film Pradosh was screened at festivals across USA, France, UK and India - where it won several awards. His work has released on Netflix, JioHostar, SonyLiv, YouTube Premium, Amazon Prime Video, Zee5.",
    ],
  },
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
        <div className="hero-inner">
          <div className="hero-photo" aria-hidden="true">
            {bannerImages.map((banner, index) => (
              <div key={banner.src} className={`hero-slide ${heroSlide === index ? "active" : ""}`}>
                <img src={banner.src} alt="" style={{ objectPosition: banner.focus }} />
              </div>
            ))}
          </div>
          <div className="hero-copy">
            <div className="hero-text-stack">
              {bannerImages.map((banner, index) => {
                const isActive = heroSlide === index;
                return (
                  <div
                    key={banner.src}
                    className={`hero-text-slide ${isActive ? "active" : ""}`}
                    aria-hidden={!isActive}
                  >
                    <h1>{banner.heading}</h1>
                    <div className="pink-rule" />
                    <p className="intro">{banner.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="actions">
              <a className="button primary" href="#gallery" onClick={(event) => scrollToSection(event, "gallery")}><span>▷</span> Explore Collection</a>
            </div>
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

      <section className="about-section" id="about" aria-labelledby="about-heading">
        <div className="about-inner">
          <header className="about-header">
            <h2 id="about-heading">Bringing Stories, Ideas and Intellectual Property to New Audiences.</h2>
          </header>

          <div className="about-intro">
            <p className="about-lead">We are a content acquisition, licensing and distribution company operating at the intersection of creativity, commerce and intellectual property. With a deep understanding of the evolving entertainment landscape, we specialise in discovering, acquiring, representing and connecting compelling content with the right platforms, partners and audiences across markets.</p>
            <div className="about-intro-columns">
              <p>Our business spans the entire spectrum of entertainment content, encompassing domestic feature films, television shows, animation, vertical-format content, international fiction, non-fiction programming and unscripted entertainment formats. From established cinematic properties and popular television titles to emerging digital-first content and distinctive international intellectual properties, we work across genres, languages, formats and territories to identify opportunities that create value for both content owners and buyers.</p>
              <p>We believe that great content has the potential to travel, transcend geographical boundaries and find new expressions across platforms, cultures and audiences. Our approach goes beyond conventional content buying and selling. We engage with the complete lifecycle of intellectual property, facilitating acquisitions, licensing, sales, sub-licensing, format rights, adaptations and remakes. By understanding the creative, commercial and strategic potential of every property, we help unlock opportunities that extend its reach, relevance and lifecycle.</p>
            </div>
          </div>

          <div className="about-block">
            <h3>A Comprehensive Content Ecosystem</h3>
            <p>Our portfolio and areas of operation reflect the increasingly diverse nature of today&apos;s entertainment industry. We work across:</p>
            <div className="about-categories">
              <article className="about-category">
                <h4>Domestic Films</h4>
                <p>Feature films across Indian languages, industries and genres, catering to theatrical, television and digital exploitation opportunities.</p>
              </article>
              <article className="about-category">
                <h4>Television Content</h4>
                <p>Fiction and non-fiction television properties, series, shows and programming suitable for broadcasters and streaming platforms.</p>
              </article>
              <article className="about-category">
                <h4>Animation</h4>
                <p>Animated films, series and intellectual properties across age groups, genres and storytelling styles.</p>
              </article>
              <article className="about-category">
                <h4>Vertical Content</h4>
                <p>Short-form, mobile-first and vertically formatted entertainment designed for the rapidly expanding ecosystem of digital consumption.</p>
              </article>
              <article className="about-category">
                <h4>International Fiction</h4>
                <p>Scripted series, films and original intellectual properties from global markets with potential for licensing, localisation, adaptation and remaking.</p>
              </article>
              <article className="about-category">
                <h4>Non-Fiction &amp; Entertainment Formats</h4>
                <p>Unscripted programming, reality shows, factual entertainment, documentaries, game shows and internationally developed formats with opportunities for local adaptation and production.</p>
              </article>
            </div>
          </div>

          <div className="about-block about-split">
            <h3>Connecting the Right Partners</h3>
            <div className="about-split-copy">
              <p>The content business is built on relationships, insight and the ability to recognise the right opportunity at the right time. Our network extends across a diverse spectrum of industry stakeholders, including independent content buyers, intellectual property owners, producers, production houses, studios, broadcasters, streaming platforms, distributors and international rights holders.</p>
              <p>We work with emerging independent players as well as established entertainment companies, tailoring our approach to the specific requirements of each partnership. Whether it involves sourcing a particular title, identifying a promising international format, negotiating content rights, representing an IP owner&apos;s catalogue or facilitating a remake or adaptation, we aim to make the process seamless, transparent and commercially rewarding.</p>
              <p>For buyers, we provide access to a diverse and carefully identified range of content opportunities. For producers and IP owners, we offer avenues to monetise, expand and extend the value of their intellectual property through strategic licensing, distribution and adaptation partnerships.</p>
            </div>
          </div>

          <div className="about-block about-split">
            <h3>Beyond Acquisition. Building Possibilities.</h3>
            <div className="about-split-copy">
              <p>We recognise that the entertainment industry is constantly evolving. New platforms, changing audience behaviours, emerging storytelling formats and increasingly interconnected markets are reshaping how content is created, consumed and monetised.</p>
              <p>We approach these changes with an open, forward-looking mindset, combining market understanding with an appreciation for the creative potential of intellectual property. Our objective is not simply to facilitate transactions, but to build meaningful connections between stories, rights holders and businesses that can take those stories further.</p>
              <p>At our core, we are passionate about content in all its forms and the possibilities it creates. We bring together the people, properties and opportunities that drive the business of entertainment — helping stories find new homes, intellectual property discover new markets and great ideas evolve into successful ventures.</p>
            </div>
          </div>

          <p className="about-closing">We connect content with opportunity, intellectual property with possibility, and stories with the audiences they deserve.</p>
        </div>
      </section>

      <section className="team" id="team" aria-labelledby="team-heading">
        <p className="eyebrow"><i /> THE PEOPLE BEHIND YETI STUDIOS</p>
        <h2 id="team-heading">Meet the Team</h2>
        <p className="section-lead">The creative minds shaping the stories, ideas and intellectual property at YETI STUDIOS.</p>
        <div className="team-profiles">
          {team.map((member) => (
            <article className="team-profile" key={member.name}>
              <div className="team-profile-media">
                <img src={member.photo} alt={`${member.name} portrait`} loading="lazy" />
              </div>
              <div className="team-profile-body">
                <h3>{member.name}</h3>
                {member.instagram && (
                  <a
                    className="team-instagram"
                    href={member.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${member.name} on Instagram`}
                  >
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <path d="M17.5 6.5h.01" />
                    </svg>
                    {member.instagram.label}
                  </a>
                )}
                <div className="team-divider" aria-hidden="true" />
                {member.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
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
            <a className="contact-detail" href="mailto:hello@yetistudio.com">
              <span>Email</span>
              <strong>hello@yetistudio.com</strong>
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
