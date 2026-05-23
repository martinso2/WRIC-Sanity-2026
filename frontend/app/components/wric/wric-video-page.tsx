"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { GoogleTranslate } from "@/app/components/wric/google-translate";
import { Modal } from "@/app/components/wric/modal";
import { contactDetails, modalContent, type ModalContent } from "@/app/data/wric-content";
import { socialLinks } from "@/app/data/wric-social-links";
import { vimeoVideos, youtubeVideos, type WricVideo } from "@/app/data/wric-videos";

const logo = "/images/logo/wric-logo-building-transparent.png";

function VideoCard({ video }: { video: WricVideo }) {
  return (
    <article className="video-card">
      <div className="video-embed">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={video.embedUrl}
          title={video.title}
        />
      </div>
      <div className="video-card-body">
        <div className="video-meta">
          <span>{video.dateLabel}</span>
          <span>{video.sourcePage}</span>
        </div>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <a href={video.url} rel="noreferrer" target="_blank">
          Open original {video.provider === "vimeo" ? "Vimeo" : "YouTube"} link ↗
        </a>
      </div>
    </article>
  );
}

function VideoSection({
  eyebrow,
  title,
  intro,
  videos
}: {
  eyebrow: string;
  title: string;
  intro: string;
  videos: WricVideo[];
}) {
  return (
    <section className="video-section" aria-labelledby={`${eyebrow}-title`}>
      <div className="video-section-head">
        <span className="kicker">{eyebrow}</span>
        <h2 className="display h2" id={`${eyebrow}-title`}>
          {title}
        </h2>
        <p>{intro}</p>
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.url} video={video} />
        ))}
      </div>
    </section>
  );
}

export function WricVideoPage() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const activeModal = useMemo<ModalContent | null>(
    () => modalContent.find((modal) => modal.id === activeModalId) ?? null,
    [activeModalId]
  );

  function openModal(modalId: string) {
    setActiveModalId(modalId);
  }

  return (
    <>
      <div className="imported-site">
        <header className="site-header">
          <div className="wrap">
            <Link className="brand" href="/" aria-label="WRIC home">
              <span className="brand-mark">
                <Image alt="WRIC building mark" height={160} priority src={logo} width={160} />
              </span>
              <span className="brand-name">
                <span className="nm">Women&apos;s Rights Information Center</span>
                <span className="sub">Est. 1972 - Englewood, NJ</span>
              </span>
            </Link>
            <nav className="nav-primary" aria-label="Primary navigation">
              <Link href="/#services">Services</Link>
              <Link href="/#history">About</Link>
              <Link href="/#team">Staff &amp; Board</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/#support">Donate</Link>
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
                onClick={() => setIsMobileNavOpen((open) => !open)}
                type="button"
              >
                <span className="burger-bar" />
                <span className="burger-bar" />
                <span className="burger-bar" />
              </button>
            </div>
          </div>
          {isMobileNavOpen ? (
            <nav aria-label="Mobile navigation" className="mobile-nav" id="mobile-nav">
              <Link href="/#services" onClick={() => setIsMobileNavOpen(false)}>Services</Link>
              <Link href="/#history" onClick={() => setIsMobileNavOpen(false)}>About</Link>
              <Link href="/#team" onClick={() => setIsMobileNavOpen(false)}>Staff &amp; Board</Link>
              <Link href="/videos" onClick={() => setIsMobileNavOpen(false)}>Videos</Link>
              <Link href="/#support" onClick={() => setIsMobileNavOpen(false)}>Donate</Link>
              <div className="mobile-nav-translate">
                <GoogleTranslate />
              </div>
            </nav>
          ) : null}
        </header>

        <main className="videos-page">
          <section className="videos-hero">
            <video
              aria-hidden="true"
              autoPlay
              className="videos-hero-bg"
              loop
              muted
              playsInline
              poster="/images/hero/blue-silhouettes-right.jpeg"
            >
              <source src="/video/video-bg.mp4" type="video/mp4" />
            </video>
            <div className="videos-hero-overlay" aria-hidden="true" />
            <div className="wrap">
              <Link className="video-back-link" href="/">
                ← Back to WRIC home
              </Link>
              <span className="kicker">Video archive</span>
              <h1 className="display h1">Stories, history, and community impact.</h1>
              <p>
                A working video archive gathered from the current WRIC site inventory.
                Vimeo history interviews are grouped first, followed by YouTube videos
                from services and blog content.
              </p>
            </div>
          </section>

          <div className="wrap">
            <VideoSection
              eyebrow="Vimeo"
              intro="Oral history and archival reflections from WRIC's history content."
              title="History interviews"
              videos={vimeoVideos}
            />
            <VideoSection
              eyebrow="YouTube"
              intro="Program stories, community wellness content, and service-related videos found in the site inventory."
              title="Program videos"
              videos={youtubeVideos}
            />
          </div>
        </main>

        <footer className="site-footer">
          <div className="wrap">
            <div className="top">
              <div className="brand-block">
                <div className="brand">
                  <span className="brand-mark">
                    <Image alt="" height={160} src={logo} width={160} />
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
                  <li><Link href="/#services">Career Services</Link></li>
                  <li><Link href="/#services">Housing</Link></li>
                  <li><Link href="/#services">Victim Services</Link></li>
                  <li><Link href="/#services">Wellness & Trauma</Link></li>
                  <li><Link href="/videos">Video archive</Link></li>
                </ul>
              </div>
              <div>
                <h5>Contact</h5>
                <ul>
                  <li><a href={contactDetails.phoneHref}>{contactDetails.phone}</a></li>
                  <li><a href={contactDetails.emailHref}>Email WRIC</a></li>
                  <li>{contactDetails.address}</li>
                </ul>
              </div>
              <div>
                <h5>Legal</h5>
                <ul>
                  <li><button className="footer-link-button" onClick={() => openModal("privacy")} type="button">Privacy Statement</button></li>
                  <li><button className="footer-link-button" onClick={() => openModal("terms")} type="button">Terms of Use</button></li>
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
              <span>{contactDetails.taxNote}</span>
            </div>
          </div>
        </footer>
      </div>
      <Modal modal={activeModal} onClose={() => setActiveModalId(null)} />
    </>
  );
}
