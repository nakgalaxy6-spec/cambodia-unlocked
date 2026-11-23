import { img } from "./images";

/* =========================================================
   TOUR GUIDES
   ========================================================= */

export const guideCategories = [
  { id: "cultural", name: "Cultural Guides", expertise: "Culture & Heritage", items: ["Angkor Wat", "Ta Prohm", "Banteay Srei"] },
  { id: "community", name: "Community Guides", expertise: "Community Tourism", items: ["Floating Villages", "Local Farms", "Rural Communities"] },
  { id: "nature", name: "Nature Guides", expertise: "Nature", items: ["Phnom Kulen", "Hiking", "Wildlife"] },
  { id: "food", name: "Food Guides", expertise: "Food Tours", items: ["Street Food Tours", "Cooking Experiences"] },
  { id: "photography", name: "Photography Guides", expertise: "Photography", items: ["Sunrise Tours", "Sunset Tours"] },
  { id: "adventure", name: "Adventure Guides", expertise: "Adventure", items: ["Cycling", "Trekking", "Kayaking"] },
] as const;

export type GuideCategoryId = (typeof guideCategories)[number]["id"];

export const expertiseList = ["Culture & Heritage", "Food Tours", "Community Tourism", "Nature", "Adventure", "Photography"] as const;
export const coveredAreaList = ["Angkor Wat", "Kampong Phluk", "Lotus Farm", "Phnom Kulen", "Banteay Srei"] as const;

export type TourGuide = {
  slug: string;
  name: string;
  photo?: string;
  cover: string;
  category: GuideCategoryId;
  verified: boolean;
  years: number;
  languages: string[];
  province: string;
  responseRate: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  bio: string;
  expertise: (typeof expertiseList)[number][];
  areas: (typeof coveredAreaList)[number][];
  phone: string;
  whatsapp: string;
  telegram: string;
  email: string;
  tours: { name: string; duration: string; price: string }[];
  reviewList: { name: string; country: string; rating: number; text: string }[];
};

const guideReviews = [
  { name: "Hannah W.", country: "UK", rating: 5, text: "Knew every carving and the story behind it. Felt like touring with a friend." },
  { name: "Minh P.", country: "Vietnam", rating: 5, text: "Replied on WhatsApp within an hour and planned the whole day around us." },
  { name: "Carlos R.", country: "Spain", rating: 4, text: "Great energy, great photos – start early to beat the crowds." },
];

export const tourGuides: TourGuide[] = [
  {
    slug: "dara-sok",
    name: "Dara Sok",
    photo: img.guideDara,
    cover: img.hero,
    category: "cultural",
    verified: true,
    years: 12,
    languages: ["English", "French", "Khmer"],
    province: "Siem Reap",
    responseRate: "98%",
    rating: 5.0,
    reviews: 76,
    priceFrom: 35,
    bio: "History graduate who grew up near Banteay Srei. Dara shares the stories carved into the temple walls and the village life around them.",
    expertise: ["Culture & Heritage", "Photography", "Community Tourism"],
    areas: ["Angkor Wat", "Banteay Srei", "Phnom Kulen"],
    phone: "+855 12 864 200",
    whatsapp: "+855 12 864 200",
    telegram: "@daraguide",
    email: "dara@guides.kh",
    tours: [
      { name: "Angkor Wat sunrise + Ta Prohm", duration: "Half day", price: "$35" },
      { name: "Banteay Srei & village palm sugar", duration: "Full day", price: "$45" },
      { name: "Hidden temples photography walk", duration: "4 hrs", price: "$30" },
    ],
    reviewList: guideReviews,
  },
  {
    slug: "sreymom-chea",
    name: "Sreymom Chea",
    photo: img.guideSreymom,
    cover: img.lotus,
    category: "community",
    verified: true,
    years: 6,
    languages: ["English", "Khmer"],
    province: "Siem Reap",
    responseRate: "95%",
    rating: 4.9,
    reviews: 58,
    priceFrom: 25,
    bio: "Born in a farming village on the Kampong Phluk road. Sreymom leads small groups to lotus farms, floating villages and family kitchens.",
    expertise: ["Community Tourism", "Food Tours", "Nature"],
    areas: ["Kampong Phluk", "Lotus Farm"],
    phone: "+855 12 222 333",
    whatsapp: "+855 12 222 333",
    telegram: "@sreymomguide",
    email: "sreymom@guides.kh",
    tours: [
      { name: "Lotus farm & floating village", duration: "Half day", price: "$25" },
      { name: "Village kitchen food trail", duration: "4 hrs", price: "$28" },
    ],
    reviewList: guideReviews,
  },
  {
    slug: "vuthy-kim",
    name: "Vuthy Kim",
    photo: img.guideDara,
    cover: img.kulen,
    category: "nature",
    verified: true,
    years: 9,
    languages: ["English", "Chinese", "Khmer"],
    province: "Siem Reap",
    responseRate: "92%",
    rating: 4.8,
    reviews: 44,
    priceFrom: 40,
    bio: "Former park ranger on Phnom Kulen. Leads jungle hikes, waterfall swims and wildlife spotting with village families.",
    expertise: ["Nature", "Adventure"],
    areas: ["Phnom Kulen"],
    phone: "+855 12 444 555",
    whatsapp: "+855 12 444 555",
    telegram: "@vuthykulen",
    email: "vuthy@guides.kh",
    tours: [
      { name: "Kulen waterfall hike", duration: "Full day", price: "$40" },
      { name: "Wildlife & birdwatching", duration: "Half day", price: "$30" },
    ],
    reviewList: guideReviews,
  },
  {
    slug: "sophea-lim",
    name: "Sophea Lim",
    photo: img.guideSreymom,
    cover: img.streetFood,
    category: "food",
    verified: true,
    years: 5,
    languages: ["English", "Japanese", "Khmer"],
    province: "Siem Reap",
    responseRate: "97%",
    rating: 4.9,
    reviews: 63,
    priceFrom: 22,
    bio: "Street-food lover who knows every night-market stall. Tours end in a family kitchen cooking fish amok.",
    expertise: ["Food Tours", "Community Tourism"],
    areas: ["Lotus Farm", "Kampong Phluk"],
    phone: "+855 12 666 777",
    whatsapp: "+855 12 666 777",
    telegram: "@sopheafood",
    email: "sophea@guides.kh",
    tours: [
      { name: "Night market street food tour", duration: "3 hrs", price: "$22" },
      { name: "Market + cooking experience", duration: "Half day", price: "$30" },
    ],
    reviewList: guideReviews,
  },
  {
    slug: "rithy-phan",
    name: "Rithy Phan",
    photo: img.guideDara,
    cover: img.taProhm,
    category: "photography",
    verified: false,
    years: 4,
    languages: ["English", "Khmer"],
    province: "Siem Reap",
    responseRate: "89%",
    rating: 4.7,
    reviews: 31,
    priceFrom: 30,
    bio: "Photographer who knows the best sunrise and sunset spots across Angkor – and the quiet ones without crowds.",
    expertise: ["Photography", "Culture & Heritage"],
    areas: ["Angkor Wat", "Banteay Srei"],
    phone: "+855 12 888 999",
    whatsapp: "+855 12 888 999",
    telegram: "@rithyphoto",
    email: "rithy@guides.kh",
    tours: [
      { name: "Angkor sunrise photo tour", duration: "4 hrs", price: "$30" },
      { name: "Sunset at Pre Rup", duration: "2 hrs", price: "$20" },
    ],
    reviewList: guideReviews,
  },
  {
    slug: "channa-ouk",
    name: "Channa Ouk",
    cover: img.bike,
    category: "adventure",
    verified: true,
    years: 7,
    languages: ["English", "German", "Khmer"],
    province: "Siem Reap",
    responseRate: "94%",
    rating: 4.8,
    reviews: 52,
    priceFrom: 22,
    bio: "Cyclist and kayaker who leads rides through rice fields, treks to hidden temples and sunset paddles on the West Baray.",
    expertise: ["Adventure", "Nature"],
    areas: ["Angkor Wat", "Kampong Phluk"],
    phone: "+855 12 121 343",
    whatsapp: "+855 12 121 343",
    telegram: "@channaride",
    email: "channa@guides.kh",
    tours: [
      { name: "Countryside cycling", duration: "Half day", price: "$22" },
      { name: "West Baray sunset kayak", duration: "2 hrs", price: "$25" },
      { name: "Jungle temple trek", duration: "Full day", price: "$45" },
    ],
    reviewList: guideReviews,
  },
];

export const getGuide = (slug: string) => tourGuides.find((g) => g.slug === slug);

/* =========================================================
   TRAVEL SUPPORT
   ========================================================= */

export type SupportItem = { name: string; detail: string; phone?: string; pin?: { x: number; y: number } };
export type SupportGroup = { id: string; title: string; items: { heading: string; entries: SupportItem[] }[] };

export const travelSupport: SupportGroup[] = [
  {
    id: "emergency",
    title: "Emergency",
    items: [
      { heading: "Tourist Police", entries: [{ name: "Siem Reap Tourist Police", detail: "24 hours · English spoken", phone: "012 402 424", pin: { x: 46, y: 50 } }] },
      { heading: "Hospitals", entries: [
        { name: "Royal Angkor International Hospital", detail: "24h emergency · international standard", phone: "063 761 888", pin: { x: 38, y: 36 } },
        { name: "Siem Reap Provincial Hospital", detail: "Public hospital · emergency ward", phone: "063 963 111", pin: { x: 50, y: 48 } },
      ] },
      { heading: "Clinics", entries: [{ name: "Neak Tep Clinic", detail: "Daily 7:00 AM – 9:00 PM", phone: "063 966 600", pin: { x: 44, y: 54 } }] },
      { heading: "Pharmacies", entries: [{ name: "U-Care Pharmacy – Pub Street", detail: "Daily 8:00 AM – 10:00 PM", phone: "063 965 396", pin: { x: 48, y: 56 } }] },
    ],
  },
  {
    id: "transportation",
    title: "Transportation",
    items: [
      { heading: "Airport Transfers", entries: [{ name: "Siem Reap–Angkor Int'l Airport (SAI)", detail: "Shuttle bus and taxi desk at arrivals", phone: "063 900 500", pin: { x: 86, y: 30 } }] },
      { heading: "Taxi Services", entries: [{ name: "Angkor Taxi Co.", detail: "Metered taxis · book via phone or app", phone: "012 555 101" }] },
      { heading: "Tuk Tuk Drivers", entries: [{ name: "Sokha Tuk Tuk Services", detail: "Verified on Cambodia Unlocked", phone: "+855 12 777 888" }] },
      { heading: "Private Drivers", entries: [{ name: "Siem Reap Private Drivers", detail: "Air-con car with English-speaking driver", phone: "012 909 808" }] },
    ],
  },
  {
    id: "resources",
    title: "Travel Resources",
    items: [
      { heading: "Currency Exchange", entries: [{ name: "Old Market money changers", detail: "USD and Riel widely accepted · 1 USD ≈ 4,100 KHR" }] },
      { heading: "Embassy Contacts", entries: [{ name: "Embassies in Phnom Penh", detail: "Most embassies are in Phnom Penh – call before travelling" }] },
      { heading: "Weather Information", entries: [{ name: "Today in Siem Reap", detail: "32°C · Sunny · Dry season Nov – Apr" }] },
      { heading: "Visa Help", entries: [{ name: "Cambodia e-Visa", detail: "Tourist visa on arrival or e-Visa online · 30 days" }] },
    ],
  },
];

/** Original Screen 12 categories – kept as quick links on the Travel Support section. */
export const supportCategories = ["Hospitals", "Emergency Contacts", "Tourist Assistance", "Visitor Information", "Helpful Travel Resources"] as const;

/* =========================================================
   LOCAL EXPERTS
   ========================================================= */

export const expertTypes = ["Historians", "Archaeologists", "Chefs", "Pottery Masters", "Artisans", "Farmers", "Community Leaders"] as const;

export type LocalExpert = {
  slug: string;
  name: string;
  type: (typeof expertTypes)[number];
  title: string;
  photo?: string;
  cover: string;
  story: string;
  expertise: string[];
  community: string;
  workshops: { name: string; duration: string; price: string }[];
  phone: string;
  email: string;
  languages: string[];
  relatedDestination?: string;
  relatedBusiness?: string;
  relatedGuide?: string;
};

export const localExperts: LocalExpert[] = [
  {
    slug: "lok-ta-meas-sam",
    name: "Lok Ta Meas Sam",
    type: "Historians",
    title: "Khmer history storyteller",
    photo: img.expertHistorian,
    cover: img.banteay,
    story: "Meas Sam taught history in Siem Reap for 35 years. In retirement he gives evening talks on the Khmer Empire, reading the temple carvings like a book.",
    expertise: ["Angkor history", "Temple inscriptions", "Khmer legends"],
    community: "Talk fees fund the village library near Banteay Srei.",
    workshops: [{ name: "Reading the walls of Angkor (talk)", duration: "2 hrs", price: "$15" }],
    phone: "+855 12 300 100",
    email: "meassam@experts.kh",
    languages: ["Khmer", "English", "French"],
    relatedDestination: "banteay-srei",
    relatedGuide: "dara-sok",
  },
  {
    slug: "dr-sopheap-ros",
    name: "Dr. Sopheap Ros",
    type: "Archaeologists",
    title: "Angkor field archaeologist",
    cover: img.hero,
    story: "Sopheap has worked on temple restoration for 15 years and shows visitors active dig and conservation sites.",
    expertise: ["Restoration", "Ancient water systems", "Khmer ceramics"],
    community: "Trains young villagers as conservation assistants.",
    workshops: [{ name: "Behind the restoration – site visit", duration: "3 hrs", price: "$30" }],
    phone: "+855 12 300 200",
    email: "sopheap@experts.kh",
    languages: ["Khmer", "English"],
    relatedDestination: "banteay-srei",
    relatedGuide: "dara-sok",
  },
  {
    slug: "grandma-srey-mao",
    name: "Grandma Srey Mao",
    type: "Chefs",
    title: "Village kitchen chef",
    photo: img.cooking,
    cover: img.cooking,
    story: "Srey Mao learned to cook from her mother over a charcoal stove. Her fish amok is the reason most guests come back.",
    expertise: ["Fish amok", "Garden herbs", "Palm sugar desserts"],
    community: "Buys vegetables and fish only from neighbouring families.",
    workshops: [{ name: "Village Cooking Class", duration: "3 hrs", price: "$25" }],
    phone: "+855 12 300 300",
    email: "sreymao@experts.kh",
    languages: ["Khmer", "Basic English"],
    relatedDestination: "village-cooking-class",
    relatedBusiness: "khmer-kitchen-house",
    relatedGuide: "sophea-lim",
  },
  {
    slug: "srey-neang",
    name: "Srey Neang",
    type: "Pottery Masters",
    title: "Master potter, Village Pottery Studio",
    cover: img.pottery,
    story: "Third-generation potter who still uses a kick wheel and wood-fired kiln, teaching apprentices from the village.",
    expertise: ["Wheel throwing", "Wood-fired kilns", "Angkorian glazes"],
    community: "Has trained 14 apprentices, most of them young women.",
    workshops: [{ name: "Village Pottery Workshop", duration: "2 hrs", price: "$18" }],
    phone: "+855 12 345 678",
    email: "hello@villagepottery.kh",
    languages: ["Khmer", "English"],
    relatedDestination: "village-pottery-workshop",
    relatedBusiness: "village-pottery-studio",
  },
  {
    slug: "kong-vibol",
    name: "Kong Vibol",
    type: "Artisans",
    title: "Silk weaver & krama maker",
    cover: img.community,
    story: "Vibol weaves krama scarves on a wooden loom under his house and shows visitors every step from thread to pattern.",
    expertise: ["Silk weaving", "Natural dyes", "Krama patterns"],
    community: "Sells through Artisan Lotus Souvenirs with fair pricing.",
    workshops: [{ name: "Weave your own krama", duration: "2 hrs", price: "$20" }],
    phone: "+855 12 300 500",
    email: "vibol@experts.kh",
    languages: ["Khmer"],
    relatedBusiness: "artisan-lotus-souvenirs",
  },
  {
    slug: "vanna-lotus-farmer",
    name: "Vanna",
    type: "Farmers",
    title: "Lotus Farm founder",
    cover: img.lotus,
    story: "Vanna started welcoming visitors in 2023 so his family could stay in the village. Today 12 families share the income.",
    expertise: ["Lotus farming", "Lotus tea", "Wetland ecology"],
    community: "100% of visit income stays with the Lotus Farm Community.",
    workshops: [{ name: "Lotus Farm Experience", duration: "2 hrs", price: "$20" }],
    phone: "+855 12 300 600",
    email: "vanna@lotusfarm.kh",
    languages: ["Khmer", "Basic English"],
    relatedDestination: "lotus-farm-experience",
    relatedGuide: "sreymom-chea",
  },
  {
    slug: "bunthoeun-committee",
    name: "Bunthoeun",
    type: "Community Leaders",
    title: "Kampong Phluk boat committee",
    cover: img.floating,
    story: "Bunthoeun helped set up the committee that shares boat income fairly between 60+ rowing families.",
    expertise: ["Community tourism", "Fair income sharing", "Mangrove protection"],
    community: "Committee funds the village school and mangrove patrols.",
    workshops: [{ name: "Meet the committee – village walk", duration: "1.5 hrs", price: "$10" }],
    phone: "+855 12 300 700",
    email: "committee@kampongphluk.kh",
    languages: ["Khmer"],
    relatedDestination: "kampong-phluk-floating-village",
    relatedGuide: "sreymom-chea",
  },
];

export const getExpert = (slug: string) => localExperts.find((e) => e.slug === slug);

/* =========================================================
   BUSINESS OWNER PROFILES ("Meet The Owner")
   ========================================================= */

export type OwnerProfile = {
  name: string;
  photo?: string;
  role: string;
  yearsOperating: number;
  languages: string[];
  whyStarted: string;
  family: string;
  communityConnection: string;
  mission: string;
  vision: string;
  businessType: string;
  teamSize: number;
  whatsapp: string;
  website: string;
  province: string;
  district: string;
  village: string;
  gps: string;
  impact: { families: number; staff: number; partnerships: number; suppliers: number };
};

const owners: Record<string, OwnerProfile> = {
  "village-pottery-studio": {
    name: "Chanreay Sok",
    photo: img.ownerChanreay,
    role: "Founder & Owner",
    yearsOperating: 8,
    languages: ["Khmer", "English"],
    whyStarted: "Chanreay opened the studio to visitors so her mother's pottery skills would not disappear with her generation.",
    family: "Three generations of potters – her mother still throws pots on the original kick wheel.",
    communityConnection: "Every workshop pays village artisans directly and clay is dug with permission from neighbouring farms.",
    mission: "Keep Khmer pottery alive by turning it into a fair, steady income for village families.",
    vision: "A village craft school where young Cambodians learn traditional ceramics.",
    businessType: "Community Tourism · Craft workshop",
    teamSize: 9,
    whatsapp: "+855 12 345 678",
    website: "villagepottery.kh",
    province: "Siem Reap",
    district: "Prasat Bakong",
    village: "Kampong Phluk road, Roluos",
    gps: "13.3633° N, 103.8564° E",
    impact: { families: 9, staff: 7, partnerships: 4, suppliers: 6 },
  },
};

export function getOwner(b: { slug: string; name: string; category: string; phone: string; email: string }): OwnerProfile {
  const o = owners[b.slug];
  if (o) return o;
  return {
    name: `${b.name.split(" ")[0]} family`,
    role: "Owner",
    yearsOperating: 5,
    languages: ["Khmer", "English"],
    whyStarted: `The family started ${b.name} to share local Siem Reap life with visitors.`,
    family: "A locally owned, family-run business.",
    communityConnection: "Hires local staff and buys from nearby suppliers.",
    mission: "Offer honest, local service and keep tourism income in Siem Reap.",
    vision: "Grow with the community, not away from it.",
    businessType: b.category,
    teamSize: 4,
    whatsapp: b.phone,
    website: b.email.split("@")[1] ?? "",
    province: "Siem Reap",
    district: "Siem Reap City",
    village: "Svay Dangkum",
    gps: "13.3633° N, 103.8597° E",
    impact: { families: 3, staff: 4, partnerships: 2, suppliers: 3 },
  };
}

/* =========================================================
   TRAVELER PROFILE (Sokchan)
   ========================================================= */

export const travelerProfile = {
  name: "Sokchan Meas",
  photo: img.travelerSokchan,
  country: "Cambodia",
  city: "Phnom Penh",
  language: "English, Khmer",
  email: "sokchan@example.com",
  phone: "+855 10 456 789",
  preferences: ["Culture", "Food", "Community Tourism", "Photography"],
  allPreferences: ["Culture", "Adventure", "Food", "Nature", "Photography", "Community Tourism"],
  budget: "$20 – $40 per experience",
  activity: { trips: 2, visited: 9, reviews: 4, favoriteCategories: ["Community Tourism", "Food & Dining"] },
};

/* =========================================================
   BUSINESS DASHBOARD – team, branches, guide partners
   ========================================================= */

export const teamMembers = [
  { name: "Chanreay Sok", role: "Owner / Manager", language: "Khmer, English", phone: "+855 12 345 678", status: "Active" },
  { name: "Srey Neang", role: "Master potter", language: "Khmer, English", phone: "+855 12 345 679", status: "Active" },
  { name: "Pisey Kong", role: "Workshop host", language: "Khmer, English", phone: "+855 12 345 680", status: "Active" },
  { name: "Rotha Chan", role: "Apprentice", language: "Khmer", phone: "+855 12 345 681", status: "Pending" },
];

export const branchLocations = [
  { location: "Main studio – Roluos", manager: "Chanreay Sok", phone: "+855 12 345 678", hours: "Daily 8:00 AM – 5:00 PM", pin: { x: 44, y: 54 } },
  { location: "Shop – Old Market", manager: "Pisey Kong", phone: "+855 12 345 682", hours: "Daily 10:00 AM – 9:00 PM", pin: { x: 48, y: 50 } },
];

export const guidePartners = [
  { slug: "dara-sok", assigned: "Temple + pottery combo", tours: 18, rating: 5.0, performance: 96 },
  { slug: "sreymom-chea", assigned: "Village craft trail", tours: 11, rating: 4.9, performance: 88 },
  { slug: "sophea-lim", assigned: "Food + craft afternoon", tours: 6, rating: 4.9, performance: 72 },
];
