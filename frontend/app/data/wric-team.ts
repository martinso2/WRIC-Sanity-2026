export type StaffMember = {
  name: string;
  title: string;
  email?: string;
  image?: string;
  featured?: boolean;
};

export type BoardMember = {
  name: string;
  role?: string;
};

export const staffMembers: StaffMember[] = [
  {
    name: "Lil Corcoran",
    title: "Executive Director",
    email: "lcorcoran@womensrights.org",
    image: "/images/about/who-we-are-18-lilcrop-jpg.jpg",
    featured: true
  },
  {
    name: "Lisa Maurer",
    title: "Associate Executive Director",
    email: "lmaurer@womensrights.org",
    image: "/images/about/who-we-are-24-lisa-p-new-jpg.jpg",
    featured: true
  },
  {
    name: "Vidalia Acevedo",
    title: "Victim Services Coordinator",
    email: "vacevedo@womensrights.org",
    image: "/images/about/who-we-are-11-vidaliacrop-jpg.jpg",
    featured: true
  },
  {
    name: "Miriam Bloom",
    title: "Development Consultant",
    email: "mbloom@womensrights.org",
    image: "/images/about/who-we-are-23-miriamcrop-jpg.jpg",
    featured: true
  },
  {
    name: "Jenai Bacote",
    title: "Development Manager",
    email: "jbacote@womensrights.org",
    image: "/images/about/who-we-are-04-jenai-pic-new-jpg.jpg"
  },
  {
    name: "Lisa Powers",
    title: "Paralegal / Divorce Coach",
    email: "lpowers@womensrights.org",
    image: "/images/about/who-we-are-10-lisa3crop-jpg.jpg"
  },
  {
    name: "Helayne Weiss",
    title: "Attorney",
    email: "hweiss@womensrights.org",
    image: "/images/about/who-we-are-16-weiss-png.png"
  },
  {
    name: "Matilde Villacorta",
    title: "Career Counselor",
    email: "mvillacorta@womensrights.org",
    image: "/images/about/who-we-are-12-matilda-new-jpg.jpg"
  },
  {
    name: "Vilma Bustamante",
    title: "Victim Advocate",
    email: "vbustamante@womensrights.org",
    image: "/images/about/who-we-are-02-vilma-pic-1-jpg.jpg"
  },
  {
    name: "Andrei Hushcha",
    title: "Computer Technician",
    email: "ahushcha@womensrights.org",
    image: "/images/about/who-we-are-05-andrei-jpeg.jpeg"
  },
  {
    name: "Susan Bendes",
    title: "Shared Housing Manager",
    email: "sbendes@womensrights.org",
    image: "/images/about/who-we-are-19-susancrop-jpg.jpg"
  },
  {
    name: "Sigrid Ceballos",
    title: "Administrative Assistant (Bilingual Espanol)",
    email: "sceballos@womensrights.org",
    image: "/images/about/who-we-are-20-sigrid-jpg.jpg"
  },
  {
    name: "Lesley Greenblatt",
    title: "Displaced Homemaker Case Manager",
    email: "lgreenblatt@womensrights.org",
    image: "/images/about/who-we-are-14-leslie-new-jpg.jpg"
  },
  {
    name: "Sarah Bua",
    title: "Victim Advocate",
    email: "sbua@womensrights.org",
    image: "/images/about/who-we-are-13-sarah-jpg.jpg"
  },
  {
    name: "Gladis Cuadros",
    title: "Work Readiness Coordinator",
    email: "gcuadros@womensrights.org",
    image: "/images/about/who-we-are-03-gladys-jpg.jpg"
  },
  {
    name: "Emily Gonzalez",
    title: "Case Manager (Bilingual Espanol)",
    email: "egonzalez@womensrights.org",
    image: "/images/about/who-we-are-06-emily-jpg.jpg"
  },
  {
    name: "Nikaulys Joaquin",
    title: "Housing Case Manager",
    email: "njoaquin@womensrights.org",
    image: "/images/about/who-we-are-22-nikaulis-jpg.jpg"
  },
  {
    name: "Teja Carroll",
    title: "Finance Director",
    email: "tcarroll@womensrights.org"
  },
  {
    name: "Kathy Maikis",
    title: "Accounting & Development Assistant",
    email: "kmaikis@womensrights.org"
  },
  {
    name: "Leslie Sonkin",
    title: "Marketing Consultant",
    email: "lsonkin@womensrights.org"
  }
];

export const boardMembers: BoardMember[] = [
  { name: "Monica Borg", role: "Chair" },
  { name: "Hon. Monica Honis", role: "Vice Chair" },
  { name: "Jenifer Ippolito", role: "Treasurer" },
  { name: "Brett Thompson", role: "Secretary" },
  { name: "Gia Alvarez" },
  { name: "Alison Berman" },
  { name: "Beth Thomas Cohen" },
  { name: "Pamela DeBlasio" },
  { name: "Susan Del Rio" },
  { name: "Darian Eletto" },
  { name: "Nancy Ferer" },
  { name: "Hon. Mary Heveran" },
  { name: "Chris Johnson" },
  { name: "Peggy Kabakow" },
  { name: "Jennifer B. Krevitt, Esq." },
  { name: "Theresa Napoletano" },
  { name: "Cathy Pierorazio" },
  { name: "Nina Pineda" },
  { name: "Bonnie Shevins" }
];

export const emeritiMembers: BoardMember[] = [
  { name: "Liz Corsini, MPH" },
  { name: "Neal Merker, Esq." },
  { name: "Hon. Ronny Siegal, J.S.C.", role: "Recent Past Chair" },
  { name: "Phoebe Seham, JD", role: "Founder" }
];
