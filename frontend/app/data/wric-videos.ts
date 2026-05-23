export type VideoProvider = "vimeo" | "youtube";

export type WricVideo = {
  provider: VideoProvider;
  title: string;
  description: string;
  sourcePage: string;
  dateLabel: string;
  sortDate: string;
  url: string;
  embedUrl: string;
};

const vimeoVideoItems: WricVideo[] = [
  {
    provider: "vimeo",
    title: "Original WRIC Board Trustee Josie Smith, Part 1",
    description:
      "Josie Smith talks about the early days of WRIC and the community need that helped shape the Center.",
    sourcePage: "Our History",
    dateLabel: "Oral history",
    sortDate: "1973-01-01",
    url: "https://vimeo.com/773858718",
    embedUrl: "https://player.vimeo.com/video/773858718"
  },
  {
    provider: "vimeo",
    title: "Original WRIC Board Trustee Josie Smith, Part 2",
    description:
      "A continuation of Josie Smith's reflection on WRIC becoming a place built to address women's needs.",
    sourcePage: "Our History",
    dateLabel: "Oral history",
    sortDate: "1973-01-02",
    url: "https://vimeo.com/776030221",
    embedUrl: "https://player.vimeo.com/video/776030221"
  },
  {
    provider: "vimeo",
    title: "A Woman Should Know Her Place: Joan Grzenda, Part 1",
    description:
      "Joan Grzenda talks about the early days of WRIC and the phrase that framed part of its founding advocacy.",
    sourcePage: "Our History",
    dateLabel: "WRIC history",
    sortDate: "2023-01-01",
    url: "https://vimeo.com/790822553",
    embedUrl: "https://player.vimeo.com/video/790822553"
  },
  {
    provider: "vimeo",
    title: "Joan Grzenda, Part 2",
    description:
      "Part two of Joan Grzenda's reflection on WRIC's development, mission, and early work.",
    sourcePage: "Our History",
    dateLabel: "WRIC history",
    sortDate: "2023-01-02",
    url: "https://vimeo.com/790824614",
    embedUrl: "https://player.vimeo.com/video/790824614"
  },
  {
    provider: "vimeo",
    title: "Joan Grzenda, Part 3",
    description:
      "Part three of Joan Grzenda's history interview, connected to WRIC's role as a safety net and source of opportunity.",
    sourcePage: "Our History",
    dateLabel: "WRIC history",
    sortDate: "2023-01-03",
    url: "https://vimeo.com/790824940",
    embedUrl: "https://player.vimeo.com/video/790824940"
  }
];

const youtubeVideoItems: WricVideo[] = [
  {
    provider: "youtube",
    title: "Live Well Health-E Englewood Project",
    description:
      "A WRIC partnership with Englewood Health spotlighting wellness workshops and participant stories from the Live Well project.",
    sourcePage: "Blog: Live Well Health-E Englewood Project",
    dateLabel: "Mar 30, 2021",
    sortDate: "2021-03-30",
    url: "https://www.youtube.com/watch?v=-OANwLrdvAE",
    embedUrl: "https://www.youtube.com/embed/-OANwLrdvAE"
  },
  {
    provider: "youtube",
    title: "3 Things I Wish I Knew Before Working for a Non-Profit",
    description:
      "A Joan Garry video shared from the WRIC blog about moving from corporate work into the nonprofit sector.",
    sourcePage: "Blog: 3 Things I Wish I Knew BEFORE Working for a Non-Profit",
    dateLabel: "Sep 20, 2021",
    sortDate: "2021-09-20",
    url: "https://youtu.be/18Bmtsn161w",
    embedUrl: "https://www.youtube.com/embed/18Bmtsn161w"
  },
  {
    provider: "youtube",
    title: "WRIC - Healing Our Community",
    description:
      "A services overview video connected to WRIC's holistic, client-centered work addressing emotional and economic challenges.",
    sourcePage: "Services Overview",
    dateLabel: "Services overview",
    sortDate: "2024-01-01",
    url: "https://www.youtube.com/watch?v=RLruEi3fIws",
    embedUrl: "https://www.youtube.com/embed/RLruEi3fIws"
  },
  {
    provider: "youtube",
    title: "WRIC Client Testimonial: Karen & Jasmine's Story",
    description:
      "A client story highlighted on the Services Overview page to show the human impact of WRIC's programs.",
    sourcePage: "Services Overview",
    dateLabel: "Services overview",
    sortDate: "2024-01-02",
    url: "https://www.youtube.com/watch?v=bKKwuXyIbkw",
    embedUrl: "https://www.youtube.com/embed/bKKwuXyIbkw"
  }
];

export const vimeoVideos = vimeoVideoItems.toSorted((a, b) =>
  a.sortDate.localeCompare(b.sortDate)
);

export const youtubeVideos = youtubeVideoItems.toSorted((a, b) =>
  a.sortDate.localeCompare(b.sortDate)
);
