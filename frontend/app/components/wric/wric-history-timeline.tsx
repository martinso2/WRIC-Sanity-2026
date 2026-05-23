"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Accent = "blue" | "coral" | "teal" | "sage";

type Milestone = {
  year: string;
  title: string;
  body: string;
  image?: { src: string; alt: string };
  accent: Accent;
};

const milestones: Milestone[] = [
  {
    year: "1973",
    title: "A donated office in Hackensack",
    body:
      "Attorney and women's rights advocate Phoebe Seham, along with other inspired women, organizes the Women's Rights Information Center to address the needs of a growing population of women in transition.",
    image: {
      src: "/images/about/our-history-01-phoebeb-w-cropped-full-jpg.jpg",
      alt: "WRIC founder Phoebe Seham."
    },
    accent: "sage"
  },
  {
    year: "1975",
    title: "Incorporated, with paid staff",
    body:
      "WRIC incorporates, rents space in Teaneck, and becomes the first nonprofit able to hire staff through C.E.T.A., a government-sponsored program to help people find temporary jobs.",
    image: {
      src: "/images/logo/wric-logo-building-transparent.png",
      alt: "WRIC building mark."
    },
    accent: "blue"
  },
  {
    year: "1982",
    title: "A home of our own",
    body:
      "Women's Rights Information Center buys an abandoned, deteriorated funeral home in Englewood, the building that will become WRIC's permanent home.",
    image: {
      src: "/images/about/our-history-09-phoebe-archival1-png.png",
      alt: "Archival WRIC history image."
    },
    accent: "blue"
  },
  {
    year: "1983",
    title: "Settled in Englewood",
    body:
      "After hundreds of volunteer hours and a functional plan for the building, WRIC settles into its Englewood home with support from the New Jersey Division on Women.",
    image: {
      src: "/images/hero/homepage-02-wric-building-png.png",
      alt: "WRIC building in Englewood."
    },
    accent: "sage"
  },
  {
    year: "1990s",
    title: "A stand against gender-based violence",
    body:
      "WRIC becomes a recognized Displaced Homemaker program, develops the Career Closet, and joins with domestic violence, sexual abuse, and prosecutor's office partners to take a stand against gender-based violence.",
    image: {
      src: "/images/services/domestic-violence.jpeg",
      alt: "Illustration representing survivor support."
    },
    accent: "teal"
  },
  {
    year: "Today",
    title: "Trauma-informed, and growing",
    body:
      "WRIC continues to expand career services, housing assistance, legal consultations, ESL and citizenship education, and trauma-healing programs including equine-assisted therapy, creative arts therapy, and EMDR.",
    image: {
      src: "/images/timeline/today-1.jpeg",
      alt: "Illustration of women moving upward on a winding staircase."
    },
    accent: "coral"
  }
];

export function WricHistoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const total = rect.height + viewportHeight * 0.4;
      const scrolled = viewportHeight * 0.7 - rect.top;
      const nextProgress = Math.min(1, Math.max(0, scrolled / total));
      setProgress(nextProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((current) => {
          const next = new Set(current);

          for (const entry of entries) {
            const index = Number((entry.target as HTMLElement).dataset.index);

            if (Number.isNaN(index)) {
              continue;
            }

            if (entry.isIntersecting) {
              next.add(index);
            } else {
              next.delete(index);
            }
          }

          return next;
        });
      },
      { rootMargin: "-15% 0px -15% 0px", threshold: 0.2 }
    );

    section
      .querySelectorAll<HTMLElement>("[data-history-item]")
      .forEach((item) => observer.observe(item));

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      aria-labelledby="history-title"
      className="history-timeline"
      id="history"
      ref={sectionRef}
    >
      <div className="wrap">
        <div className="history-head">
          <div className="history-head-copy">
            <span className="kicker">Our history</span>
            <h2 className="display h2" id="history-title">
              Five decades of advocacy &amp;{" "}
              <em>practical support.</em>
            </h2>
            <p>
              From a single donated office in 1973 to a job-training provider and
              trauma-informed service center today, WRIC has grown with the communities
              it serves.
            </p>
            <div className="history-summary">
              <p>
                Founded in the 1970s as a resource for women seeking reliable
                information, support, and self-sufficiency.
              </p>
              <p>
                Based in Englewood, New Jersey, WRIC has supported thousands of people
                through career, housing, victim services, and wellness programs.
              </p>
              <p>
                The organization continues to help remove barriers so women, families,
                and communities can move toward safety, autonomy, and leadership.
              </p>
            </div>
          </div>
          <div className="history-head-image">
            <Image
              alt="WRIC staff and community"
              fill
              sizes="(min-width: 900px) 42vw, 100vw"
              src="/images/about/our-history-05-staff-purple-jpg.jpg"
            />
          </div>
        </div>

        <div className="history-track">
          <div aria-hidden className="history-spine" />
          <div
            aria-hidden
            className="history-spine-fill"
            style={{ height: `${progress * 100}%` }}
          />

          <ol className="history-list">
            {milestones.map((milestone, index) => {
              const side = index % 2 === 0 ? "left" : "right";

              return (
                <li
                  className={`history-item history-item-${side} ${
                    visibleItems.has(index) ? "is-visible" : ""
                  }`}
                  data-history-item
                  data-index={index}
                  key={milestone.year}
                >
                  <span
                    aria-hidden
                    className={`history-dot history-dot-${milestone.accent}`}
                  />
                  {milestone.image ? (
                    <div className="history-visual">
                      <div className={`history-image history-image-${milestone.accent}`}>
                        <Image
                          alt={milestone.image.alt}
                          fill
                          sizes="(min-width: 900px) 22vw, 42vw"
                          src={milestone.image.src}
                        />
                      </div>
                    </div>
                  ) : null}
                  <article className="history-card">
                    <div className="history-year">{milestone.year}</div>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.body}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
