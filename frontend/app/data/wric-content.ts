export type ModalContent =
  | {
      id: string;
      title: string;
      description: string;
      type: "embed";
      url: string;
      fallbackLabel: string;
    }
  | {
      id: string;
      title: string;
      description: string;
      type: "linkout";
      url: string;
      buttonLabel: string;
      note?: string;
    }
  | {
      id: string;
      title: string;
      description: string;
      type: "contact";
      fallbackLabel: string;
    }
  | {
      id: string;
      title: string;
      description: string;
      type: "donate";
      url: string;
      buttonLabel: string;
      tiers: { amount: string; impact: string }[];
    }
  | {
      id: string;
      title: string;
      description: string;
      type: "preintake";
    }
  | {
      id: string;
      title: string;
      description: string;
      type: "legal";
      sections: { heading: string; body: string }[];
    };

export type ServiceCard = {
  title: string;
  summary: string;
  details: string[];
  actionLabel: string;
  modalId: string;
};

export const modalContent: ModalContent[] = [
  {
    id: "intake",
    title: "Let's get started",
    description:
      "Tell us a little about yourself. A WRIC team member will follow up within one business day — all communication is confidential.",
    type: "preintake"
  },
  {
    id: "orientation",
    title: "Virtual orientation",
    description:
      "WRIC offers short virtual orientations in English and Spanish so new clients can learn how services work. Click below to open the registration page — it will open in a new tab.",
    type: "linkout",
    url: "https://www.womensrights.org/virtual-orientation",
    buttonLabel: "Register for orientation",
    note: "Sessions are available in English and Spanish."
  },
  {
    id: "donate",
    title: "Donate to WRIC",
    description:
      "Every gift — large or small — directly funds services for women and families in Bergen County.",
    type: "donate",
    url: "https://www.womensrights.org/support-us-3",
    buttonLabel: "Donate now",
    tiers: [
      { amount: "$25", impact: "Provides school supplies for a child starting school." },
      { amount: "$50", impact: "Covers transportation for a client to attend court or job interviews." },
      { amount: "$100", impact: "Funds classes such as ESL, Citizenship, and Financial Management." },
      { amount: "$250", impact: "Supports legal advocacy for a victim of crime, such as domestic violence." },
      { amount: "$500", impact: "Provides emergency support for a family in crisis — groceries, toiletries, cleaning supplies, and transportation." },
      { amount: "$1,000", impact: "Helps a family avoid homelessness by covering emergency housing, tech support for remote work and school, and case management." }
    ]
  },
  {
    id: "volunteer",
    title: "Volunteer with WRIC",
    description:
      "WRIC welcomes volunteers who can help clients build confidence, access resources, and move toward independence. Opportunities may include career support, legal and advocacy help, office support, events, translation, and specialized skills.",
    type: "linkout",
    url: "https://www.womensrights.org/volunteer-1",
    buttonLabel: "Open volunteer page",
    note: "Questions about volunteering? Email mhook@womensrights.org."
  },
  {
    id: "client-support",
    title: "Client program support",
    description:
      "Existing clients can access the WRIC support portal for program-related payments and contributions. Click below to open the portal in a new tab.",
    type: "linkout",
    url: "https://apps.womensrights.org/clientprogramsupport",
    buttonLabel: "Open client portal",
    note: "If you need help accessing your account, call WRIC at 201.568.1166."
  },
  {
    id: "contact",
    title: "Contact WRIC",
    description:
      "Reach WRIC by phone, email, or in person during business hours. Spanish-language assistance is available.",
    type: "contact",
    fallbackLabel: "Email WRIC"
  },
  {
    id: "privacy",
    title: "Privacy Statement",
    description:
      "Women's Rights Information Center respects your privacy and handles personal information with care.",
    type: "legal",
    sections: [
      {
        heading: "Information we collect",
        body:
          "When you contact WRIC, complete an intake form, volunteer, donate, or request information, we may collect information such as your name, contact details, service interests, and any details you choose to share."
      },
      {
        heading: "How we use information",
        body:
          "We use information to respond to inquiries, connect clients with appropriate services, process volunteer or donation requests, improve our programs, and communicate with supporters."
      },
      {
        heading: "Confidentiality",
        body:
          "WRIC treats service-related communications as confidential. We do not sell personal information. Information may be shared only as needed to provide services, comply with legal obligations, protect safety, or with your permission."
      },
      {
        heading: "Third-party forms and services",
        body:
          "Some forms, donation tools, or registration links may open through trusted third-party platforms. Those services may have their own privacy practices."
      },
      {
        heading: "Contact",
        body:
          "Questions about privacy may be directed to Support.WRIC@womensrights.org or by calling 201.568.1166."
      }
    ]
  },
  {
    id: "terms",
    title: "Terms of Use",
    description:
      "Please use this website as an informational resource. It is not a substitute for emergency, legal, medical, or professional advice.",
    type: "legal",
    sections: [
      {
        heading: "Website content",
        body:
          "The information on this website is provided for general informational purposes about WRIC programs, services, events, and ways to get involved."
      },
      {
        heading: "No emergency service",
        body:
          "This website is not monitored as an emergency service. If you are in immediate danger, call 911. For urgent non-emergency support, contact WRIC during business hours."
      },
      {
        heading: "External links",
        body:
          "This website may link to external forms, registration pages, donation platforms, or community resources. WRIC is not responsible for the content or practices of external websites."
      },
      {
        heading: "Acceptable use",
        body:
          "Do not use this website to submit false, harmful, unlawful, or abusive content, or to interfere with the availability or security of the site."
      },
      {
        heading: "Updates",
        body:
          "WRIC may update website content, policies, services, and these terms from time to time."
      }
    ]
  }
];

export const heroActions = [
  {
    label: "Get Help",
    modalId: "intake",
    variant: "primary"
  },
  {
    label: "Call WRIC",
    href: "tel:+12015681166",
    variant: "secondary"
  },
  {
    label: "Donate",
    modalId: "donate",
    variant: "secondary"
  }
] as const;

export const missionStatement =
  "Women's Rights Information Center (WRIC) provides knowledge and opportunities to support the economic aspirations, self-sufficiency, and emotional well-being of individuals so they may live with hope, security, and dignity.";

export const galaMessage = {
  title: "Thank you for making our 2026 Gala a fabulous celebration.",
  body: "Every gift and every ticket helps WRIC continue the work behind our mission: providing knowledge, opportunity, safety, and support so individuals can move toward self-sufficiency, emotional well-being, hope, security, and dignity.",
  actionLabel: "Support the mission",
  modalId: "donate"
};

export const serviceCards: ServiceCard[] = [
  {
    title: "Career Services",
    summary:
      "Job search support, resume help, interview coaching, technology training, ESL, citizenship classes, and a Career Closet.",
    details: [
      "Personalized employment counseling and job search assistance.",
      "Resume development, interview preparation, workplace skills, and financial literacy workshops.",
      "Microsoft Office, digital skills, ESL, citizenship, and training referrals."
    ],
    actionLabel: "Get Started with Us!",
    modalId: "intake"
  },
  {
    title: "Housing",
    summary:
      "Housing search support, homelessness prevention referrals, counseling, and a no-fee Shared Housing Program.",
    details: [
      "Connects homeowners and home seekers through a guided matching process.",
      "Includes screening, background checks, personal references, and compatibility support.",
      "Supports seniors, people with disabilities, single parents, workers, and others seeking affordable housing."
    ],
    actionLabel: "Ask for housing help",
    modalId: "intake"
  },
  {
    title: "Supportive Services",
    summary:
      "Case management, workshops, wellness programs, and support groups that help clients navigate life changes.",
    details: [
      "Workshops include violence prevention, self-esteem, nutrition, stress management, parenting, and financial literacy.",
      "Support groups include loneliness support, Latina women empowerment, and divorce mediation support.",
      "Programs are designed to build confidence, connection, and long-term stability."
    ],
    actionLabel: "Get started",
    modalId: "intake"
  },
  {
    title: "Victim Services",
    summary:
      "Confidential, trauma-informed support for survivors of crime, violence, domestic violence, trafficking, sexual assault, and gun violence.",
    details: [
      "Services can include crisis intervention, safety planning, case management, and legal support.",
      "Support may include help with restraining orders, custody matters, divorce coaching, immigration, and employment rights.",
      "Therapeutic services include counseling, support groups, equine-assisted therapy, creative arts therapy, and EMDR."
    ],
    actionLabel: "Reach support",
    modalId: "intake"
  },
  {
    title: "Domestic Violence Support",
    summary:
      "Support for people experiencing financial, verbal, emotional, physical, or sexual abuse by a partner or loved one.",
    details: [
      "WRIC offers case management, safety planning, emotional support, legal advocacy, and shelter or housing referrals.",
      "Services are victim-centered and trauma-informed.",
      "People of any age, race, gender, sexual orientation, or legal status can seek support."
    ],
    actionLabel: "Talk to WRIC",
    modalId: "contact"
  },
  {
    title: "Human Trafficking Support",
    summary:
      "Advocacy and support for people affected by exploitation, coercion, trafficking, or related violence.",
    details: [
      "WRIC can help connect survivors with safety planning, advocacy, legal resources, and supportive services.",
      "Language should remain clear, private, and survivor-centered.",
      "Clients can contact WRIC directly or begin with the intake form."
    ],
    actionLabel: "Contact WRIC",
    modalId: "contact"
  },
  {
    title: "Wellness & Trauma Support",
    summary:
      "Healing-centered services for people working through trauma and rebuilding stability.",
    details: [
      "Services may include counseling, support groups, EMDR, creative arts therapy, and equine-assisted therapy.",
      "Programs are designed to help clients process trauma, build resilience, and move toward independence.",
      "Eligibility and availability can be confirmed through WRIC intake."
    ],
    actionLabel: "Get Started with Us!",
    modalId: "intake"
  }
];

export const supportCards = [
  {
    title: "Donate",
    summary:
      "Help fund transportation, classes, legal advocacy, emergency family support, and housing case management.",
    actionLabel: "Donate now",
    modalId: "donate"
  },
  {
    title: "Volunteer",
    summary:
      "Help with phones, office support, career coaching, events, legal advocacy, translation, or specialized skills.",
    actionLabel: "Volunteer",
    modalId: "volunteer"
  },
  {
    title: "Client Program Support",
    summary:
      "Use WRIC's current support portal for program-related payments or contributions.",
    actionLabel: "Open support portal",
    modalId: "client-support"
  }
];

export const contactDetails = {
  phone: "201.568.1166",
  phoneHref: "tel:+12015681166",
  email: "Support.WRIC@womensrights.org",
  emailHref: "mailto:Support.WRIC@womensrights.org",
  address: "108 West Palisade Ave, Englewood, NJ 07631",
  hours: "Mon - Thu 9am - 5pm, Fri 9am - 3pm",
  spanish:
    "Para asistencia en Espanol: llamar WRIC al 201-431-5144, de lunes a viernes de 9am-5pm.",
  taxNote:
    "WRIC is a 501(c)(3) tax-exempt organization. ID# 23-7453339."
};

export const aboutHighlights = [
  "Founded in the 1970s as a resource for women seeking reliable information, support, and self-sufficiency.",
  "Based in Englewood, New Jersey, WRIC has supported thousands of people through career, housing, victim services, and wellness programs.",
  "The organization continues to help remove barriers so women, families, and communities can move toward safety, autonomy, and leadership."
];

export const navigationItems = [
  { label: "Services", href: "#services" },
  { label: "Get Started", href: "#get-started" },
  { label: "Support", href: "#support" },
  { label: "Contact", href: "#contact" }
];
