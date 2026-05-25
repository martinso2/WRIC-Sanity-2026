"use client";

import Image from "next/image";
import { stegaClean } from "@sanity/client/stega";
import { dataAttr } from "@/sanity/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { WricHistoryTimeline } from "@/app/components/wric/wric-history-timeline";
import { WricTeamSection } from "@/app/components/wric/wric-team-section";
import { Modal } from "@/app/components/wric/modal";
import { GoogleTranslate } from "@/app/components/wric/google-translate";
import { socialLinks } from "@/app/data/wric-social-links";
import {
  contactDetails,
  galaMessage,
  missionStatement,
  modalContent,
  serviceCards,
  supportCards,
  type ServiceCard,
  type ModalContent
} from "@/app/data/wric-content";
type SanitySettings = {
  _id?: string | null
  _type?: string | null
  orgName?: string | null
  tagline?: string | null
  phone?: string | null
  phoneSpanish?: string | null
  email?: string | null
  address?: string | null
  hours?: string | null
  spanishHoursNote?: string | null
  taxNote?: string | null
  donateUrl?: string | null
  volunteerUrl?: string | null
  orientationUrl?: string | null
  clientPortalUrl?: string | null
  facebookUrl?: string | null
  instagramUrl?: string | null
  linkedinUrl?: string | null
  galaTitle?: string | null
  galaBody?: string | null
  galaVisible?: boolean | null
} | null

type SanityHero = {
  _id?: string | null
  _type?: string | null
  heroSubheadline?: string | null
  heroLede?: string | null
  heroStat?: string | null
  heroStatLabel?: string | null
  heroCTALabel?: string | null
  heroCTAUrl?: string | null
  missionStatement?: string | null
  heroImage?: string | null
  heroImageAlt?: string | null
} | null

type SanityService = {
  _id: string
  _type?: string | null
  title: string
  summary: string
  details?: string[] | null
  actionLabel?: string | null
  actionType?: string | null
  actionUrl?: string | null
  modalId?: string | null
  tags?: string[] | null
  image?: string | null
  imageAlt?: string | null
}

type SanityStaff = {
  _id: string
  _type?: string | null
  name: string
  title?: string | null
  email?: string | null
  featured?: boolean | null
  image?: string | null
}

type SanityBoard = {
  _id: string
  _type?: string | null
  name: string
  role?: string | null
  isEmeritus?: boolean | null
}

type Props = {
  sanitySettings?: SanitySettings
  sanityHero?: SanityHero
  sanityServices?: SanityService[]
  sanityStaff?: SanityStaff[]
  sanityBoard?: SanityBoard[]
}

const importedImages = {
  logo: "/images/logo/wric-logo-building-transparent.png",
  hero: "/images/hero/blue-silhouettes-right.jpeg",
  gala: "/images/events/2026-gala-celebration.jpg",
  career: "/images/services/career-services-classroom.jpg",
  housing: "/images/services/housing.jpeg",
  support: "/images/services/support.jpeg",
  victim: "/images/services/victim-services-2.jpg",
  domestic: "/images/services/domestic-violence.jpeg",
  trafficking: "/images/services/sex-traffic.jpeg",
  wellness: "/images/services/wellness-2.jpeg"
};

const serviceImages: Partial<Record<string, string>> = {
  "Career Services": importedImages.career,
  Housing: importedImages.housing,
  "Supportive Services": importedImages.support,
  "Victim Services": importedImages.victim,
  "Domestic Violence Support": importedImages.domestic,
  "Human Trafficking Support": importedImages.trafficking,
  "Wellness & Trauma Support": importedImages.wellness
};

const serviceImageAlts: Partial<Record<string, string>> = {
  "Career Services": "Career services workshop",
  Housing: "Illustration of a path toward stable housing",
  "Supportive Services": "Women gathered in conversation for supportive services",
  "Victim Services": "WRIC advocacy event for financial abuse awareness",
  "Domestic Violence Support": "Illustration of women surrounded by leaves and flowers",
  "Human Trafficking Support": "Illustration of a woman in profile with layered leaves",
  "Wellness & Trauma Support": "Creative arts therapy session outdoors"
};

const serviceLayoutClasses: Partial<Record<string, string>> = {
  "Career Services": "showcase",
  Housing: "right-image-showcase",
  "Supportive Services": "left-image-showcase",
  "Victim Services": "right-image-showcase",
  "Domestic Violence Support": "left-image-showcase",
  "Human Trafficking Support": "right-image-showcase",
  "Wellness & Trauma Support": "left-image-showcase"
};

const serviceTags: Record<string, string[]> = {
  "Career Services": ["Resume help", "ESL", "Citizenship", "Career Closet"],
  Housing: ["Shared housing", "Prevention", "Counseling"],
  "Supportive Services": ["Workshops", "Support groups", "Case management"],
  "Victim Services": ["Confidential", "Legal support", "Safety planning"],
  "Domestic Violence Support": ["Safety planning", "Shelter referrals"],
  "Human Trafficking Support": ["Advocacy", "Trauma-informed"],
  "Wellness & Trauma Support": ["Counseling", "EMDR", "Creative arts"]
};

const rotatingHeroWords = ["Strength", "Stability", "Success"];

export function WricOnePage({sanitySettings, sanityHero, sanityServices = [], sanityStaff = [], sanityBoard = []}: Props = {}) {
  // Merge Sanity data with static fallbacks
  const settingsId = stegaClean(sanitySettings?._id) ?? 'wricSettings'
  const settingsType = 'wricSettings'

  const contact = {
    ...contactDetails,
    phone: sanitySettings?.phone ?? contactDetails.phone,
    email: sanitySettings?.email ?? contactDetails.email,
    address: sanitySettings?.address ?? contactDetails.address,
    hours: sanitySettings?.hours ?? contactDetails.hours,
    spanish: sanitySettings?.spanishHoursNote ?? contactDetails.spanish,
    taxNote: sanitySettings?.taxNote ?? contactDetails.taxNote,
    phoneSpanish: sanitySettings?.phoneSpanish ?? '201.431.5144',
    phoneHref: `tel:+1${stegaClean(sanitySettings?.phone ?? contactDetails.phone).replace(/\D/g, '')}`,
    emailHref: `mailto:${stegaClean(sanitySettings?.email ?? contactDetails.email)}`,
  }
  const mission = sanityHero?.missionStatement ?? sanitySettings?.missionStatement ?? missionStatement
  const gala = {
    title: sanitySettings?.galaTitle ?? galaMessage.title,
    body: sanitySettings?.galaBody ?? galaMessage.body,
    actionLabel: galaMessage.actionLabel,
    modalId: galaMessage.modalId,
    visible: sanitySettings?.galaVisible ?? true,
  }
  const heroId = sanityHero?._id ?? settingsId
  const heroType = sanityHero?._type ?? 'wricHero'
  const heroStat = sanityHero?.heroStat ?? '5,200+'
  const heroStatLabel = sanityHero?.heroStatLabel ?? 'people supported by WRIC programs last year across career, housing, and victim services.'
  const heroLede = sanityHero?.heroLede ?? 'Career services, housing support, victim services, and wellness programs. Safe, confidential, and tailored to your journey.'
  const heroSubheadline = sanityHero?.heroSubheadline ?? 'For women and families navigating challenges in their lives.'
  const heroCTALabel = sanityHero?.heroCTALabel ?? 'Get started with us'
  const heroCTAUrl = stegaClean(sanityHero?.heroCTAUrl ?? '')
  const heroImageSrc = sanityHero?.heroImage ?? importedImages.hero
  const heroImageAlt = sanityHero?.heroImageAlt ?? 'Watercolor portraits of women in profile, layered in shades of blue and teal.'

  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [isHeroWordTransitioning, setIsHeroWordTransitioning] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const wordTimeoutRef = useRef<number | null>(null);
  const activeModal = useMemo<ModalContent | null>(
    () => modalContent.find((modal) => modal.id === activeModalId) ?? null,
    [activeModalId]
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIsHeroWordTransitioning(true);

      wordTimeoutRef.current = window.setTimeout(() => {
        setHeroWordIndex((currentIndex) =>
          currentIndex >= rotatingHeroWords.length - 1 ? 0 : currentIndex + 1
        );
        setIsHeroWordTransitioning(false);
      }, 520);
    }, 3600);

    return () => {
      window.clearInterval(intervalId);

      if (wordTimeoutRef.current) {
        window.clearTimeout(wordTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMobileNavOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function openModal(modalId: string) {
    setActiveModalId(modalId);
  }

  return (
    <>
      <div className="imported-site">
        {/* <div className="utility-bar">
          <div className="wrap">
            <span>Englewood, New Jersey - Bergen County</span>
            <div className="util-links">
              <span>{contact.hours}</span>
              <a href="tel:+12014315144">Para asistencia en Espanol - 201.431.5144</a>
            </div>
          </div>
        </div> */}

        <header className="site-header">
          <div className="wrap">
            <a className="brand" href="#top" aria-label="WRIC home">
              <span className="brand-mark">
                <Image
                  alt="WRIC building mark"
                  height={160}
                  priority
                  src={importedImages.logo}
                  width={160}
                />
              </span>
              <span className="brand-name">
                <span className="nm">Women&apos;s Rights Information Center</span>
                <span className="sub">Est. 1972 - Englewood, NJ</span>
              </span>
            </a>
            <nav className="nav-primary" aria-label="Primary navigation">
              <a href="#services">Services</a>
              <a href="#history">About</a>
              <a href="#team">Staff &amp; Board</a>
              <a href="/videos">Videos</a>
              <a href="#support">Donate</a>
            </nav>
            <div className="nav-actions">
              <div className="nav-social">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="nav-social-link" rel="noreferrer" target="_blank">
                    {s.icon}
                  </a>
                ))}
              </div>
              <GoogleTranslate />
              <button
                aria-controls="mobile-nav"
                aria-expanded={isMobileNavOpen}
                aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
                className="mobile-menu-btn"
                onClick={() => setIsMobileNavOpen((o) => !o)}
                type="button"
              >
                <span className="burger-bar" />
                <span className="burger-bar" />
                <span className="burger-bar" />
              </button>
            </div>
          </div>

          {isMobileNavOpen && (
            <nav
              aria-label="Mobile navigation"
              className="mobile-nav"
              id="mobile-nav"
            >
              <a href="#services" onClick={() => setIsMobileNavOpen(false)}>Services</a>
              <a href="#history" onClick={() => setIsMobileNavOpen(false)}>About</a>
              <a href="#team" onClick={() => setIsMobileNavOpen(false)}>Staff &amp; Board</a>
              <a href="/videos" onClick={() => setIsMobileNavOpen(false)}>Videos</a>
              <a href="#support" onClick={() => setIsMobileNavOpen(false)}>Donate</a>
              <div className="mobile-nav-translate">
                <GoogleTranslate />
              </div>
              <div className="mobile-nav-social">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="nav-social-link" rel="noreferrer" target="_blank">
                    {s.icon}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </header>

        <main id="top">
          <section className="hero">
            <div className="hero-bg">
              <Image
                alt={heroImageAlt}
                fill
                priority
                sizes="100vw"
                src={heroImageSrc}
              />
            </div>
            <div className="hero-fade" />
            <div className="wrap">
              <div className="hero-copy">
             
                <h1 className="display h1">
                <span
                  className="sub-headline"
                  {...(heroId ? {'data-sanity': dataAttr({id: heroId, type: heroType, path: 'heroSubheadline'}).toString()} : {})}
                >
                    {heroSubheadline}
                  </span>
                   Safety.
                  <br />
                  Support.
                  <br />
                  <span
                    className={`rotating-hero-word ${
                      isHeroWordTransitioning ? "is-transitioning" : ""
                    }`}
                    aria-live="polite"
                  >
                    {rotatingHeroWords[heroWordIndex]}.
                  </span>
                </h1>
                <p
                  className="hero-lede"
                  {...(heroId ? {'data-sanity': dataAttr({id: heroId, type: heroType, path: 'heroLede'}).toString()} : {})}
                >
                  {heroLede}
                </p>
                <div className="hero-actions">
                  {heroCTAUrl ? (
                    <a
                      className="btn btn-primary"
                      href={heroCTAUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...(heroId ? {'data-sanity': dataAttr({id: heroId, type: heroType, path: 'heroCTALabel'}).toString()} : {})}
                    >
                      {heroCTALabel}
                    </a>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal("intake")}
                      type="button"
                      {...(heroId ? {'data-sanity': dataAttr({id: heroId, type: heroType, path: 'heroCTALabel'}).toString()} : {})}
                    >
                      {heroCTALabel}
                    </button>
                  )}
                </div>
              </div>
              <div className="hero-stat">
                <div
                  className="num"
                  data-sanity={dataAttr({id: heroId, type: heroType, path: 'heroStat'}).toString()}
                >
                  {heroStat}
                </div>
                <div
                  className="lbl"
                  data-sanity={dataAttr({id: heroId, type: heroType, path: 'heroStatLabel'}).toString()}
                >
                  {heroStatLabel}
                </div>
              </div>
            </div>
          </section>
        

          <div className="quick-strip">
            <div className="wrap">
              <a
                className="cell"
                href={contact.phoneHref}
                data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'phone'}).toString()}
              >
                <span className="label">Call WRIC</span>
                <span className="value">{contact.phone}<small>English line</small></span>
              </a>
              <a
                className="cell"
                href={`tel:+1${stegaClean(contact.phoneSpanish).replace(/\D/g, '')}`}
                data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'phoneSpanish'}).toString()}
              >
                <span className="label">Espanol</span>
                <span className="value">{contact.phoneSpanish}<small>Lunes a viernes, 9-5</small></span>
              </a>
              <div
                className="cell"
                data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'address'}).toString()}
              >
                <span className="label">Visit</span>
                <span className="value">{contact.address}</span>
              </div>
              <div
                className="cell"
                data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'hours'}).toString()}
              >
                <span className="label">Hours</span>
                <span className="value">{contact.hours}</span>
              </div>
            </div>
          </div>
          

          <section className="gala" id="gala" aria-labelledby="gala-title">
            <div className="wrap">
              <div className="gala-grid">
                <div className="gala-media">
                  <Image
                    alt="Guests gathered at the 2026 WRIC Gala in front of the Women's Rights Information Center backdrop."
                    fill
                    sizes="(min-width: 900px) 46vw, 100vw"
                    src={importedImages.gala}
                  />
                  <span className="gala-tag">2026 Gala - Englewood, NJ</span>
                  <div className="gala-stat">
                    <span className="num">Sold out</span>
                    <span className="lbl">
                      Thank you to every guest, donor, and sponsor who made the
                      night possible.
                    </span>
                  </div>
                </div>
                <div className="gala-copy">
                  <span className="kicker">Thank you</span>
                  <h3
                    className="display h3"
                    id="gala-title"
                    data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'galaTitle'}).toString()}
                  >
                    {gala.title}
                  </h3>
                  <p
                    className="lede gala-lede"
                    data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'galaBody'}).toString()}
                  >
                    {gala.body}
                  </p>
                  <ul className="gala-list">
                    <li>Career counseling, ESL, citizenship classes, and Career Closet</li>
                    <li>Shared Housing matches and homelessness prevention</li>
                    <li>Confidential survivor advocacy and legal support</li>
                    <li>Wellness, counseling, EMDR, and creative arts therapy</li>
                  </ul>
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal(gala.modalId)}
                    type="button"
                  >
                    {gala.actionLabel}
                  </button>
                </div>
              </div>
            </div>
          </section>

         
          <section className="mission" id="mission" aria-labelledby="mission-title">
            <div className="wrap">
              <div className="mission-grid">
                <div>
                  <span className="kicker">Our mission</span>
                  <h2 className="display h2" id="mission-title">
                    Knowledge. Opportunity. <em>Dignity.</em>
                  </h2>
                  <p
                    className="body"
                    data-sanity={dataAttr({id: heroId, type: heroType, path: 'missionStatement'}).toString()}
                  >
                    {mission}
                  </p>
                </div>
                <div className="mission-side">
                  <div className="mission-stat">
                    <div className="num">54 yrs</div>
                    <div className="label">Serving Bergen County since 1972</div>
                  </div>
                  <div className="mission-stat">
                    <div className="num">7</div>
                    <div className="label">Core programs, integrated under one roof</div>
                  </div>
                  <div className="mission-stat">
                    <div className="num">$0</div>
                    <div className="label">Free, low-cost, or subsidized services</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="services" id="services" aria-labelledby="services-title">
            <div className="wrap">
              <div className="section-head">
                <div className="left">
                  <span className="kicker">What we do</span>
                  <h2 className="display h2" id="services-title">
                   All in One Place.
                  </h2>
                </div>
                <div className="right">
                  <p>
                    Seven integrated programs, designed to meet people where they are.
                    Programs are free, low-cost, or subsidized for eligible clients.
                  </p>
                </div>
              </div>

              <div className="services-grid">
                {(sanityServices.length > 0 ? sanityServices : serviceCards).map((item, serviceIndex) => {
                  const sanityItem = sanityServices.length > 0 ? item as SanityService : null;
                  const imageSrc = sanityItem ? stegaClean(sanityItem.image) ?? serviceImages[stegaClean(sanityItem.title)] : serviceImages[item.title];
                  const imageAlt = sanityItem ? (stegaClean(sanityItem.imageAlt) ?? serviceImageAlts[stegaClean(sanityItem.title)] ?? stegaClean(sanityItem.title)) : (serviceImageAlts[item.title] ?? item.title);
                  const layoutClass =
                    serviceIndex === 0
                      ? "showcase"
                      : serviceIndex % 2 === 1
                      ? "right-image-showcase"
                      : "left-image-showcase";

                  return (
                    <article
                      className={`service-card ${layoutClass}`}
                      key={item.title}
                      {...(sanityItem ? {'data-sanity': dataAttr({id: sanityItem._id, type: 'wricService', path: 'title'}).toString()} : {})}
                    >
                      <div className="service-img">
                        {imageSrc ? (
                          <Image
                            alt={imageAlt}
                            fill
                            sizes="(min-width: 900px) 42vw, 100vw"
                            src={imageSrc}
                          />
                        ) : (
                          <div className="ph">
                            <span>{item.title}</span>
                          </div>
                        )}
                      </div>
                      <div className="service-body">
                        <h3
                          {...(sanityItem ? {'data-sanity': dataAttr({id: sanityItem._id, type: 'wricService', path: 'title'}).toString()} : {})}
                        >
                          {item.title}
                        </h3>
                        <p
                          {...(sanityItem ? {'data-sanity': dataAttr({id: sanityItem._id, type: 'wricService', path: 'summary'}).toString()} : {})}
                        >
                          {item.summary}
                        </p>
                        {(sanityItem?.details ?? (item as ServiceCard).details ?? []).length > 0 && (
                          <ul
                            className="service-details"
                            {...(sanityItem ? {'data-sanity': dataAttr({id: sanityItem._id, type: 'wricService', path: 'details'}).toString()} : {})}
                          >
                            {(sanityItem?.details ?? (item as ServiceCard).details ?? []).map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                        <div
                          className="tags"
                          {...(sanityItem ? {'data-sanity': dataAttr({id: sanityItem._id, type: 'wricService', path: 'tags'}).toString()} : {})}
                        >
                          {(sanityItem?.tags ?? serviceTags[stegaClean(item.title)] ?? []).map((tag) => (
                            <span className="tag" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="actions">
                          {(() => {
                            const actionType = (item as SanityService).actionType;
                            const actionUrl = stegaClean((item as SanityService).actionUrl ?? '');
                            const label = (item as SanityService).actionLabel ?? (item as ServiceCard).actionLabel;
                            const dataAttrProp = sanityItem ? {'data-sanity': dataAttr({id: sanityItem._id, type: 'wricService', path: 'actionLabel'}).toString()} : {};
                            const inner = (
                              <>
                                <span>{label}</span>
                                <span aria-hidden="true" className="btn-cue">→</span>
                              </>
                            );
                            if (actionType === 'email' && actionUrl) {
                              return <a className="btn-text" href={`mailto:${actionUrl}`} {...dataAttrProp}>{inner}</a>;
                            }
                            if (actionType === 'link' && actionUrl) {
                              return <a className="btn-text" href={actionUrl} target="_blank" rel="noopener noreferrer" {...dataAttrProp}>{inner}</a>;
                            }
                            return (
                              <button
                                className="btn-text"
                                type="button"
                                onClick={() => openModal((item as SanityService).modalId ?? (item as ServiceCard).modalId ?? 'intake')}
                                {...dataAttrProp}
                              >{inner}</button>
                            );
                          })()}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>


            </div>
          </section>

          <section className="paths" id="get-started" aria-labelledby="started-title">
            <div className="wrap">
              <div className="section-head">
                <div className="left">
                  <span className="kicker">Get started</span>
                  <h2 className="display h2" id="started-title">
                    Take the first step.
                  </h2>
                </div>
                <div className="right">
                  <p>
                    Three clear paths for new clients, returning clients, and people
                    who want to learn more before reaching out.
                  </p>
                </div>
              </div>
              <div className="paths-grid">
                <div className="paths-media">
                  <Image
                    alt="Women walking through open doors as a symbol of taking the first step"
                    fill
                    sizes="(min-width: 900px) 50vw, 100vw"
                    src="/images/misc/first-steps.jpeg"
                  />
                </div>
                {[
                  ["01", "New client", "Complete the intake form", "A short form helps WRIC understand your situation and route you to the right program.", "intake", "Get started with us"],
                  ["02", "Learn about services", "Register for virtual orientation", "Live sessions in English and Spanish walk you through WRIC's programs and how to get started.", "orientation", "Register"],
                  ["03", "Existing client", "Open client program support", "Already enrolled? Use the client portal for ongoing services and program-specific support.", "client-support", "Open portal"]
                ].map(([num, kicker, title, body, modalId, label]) => (
                  <article className="path-card" key={num}>
                    <span className="num">{num}</span>
                    <span className="kicker">{kicker}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <div className="cta">
                      <button
                        className={num === "01" ? "btn btn-dark" : "btn btn-ghost"}
                        onClick={() => openModal(modalId)}
                        type="button"
                      >
                        {label}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <WricHistoryTimeline />

          <WricTeamSection
            sanityStaff={sanityStaff}
            sanityBoard={sanityBoard}
          />

          <section className="support" id="support" aria-labelledby="support-title">
            <div className="wrap">
              <div className="section-head">
                <div className="left">
                  <span className="kicker">Support WRIC</span>
                  <h2 className="display h2" id="support-title">
                    Help keep services <em>available.</em>
                  </h2>
                </div>
                <div className="right">
                  <p>
                    Donors and volunteers fund transportation, classes, legal advocacy,
                    emergency family support, and housing case management.
                  </p>
                </div>
              </div>
              <div className="support-grid">
                {supportCards.map((card, index) => (
                  <article className={`support-card ${index === 0 ? "featured" : ""}`} key={card.title}>
                    <span className="icon">{index + 1}</span>
                    <h3>{card.title}</h3>
                    <p>{card.summary}</p>
                    <div className="cta">
                      <button
                        className="btn-text"
                        onClick={() => openModal(card.modalId)}
                        type="button"
                      >
                        {card.actionLabel}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="contact" id="contact" aria-labelledby="contact-title">
            <div className="wrap">
              <div className="contact-grid">
                <div>
                  <span className="kicker">Contact</span>
                  <h2 className="display h2" id="contact-title">
                    Reach Women&apos;s Rights Information Center.
                  </h2>
                  <p className="lede">
                    For services, start with intake or call during business hours.
                    For general questions, email WRIC. All communication is confidential.
                  </p>
                  <div className="contact-list">
                    <div className="item">
                      <div className="label">Phone - English</div>
                      <div className="value">
                        <a
                          href={contact.phoneHref}
                          data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'phone'}).toString()}
                        >
                          {contact.phone}
                        </a>
                      </div>
                      <div
                        className="sub"
                        data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'hours'}).toString()}
                      >
                        {contact.hours}
                      </div>
                    </div>
                    <div className="item">
                      <div className="label">Phone - Espanol</div>
                      <div className="value">
                        <a
                          href={`tel:+1${stegaClean(contact.phoneSpanish).replace(/\D/g, '')}`}
                          data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'phoneSpanish'}).toString()}
                        >
                          {contact.phoneSpanish}
                        </a>
                      </div>
                      <div className="sub">Lunes a viernes, 9 am - 5 pm</div>
                    </div>
                    <div className="item">
                      <div className="label">Email</div>
                      <div className="value">
                        <a
                          href={contact.emailHref}
                          data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'email'}).toString()}
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                    <div className="item">
                      <div className="label">Address</div>
                      <div
                        className="value"
                        data-sanity={dataAttr({id: settingsId, type: settingsType, path: 'address'}).toString()}
                      >
                        {contact.address}
                      </div>
                    </div>
                  </div>
                </div>
                <aside className="contact-card">
                  <h3>Need help right now?</h3>
                  <p>
                    If you&apos;re in immediate danger, call <strong>911</strong>. For
                    urgent but non-emergency support, WRIC is here during business hours.
                  </p>
                  <div className="row">
                    <span className="ico" aria-hidden="true">☎</span>
                    <span className="txt">
                      <strong>{contact.phone}</strong>
                      Call WRIC - confidential
                    </span>
                  </div>
                  <div className="row">
                    <span className="ico" aria-hidden="true">es</span>
                    <span className="txt">
                      <strong>Para asistencia en Espanol</strong>
                      201.431.5144
                    </span>
                  </div>
                  <div className="row">
                    <span className="ico" aria-hidden="true">↗</span>
                    <span className="txt">
                      <strong>After hours</strong>
                      Use the intake form. WRIC responds next business day.
                    </span>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal("intake")}
                    type="button"
                  >
                    Get started with us
                  </button>
                </aside>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="wrap">
            <div className="top">
              <div className="brand-block">
                <div className="brand">
                  <span className="brand-mark">
                    <Image
                      alt=""
                      height={160}
                      src={importedImages.logo}
                      width={160}
                    />
                  </span>
                  <span className="brand-name">
                    <span className="nm">Women&apos;s Rights Information Center</span>
                    <span className="sub">Est. 1972 - Englewood, NJ</span>
                  </span>
                </div>
                <p>
                  A 501(c)(3) nonprofit providing knowledge and opportunities to
                  support the economic aspirations, self-sufficiency, and emotional
                  well-being of women, families, and communities in Bergen County.
                </p>
              </div>
              <div>
                <h5>Services</h5>
                <ul>
                  <li><a href="#services">Career Services</a></li>
                  <li><a href="#services">Housing</a></li>
                  <li><a href="#services">Victim Services</a></li>
                  <li><a href="#services">Wellness & Trauma</a></li>
                  <li><a href="/videos">Video archive</a></li>
                </ul>
              </div>
              <div>
                <h5>Contact</h5>
                <ul>
                  <li><a href={contact.phoneHref}>{contact.phone}</a></li>
                  <li><a href={contact.emailHref}>Email WRIC</a></li>
                  <li>{contact.address}</li>
                </ul>
              </div>
              <div>
                <h5>Legal</h5>
                <ul>
                  <li>
                    <button
                      className="footer-link-button"
                      onClick={() => openModal("privacy")}
                      type="button"
                    >
                      Privacy Statement
                    </button>
                  </li>
                  <li>
                    <button
                      className="footer-link-button"
                      onClick={() => openModal("terms")}
                      type="button"
                    >
                      Terms of Use
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bottom">
              <span>© 1972-2026 Women&apos;s Rights Information Center</span>
              <div className="footer-social">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="footer-social-link" rel="noreferrer" target="_blank">
                    {s.icon}
                  </a>
                ))}
              </div>
              <span>{contact.taxNote}</span>
            </div>
          </div>
        </footer>

      </div>

      <Modal modal={activeModal} onClose={() => setActiveModalId(null)} />
    </>
  );
}
