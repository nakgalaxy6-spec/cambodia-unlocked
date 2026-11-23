import { img } from "./images";

export type Pin = { x: number; y: number };

export const destinationCategories = [
  "Culture & Heritage",
  "Community Tourism",
  "Nature & Outdoor",
  "Food & Dining",
  "Adventure Tours",
] as const;

export type Destination = {
  slug: string;
  name: string;
  category: (typeof destinationCategories)[number];
  tag: string;
  location: string;
  area: "Siem Reap Town" | "Countryside" | "Tonle Sap" | "Angkor Park" | "Kulen Mountain";
  rating: number;
  reviews: number;
  price: number;
  budget: "Under $20" | "$20 – $40" | "$40+";
  image: string;
  gallery: string[];
  short: string;
  description: string;
  history: string;
  story: string;
  storySlug: string;
  hours: string;
  openNow: boolean;
  familyFriendly: boolean;
  distance: string;
  pin: Pin;
  provider: string;
};

export const destinations: Destination[] = [
  {
    slug: "lotus-farm-experience",
    name: "Lotus Farm Experience",
    category: "Community Tourism",
    tag: "Nature",
    location: "Kampong Phluk, Siem Reap",
    area: "Countryside",
    rating: 4.7,
    reviews: 86,
    price: 20,
    budget: "$20 – $40",
    image: img.lotus,
    gallery: [img.lotus, img.community, img.cooking, img.bike, img.homestay],
    short: "Paddle through pink lotus fields with a local farming family.",
    description:
      "Join a local family at their lotus farm and learn about traditional farming, try lotus tea, and experience peaceful countryside life just outside Siem Reap.",
    history:
      "Lotus has grown in the wetlands around Siem Reap for centuries. Its seeds, stems and flowers are used in Khmer cooking, temple offerings and traditional medicine. Families here have farmed the same ponds for three generations.",
    story:
      "Every visit helps the Lotus Farm Community keep their ponds productive year-round and send their children to school.",
    storySlug: "lotus-farm-community",
    hours: "Open daily 6:00 AM – 5:00 PM",
    openNow: true,
    familyFriendly: true,
    distance: "About 30 mins from town",
    pin: { x: 58, y: 66 },
    provider: "Lotus Farm Community",
  },
  {
    slug: "kampong-phluk-floating-village",
    name: "Kampong Phluk Floating Village",
    category: "Community Tourism",
    tag: "Community",
    location: "Tonle Sap Lake",
    area: "Tonle Sap",
    rating: 4.6,
    reviews: 142,
    price: 25,
    budget: "$20 – $40",
    image: img.floating,
    gallery: [img.floating, img.community, img.food, img.lotus],
    short: "Stilt houses, mangrove forests and fishing life on the Tonle Sap.",
    description:
      "Glide by wooden boat through a village of stilt houses that rise up to ten metres above the dry-season ground, then explore a flooded mangrove forest with a local rower.",
    history:
      "Kampong Phluk has been a fishing community for generations, adapting to the Tonle Sap lake's dramatic rise and fall each year.",
    story:
      "Boat fees go to the village community committee, which shares income between local boat families.",
    storySlug: "floating-village-fishers",
    hours: "Open daily 7:00 AM – 6:00 PM",
    openNow: true,
    familyFriendly: true,
    distance: "About 45 mins from town",
    pin: { x: 66, y: 84 },
    provider: "Kampong Phluk Community Boats",
  },
  {
    slug: "phnom-kulen",
    name: "Phnom Kulen",
    category: "Nature & Outdoor",
    tag: "Nature",
    location: "Kulen Mountain National Park",
    area: "Kulen Mountain",
    rating: 4.5,
    reviews: 118,
    price: 20,
    budget: "$20 – $40",
    image: img.kulen,
    gallery: [img.kulen, img.bike, img.banteay],
    short: "Sacred mountain, jungle waterfalls and a riverbed of carvings.",
    description:
      "Hike through jungle to Kulen's famous waterfall, visit the River of a Thousand Lingas and the reclining Buddha at the mountain-top pagoda.",
    history:
      "In 802 AD King Jayavarman II declared himself universal monarch on Phnom Kulen, marking the birth of the Khmer Empire.",
    story: "Local guides from Kulen villages lead hikes and share the mountain's legends.",
    storySlug: "lotus-farm-community",
    hours: "Open daily 7:00 AM – 5:00 PM",
    openNow: false,
    familyFriendly: true,
    distance: "About 1.5 hrs from town",
    pin: { x: 80, y: 16 },
    provider: "Kulen Village Guides",
  },
  {
    slug: "banteay-srei",
    name: "Banteay Srei",
    category: "Culture & Heritage",
    tag: "Culture",
    location: "Angkor Archaeological Park",
    area: "Angkor Park",
    rating: 4.8,
    reviews: 201,
    price: 37,
    budget: "$20 – $40",
    image: img.banteay,
    gallery: [img.banteay, img.hero, img.kulen],
    short: "The 'Citadel of Women' – finest pink sandstone carvings in Angkor.",
    description:
      "A small 10th-century temple dedicated to Shiva, famous for its intricate pink sandstone carvings, among the most detailed in the Angkor region.",
    history:
      "Consecrated in 967 AD, Banteay Srei was built not by a king but by royal counsellors. It was rediscovered in 1914.",
    story: "Nearby villages sell palm sugar and handicrafts made by local families.",
    storySlug: "pottery-village-artisans",
    hours: "Open daily 7:30 AM – 5:30 PM",
    openNow: true,
    familyFriendly: true,
    distance: "About 45 mins from town",
    pin: { x: 72, y: 28 },
    provider: "Angkor Park (Angkor Pass required)",
  },
  {
    slug: "village-pottery-workshop",
    name: "Village Pottery Workshop",
    category: "Culture & Heritage",
    tag: "Culture",
    location: "Local craft studio, Siem Reap",
    area: "Siem Reap Town",
    rating: 4.9,
    reviews: 64,
    price: 18,
    budget: "Under $20",
    image: img.pottery,
    gallery: [img.pottery, img.community, img.cooking],
    short: "Shape your own clay pot with Khmer artisans.",
    description:
      "A hands-on workshop with a family pottery studio using traditional Khmer techniques. Take your piece home after it is fired.",
    history:
      "Khmer ceramics date back over a thousand years, with kilns found near Phnom Kulen producing glazed wares for the Angkor court.",
    story: "Workshops directly support artisan families keeping the craft alive.",
    storySlug: "pottery-village-artisans",
    hours: "Open daily 8:00 AM – 5:00 PM",
    openNow: true,
    familyFriendly: true,
    distance: "15 mins from town",
    pin: { x: 44, y: 54 },
    provider: "Village Pottery Studio",
  },
  {
    slug: "village-cooking-class",
    name: "Village Cooking Class",
    category: "Food & Dining",
    tag: "Food",
    location: "Local family home",
    area: "Countryside",
    rating: 4.8,
    reviews: 120,
    price: 25,
    budget: "$20 – $40",
    image: img.cooking,
    gallery: [img.cooking, img.food, img.homestay],
    short: "Cook fish amok in a family kitchen with herbs from the garden.",
    description:
      "Market visit, garden herb picking and a hands-on class cooking three Khmer dishes with a local grandmother.",
    history:
      "Amok, steamed curry in banana leaf, is one of Cambodia's best-loved dishes and is still cooked over charcoal in village homes.",
    story: "The class is run by a family who started cooking for guests after the pandemic.",
    storySlug: "lotus-farm-community",
    hours: "Classes at 9:00 AM and 3:00 PM",
    openNow: true,
    familyFriendly: true,
    distance: "20 mins from town",
    pin: { x: 36, y: 62 },
    provider: "Grandma Srey's Kitchen",
  },
  {
    slug: "countryside-bicycle-tour",
    name: "Countryside Bicycle Tour",
    category: "Adventure Tours",
    tag: "Community",
    location: "Rural villages & rice fields",
    area: "Countryside",
    rating: 4.6,
    reviews: 91,
    price: 22,
    budget: "$20 – $40",
    image: img.bike,
    gallery: [img.bike, img.homestay, img.community],
    short: "Pedal past rice paddies, sugar palms and village life.",
    description:
      "A gentle half-day ride on village paths with stops for palm sugar, rice wine making and a home visit.",
    history:
      "The rice fields around Siem Reap still use the ancient Angkorian water systems of barays and canals.",
    story: "Guides grew up in the villages along the route.",
    storySlug: "lotus-farm-community",
    hours: "Departs 7:00 AM and 2:00 PM",
    openNow: false,
    familyFriendly: false,
    distance: "Pickup from town",
    pin: { x: 26, y: 40 },
    provider: "Countryside Bike Tours",
  },
];

export const businessCategories = [
  "Restaurants",
  "Cafes",
  "Hotels",
  "Guesthouses",
  "Homestays",
  "Tour Guides",
  "Adventure Tours",
  "Bike Rental",
  "Moto Rental",
  "Tuk Tuk Services",
  "Community Tourism",
  "Tour Operators",
  "Souvenir Shops",
] as const;

export type Business = {
  slug: string;
  name: string;
  category: (typeof businessCategories)[number];
  tagline: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  location: string;
  priceFrom: number;
  premium: boolean;
  verified: boolean;
  story: string;
  services: { name: string; price: string }[];
  hours: string;
  phone: string;
  email: string;
  social: { facebook: string; instagram: string; telegram: string };
  pin: Pin;
  reviewList: { name: string; country: string; rating: number; date: string; text: string }[];
};

const baseReviews = [
  { name: "Emma L.", country: "Australia", rating: 5, date: "Oct 2026", text: "The most meaningful afternoon of our trip. Warm, patient and genuinely local." },
  { name: "Kenji T.", country: "Japan", rating: 5, date: "Sep 2026", text: "Easy to contact through Cambodia Unlocked and they replied the same day." },
  { name: "Lucas M.", country: "France", rating: 4, date: "Aug 2026", text: "Great experience, a bit hard to find – use the map directions." },
];

export const businesses: Business[] = [
  {
    slug: "village-pottery-studio",
    name: "Village Pottery Studio",
    category: "Community Tourism",
    tagline: "Handmade ceramics. Stronger local communities.",
    image: img.pottery,
    gallery: [img.pottery, img.community, img.cooking, img.homestay],
    rating: 4.9,
    reviews: 64,
    location: "Siem Reap",
    priceFrom: 18,
    premium: true,
    verified: true,
    story:
      "A local family-run studio creating beautiful handmade pottery using traditional techniques. Visitors can join a hands-on workshop, meet the artisans, and support local livelihoods.",
    services: [
      { name: "Handmade pottery", price: "From $5" },
      { name: "Workshops for visitors (2 hrs)", price: "$18 / person" },
      { name: "Family workshop (up to 4)", price: "$60" },
      { name: "Support local artisans – studio tour", price: "Free" },
    ],
    hours: "Open daily 8:00 AM – 5:00 PM",
    phone: "+855 12 345 678",
    email: "hello@villagepottery.kh",
    social: { facebook: "VillagePotterySR", instagram: "@villagepottery.kh", telegram: "@villagepottery" },
    pin: { x: 44, y: 54 },
    reviewList: baseReviews,
  },
  {
    slug: "lotus-leaf-cafe",
    name: "Lotus Leaf Café",
    category: "Cafes",
    tagline: "Lotus tea, Khmer coffee and fresh pastries.",
    image: img.cafe,
    gallery: [img.cafe, img.lotus, img.food],
    rating: 4.7,
    reviews: 88,
    location: "Wat Bo Road, Siem Reap",
    priceFrom: 3,
    premium: true,
    verified: true,
    story: "A small café sourcing lotus tea directly from the Lotus Farm Community.",
    services: [
      { name: "Lotus tea", price: "$3" },
      { name: "Khmer iced coffee", price: "$2.5" },
      { name: "Breakfast set", price: "$6" },
    ],
    hours: "Open daily 7:00 AM – 9:00 PM",
    phone: "+855 12 111 222",
    email: "hi@lotusleaf.kh",
    social: { facebook: "LotusLeafCafe", instagram: "@lotusleaf.sr", telegram: "@lotusleaf" },
    pin: { x: 47, y: 48 },
    reviewList: baseReviews,
  },
  {
    slug: "khmer-kitchen-house",
    name: "Local Food House",
    category: "Restaurants",
    tagline: "Family recipes from Siem Reap province.",
    image: img.food,
    gallery: [img.food, img.cooking],
    rating: 4.6,
    reviews: 152,
    location: "Old Market area",
    priceFrom: 5,
    premium: false,
    verified: true,
    story: "Three sisters cooking the dishes their mother taught them – amok, lok lak and num banh chok.",
    services: [
      { name: "Fish amok", price: "$6" },
      { name: "Beef lok lak", price: "$7" },
      { name: "Family set for 4", price: "$28" },
    ],
    hours: "Open daily 10:00 AM – 10:00 PM",
    phone: "+855 12 333 444",
    email: "eat@localfoodhouse.kh",
    social: { facebook: "LocalFoodHouseSR", instagram: "@localfoodhouse", telegram: "@localfoodhouse" },
    pin: { x: 50, y: 52 },
    reviewList: baseReviews,
  },
  {
    slug: "mekong-homestay",
    name: "Mekong Homestay",
    category: "Homestays",
    tagline: "Sleep in a traditional Khmer stilt house.",
    image: img.homestay,
    gallery: [img.homestay, img.community, img.bike],
    rating: 4.8,
    reviews: 47,
    location: "Kampong Phluk road",
    priceFrom: 15,
    premium: false,
    verified: false,
    story: "A farming family opened two rooms of their wooden house to travelers wanting village life.",
    services: [
      { name: "Room with breakfast", price: "$15 / night" },
      { name: "Home-cooked dinner", price: "$5" },
      { name: "Village walk", price: "Free" },
    ],
    hours: "Check-in from 2:00 PM",
    phone: "+855 12 555 666",
    email: "stay@mekonghomestay.kh",
    social: { facebook: "MekongHomestay", instagram: "@mekonghomestay", telegram: "@mekonghomestay" },
    pin: { x: 60, y: 74 },
    reviewList: baseReviews,
  },
  {
    slug: "sokha-tuk-tuk",
    name: "Sokha Tuk Tuk Services",
    category: "Tuk Tuk Services",
    tagline: "Friendly English-speaking driver, temple circuits.",
    image: img.tuktuk,
    gallery: [img.tuktuk, img.hero],
    rating: 4.9,
    reviews: 210,
    location: "Siem Reap Town",
    priceFrom: 15,
    premium: true,
    verified: true,
    story: "Sokha has driven visitors around Angkor for 12 years and knows every sunrise spot.",
    services: [
      { name: "Small temple circuit", price: "$18 / day" },
      { name: "Grand circuit", price: "$22 / day" },
      { name: "Airport transfer", price: "$10" },
    ],
    hours: "Daily 4:30 AM – 9:00 PM",
    phone: "+855 12 777 888",
    email: "sokha@tuktuk.kh",
    social: { facebook: "SokhaTukTuk", instagram: "@sokhatuktuk", telegram: "@sokhatuktuk" },
    pin: { x: 42, y: 44 },
    reviewList: baseReviews,
  },
  {
    slug: "countryside-bike-tours",
    name: "Countryside Bike Tours",
    category: "Adventure Tours",
    tagline: "Half-day rides through villages and rice fields.",
    image: img.bike,
    gallery: [img.bike, img.homestay],
    rating: 4.6,
    reviews: 91,
    location: "Siem Reap",
    priceFrom: 22,
    premium: false,
    verified: false,
    story: "Started by two village guides who wanted visitors to see beyond the temples.",
    services: [
      { name: "Half-day village ride", price: "$22" },
      { name: "Sunset ride", price: "$18" },
    ],
    hours: "Departures 7:00 AM and 2:00 PM",
    phone: "+855 12 999 000",
    email: "ride@countrysidebikes.kh",
    social: { facebook: "CountrysideBikesSR", instagram: "@countrysidebikes", telegram: "@countrysidebikes" },
    pin: { x: 28, y: 40 },
    reviewList: baseReviews,
  },
  {
    slug: "angkor-bike-rental",
    name: "Angkor Bike Rental",
    category: "Bike Rental",
    tagline: "City and mountain bikes by the day.",
    image: img.bikeRental,
    gallery: [img.bikeRental, img.bike],
    rating: 4.4,
    reviews: 39,
    location: "Sivatha Blvd",
    priceFrom: 3,
    premium: false,
    verified: true,
    story: "Well-maintained bikes, helmets and maps for self-guided temple rides.",
    services: [
      { name: "City bike", price: "$3 / day" },
      { name: "Mountain bike", price: "$8 / day" },
    ],
    hours: "Daily 6:00 AM – 8:00 PM",
    phone: "+855 12 246 810",
    email: "rent@angkorbikes.kh",
    social: { facebook: "AngkorBikeRental", instagram: "@angkorbikes", telegram: "@angkorbikes" },
    pin: { x: 46, y: 42 },
    reviewList: baseReviews,
  },
  {
    slug: "siem-reap-moto-rental",
    name: "Siem Reap Moto Rental",
    category: "Moto Rental",
    tagline: "Scooters with helmets and local SIM.",
    image: img.motoRental,
    gallery: [img.motoRental],
    rating: 4.3,
    reviews: 27,
    location: "Taphul Road",
    priceFrom: 8,
    premium: false,
    verified: true,
    story: "A family workshop that rents and repairs scooters.",
    services: [{ name: "Scooter", price: "$8 / day" }],
    hours: "Daily 7:00 AM – 7:00 PM",
    phone: "+855 12 135 790",
    email: "moto@srmoto.kh",
    social: { facebook: "SRMotoRental", instagram: "@srmoto", telegram: "@srmoto" },
    pin: { x: 40, y: 50 },
    reviewList: baseReviews,
  },
  {
    slug: "dara-local-guide",
    name: "Dara – Licensed Local Guide",
    category: "Tour Guides",
    tagline: "History graduate, English & French.",
    image: img.guideDara,
    gallery: [img.guideDara, img.banteay, img.hero],
    rating: 5,
    reviews: 76,
    location: "Siem Reap",
    priceFrom: 35,
    premium: true,
    verified: true,
    story: "Dara grew up near Banteay Srei and shares the stories carved in its walls.",
    services: [
      { name: "Full-day temple guiding", price: "$35" },
      { name: "Sunrise + Angkor Wat", price: "$25" },
    ],
    hours: "By appointment",
    phone: "+855 12 864 200",
    email: "dara@guides.kh",
    social: { facebook: "DaraGuide", instagram: "@daraguide", telegram: "@daraguide" },
    pin: { x: 52, y: 30 },
    reviewList: baseReviews,
  },
  {
    slug: "riverside-guesthouse",
    name: "Riverside Guesthouse",
    category: "Guesthouses",
    tagline: "Quiet rooms by the Siem Reap river.",
    image: img.guesthouse,
    gallery: [img.guesthouse, img.countryside],
    rating: 4.5,
    reviews: 58,
    location: "Riverside, Siem Reap",
    priceFrom: 18,
    premium: false,
    verified: true,
    story: "Locally owned guesthouse with a garden breakfast.",
    services: [{ name: "Double room", price: "$18 / night" }],
    hours: "24-hour reception",
    phone: "+855 12 424 242",
    email: "stay@riverside.kh",
    social: { facebook: "RiversideGH", instagram: "@riversidegh", telegram: "@riversidegh" },
    pin: { x: 48, y: 56 },
    reviewList: baseReviews,
  },
  {
    slug: "treeline-boutique-hotel",
    name: "Banyan Boutique Hotel",
    category: "Hotels",
    tagline: "Khmer design, local staff, pool garden.",
    image: img.boutiqueHotel,
    gallery: [img.boutiqueHotel, img.guesthouse],
    rating: 4.7,
    reviews: 134,
    location: "Wat Bo, Siem Reap",
    priceFrom: 55,
    premium: true,
    verified: true,
    story: "A 20-room hotel employing and training staff from surrounding villages.",
    services: [{ name: "Deluxe room", price: "$55 / night" }],
    hours: "24-hour reception",
    phone: "+855 12 606 606",
    email: "stay@banyanboutique.kh",
    social: { facebook: "BanyanBoutique", instagram: "@banyanboutique", telegram: "@banyanboutique" },
    pin: { x: 50, y: 46 },
    reviewList: baseReviews,
  },
  {
    slug: "angkor-heritage-tours",
    name: "Angkor Heritage Tours",
    category: "Tour Operators",
    tagline: "Small-group temple and village tours run by local guides.",
    image: img.tourOperator,
    gallery: [img.tourOperator, img.hero, img.taProhm, img.banteay],
    rating: 4.8,
    reviews: 97,
    location: "Sivatha Blvd, Siem Reap",
    priceFrom: 30,
    premium: true,
    verified: true,
    story: "A locally owned tour operator that partners with licensed guides from Siem Reap villages and pays them fairly.",
    services: [
      { name: "Angkor small circuit (group)", price: "$30 / person" },
      { name: "Temples + floating village", price: "$45 / person" },
    ],
    hours: "Daily 7:00 AM – 7:00 PM",
    phone: "+855 12 515 151",
    email: "tours@angkorheritage.kh",
    social: { facebook: "AngkorHeritageTours", instagram: "@angkorheritage", telegram: "@angkorheritage" },
    pin: { x: 54, y: 38 },
    reviewList: baseReviews,
  },
  {
    slug: "artisan-lotus-souvenirs",
    name: "Artisan Lotus Souvenirs",
    category: "Souvenir Shops",
    tagline: "Krama scarves, lotus silk and pottery made by local artisans.",
    image: img.souvenirs,
    gallery: [img.souvenirs, img.pottery, img.lotus],
    rating: 4.6,
    reviews: 41,
    location: "Old Market, Siem Reap",
    priceFrom: 4,
    premium: false,
    verified: true,
    story: "A fair-trade shop where every item is labelled with the name of the artisan family who made it.",
    services: [
      { name: "Handwoven krama", price: "From $6" },
      { name: "Mini pottery set", price: "From $4" },
    ],
    hours: "Daily 9:00 AM – 10:00 PM",
    phone: "+855 12 616 161",
    email: "shop@artisanlotus.kh",
    social: { facebook: "ArtisanLotus", instagram: "@artisanlotus", telegram: "@artisanlotus" },
    pin: { x: 49, y: 54 },
    reviewList: baseReviews,
  },
];

export type EventPeriod = "Today" | "This Week" | "This Month" | "Annual Festivals";
export type EventItem = {
  slug: string;
  name: string;
  date: string;
  month: string;
  day: string;
  location: string;
  category: string;
  organizer: string;
  image: string;
  periods: EventPeriod[];
  description: string;
};

export const events: EventItem[] = [
  { slug: "pub-street-apsara-night", name: "Apsara Dance Evening", date: "Today · 7:00 PM", month: "NOV", day: "21", location: "Old Market stage, Siem Reap", category: "Culture", organizer: "Siem Reap Arts Collective", image: img.apsara, periods: ["Today", "This Week", "This Month"], description: "Traditional Apsara dance performed by young artists trained in the village." },
  { slug: "lotus-harvest-day", name: "Lotus Harvest Community Day", date: "Sun 22 Nov · 6:30 AM", month: "NOV", day: "22", location: "Lotus Farm, Kampong Phluk road", category: "Community", organizer: "Lotus Farm Community", image: img.lotus, periods: ["This Week", "This Month"], description: "Join families harvesting lotus at sunrise, followed by lotus tea and breakfast." },
  { slug: "pottery-open-studio", name: "Pottery Village Open Studio", date: "Wed 25 Nov · 9:00 AM", month: "NOV", day: "25", location: "Village Pottery Studio", category: "Workshop", organizer: "Village Pottery Studio", image: img.pottery, periods: ["This Week", "This Month"], description: "Free entry to watch artisans at work and try the wheel." },
  { slug: "floating-village-blessing", name: "Floating Village Boat Blessing", date: "Sat 12 Dec · 8:00 AM", month: "DEC", day: "12", location: "Kampong Phluk", category: "Local Community Festival", organizer: "Kampong Phluk Committee", image: img.floating, periods: ["This Month"], description: "Monks bless the boats ahead of fishing season – a local community festival." },
  { slug: "khmer-new-year", name: "Khmer New Year", date: "14 – 16 Apr 2027", month: "APR", day: "14", location: "Nationwide · Siem Reap temples", category: "Annual Festival", organizer: "Ministry of Culture & Fine Arts", image: img.newYear, periods: ["Annual Festivals"], description: "Cambodia's biggest celebration with traditional games, water blessings and pagoda visits." },
  { slug: "angkor-sankranta", name: "Angkor Sankranta", date: "14 – 16 Apr 2027", month: "APR", day: "14", location: "Angkor Archaeological Park", category: "Annual Festival", organizer: "Angkor Sankranta Committee", image: img.hero, periods: ["Annual Festivals"], description: "New Year festival in front of the temples with music, games and Khmer food." },
  { slug: "water-festival", name: "Water Festival (Bon Om Touk)", date: "Nov (full moon)", month: "NOV", day: "—", location: "Siem Reap River", category: "Annual Festival", organizer: "Siem Reap Provincial Hall", image: img.water, periods: ["Annual Festivals"], description: "Colourful dragon-boat races mark the reversal of the Tonle Sap river." },
  { slug: "community-food-fair", name: "Local Community Food Fair", date: "Sun 6 Dec · 4:00 PM", month: "DEC", day: "6", location: "Wat Bo grounds", category: "Local Community Festival", organizer: "Siem Reap Local Producers", image: img.streetFood, periods: ["This Month"], description: "Home cooks and farmers sell local dishes, palm sugar and crafts." },
];

export const storyCategories = ["Villages", "Homestays", "Farmers", "Artisans", "Tour Guides", "Community Projects", "Local Businesses"] as const;

export type Story = {
  slug: string;
  category: (typeof storyCategories)[number];
  title: string;
  subtitle: string;
  image: string;
  background: string[];
  impact: { label: string; value: string }[];
  families: { name: string; role: string; quote: string }[];
  gallery: string[];
  why: string[];
  related: string[];
};

export const stories: Story[] = [
  {
    slug: "lotus-farm-community",
    category: "Farmers",
    title: "Lotus Farm Community",
    subtitle: "How three generations turned their ponds into a living classroom.",
    image: img.community,
    background: [
      "For decades, families on the road to Kampong Phluk sold lotus stems at the market for very little. Middlemen set the prices, and in the dry season income almost stopped.",
      "In 2023 four families began welcoming small groups of visitors to paddle through the ponds, learn how lotus is grown and taste lotus tea made by hand. Today, the farm is one of the most loved community experiences in Siem Reap.",
    ],
    impact: [
      { label: "Families involved", value: "12" },
      { label: "Children supported in school", value: "28" },
      { label: "Income kept in village", value: "100%" },
    ],
    families: [
      { name: "Grandma Yeay Sok", role: "Lotus tea maker", quote: "When visitors come, my grandchildren see our work has value." },
      { name: "Chanthy", role: "Boat guide", quote: "I learned English so I can tell our story myself." },
      { name: "Vanna", role: "Farm founder", quote: "Tourism lets us stay in our village instead of moving to the city." },
    ],
    gallery: [img.community, img.lotus, img.cooking, img.homestay, img.bike, img.food],
    why: [
      "Your fee goes directly to farming families – no middlemen.",
      "Supports year-round income when lotus prices drop.",
      "Keeps young people in the village with meaningful jobs.",
      "Protects traditional wetland farming knowledge.",
    ],
    related: ["lotus-farm-experience", "village-cooking-class", "countryside-bicycle-tour"],
  },
  {
    slug: "floating-village-fishers",
    category: "Villages",
    title: "Floating Village Fishers",
    subtitle: "Life that rises and falls with the Tonle Sap.",
    image: img.floating,
    background: [
      "Kampong Phluk's families live in stilt houses built to survive a lake that grows five times larger each wet season.",
      "A shared boat committee now organises visits so that income is shared fairly among rowing families.",
    ],
    impact: [
      { label: "Boat families", value: "60+" },
      { label: "Mangrove hectares protected", value: "Community-run" },
      { label: "Shared income model", value: "Yes" },
    ],
    families: [
      { name: "Srey Pov", role: "Rower", quote: "Visitors help us through the months when fish are few." },
      { name: "Bunthoeun", role: "Committee member", quote: "We decide together how tourism money is shared." },
    ],
    gallery: [img.floating, img.community, img.food, img.lotus],
    why: ["Fair boat rotation for every family.", "Funds the village school and mangrove protection.", "Authentic daily life, not a show."],
    related: ["kampong-phluk-floating-village", "lotus-farm-experience"],
  },
  {
    slug: "pottery-village-artisans",
    category: "Artisans",
    title: "Pottery Village Artisans",
    subtitle: "Keeping a thousand-year-old Khmer craft alive.",
    image: img.pottery,
    background: [
      "Khmer ceramics were once made for the Angkor court. Today only a few families still work clay by hand.",
      "Visitor workshops give artisans a steady income and a reason to train the next generation.",
    ],
    impact: [
      { label: "Artisans", value: "9" },
      { label: "Apprentices trained", value: "14" },
      { label: "Workshops per month", value: "40+" },
    ],
    families: [{ name: "Srey Neang", role: "Master potter", quote: "Every pot a visitor makes keeps our craft alive." }],
    gallery: [img.pottery, img.community, img.banteay],
    why: ["Direct income for artisan families.", "Preserves traditional techniques.", "Hands-on, meaningful souvenir."],
    related: ["village-pottery-workshop", "banteay-srei"],
  },
  {
    slug: "mekong-homestay-family",
    category: "Homestays",
    title: "A Night with the Homestay Family",
    subtitle: "Two rooms, one wooden house and a family that opened its doors.",
    image: img.homestay,
    background: [
      "When rice prices fell, the Phan family turned two rooms of their stilt house into a homestay.",
      "Guests eat with the family, help in the garden and fall asleep to the sound of frogs in the paddies.",
    ],
    impact: [
      { label: "Guests hosted", value: "320+" },
      { label: "Village cooks employed", value: "3" },
      { label: "Nights booked direct", value: "100%" },
    ],
    families: [{ name: "Mrs. Phan", role: "Host", quote: "Guests become family by the second dinner." }],
    gallery: [img.homestay, img.community, img.bike, img.food],
    why: ["Income goes straight to the host family.", "Keeps village houses lived in.", "Real everyday life – no performance."],
    related: ["countryside-bicycle-tour", "village-cooking-class"],
  },
  {
    slug: "dara-temple-guide",
    category: "Tour Guides",
    title: "From Village Boy to Temple Guide",
    subtitle: "How Dara learned the stories carved in Banteay Srei.",
    image: img.banteay,
    background: [
      "Dara grew up selling postcards outside Banteay Srei and taught himself English from visitors.",
      "Today he is a licensed guide with a history degree, and he hires two younger guides from his village.",
    ],
    impact: [
      { label: "Years guiding", value: "12" },
      { label: "Village guides mentored", value: "5" },
      { label: "Traveler rating", value: "5.0" },
    ],
    families: [{ name: "Dara Sok", role: "Licensed guide", quote: "Every temple has a story – and so does every village around it." }],
    gallery: [img.banteay, img.hero, img.kulen],
    why: ["Licensed local guides earn a fair wage.", "Mentors the next generation of village guides.", "History told by the people who live it."],
    related: ["banteay-srei", "phnom-kulen"],
  },
  {
    slug: "kulen-reforestation-project",
    category: "Community Projects",
    title: "Replanting Phnom Kulen",
    subtitle: "Villagers and visitors planting trees on Cambodia's sacred mountain.",
    image: img.kulen,
    background: [
      "Logging left parts of Kulen bare. A village project now plants native trees with help from visitors.",
      "Each hike fee includes one sapling, planted and cared for by a local family.",
    ],
    impact: [
      { label: "Trees planted", value: "4,800" },
      { label: "Families paid as caretakers", value: "22" },
      { label: "Hectares restored", value: "11" },
    ],
    families: [{ name: "Vuthy Kim", role: "Former ranger", quote: "Tourism is now a reason to protect the forest." }],
    gallery: [img.kulen, img.bike, img.community],
    why: ["Protects the watershed for Siem Reap.", "Pays village caretakers.", "You can visit the tree you planted."],
    related: ["phnom-kulen", "countryside-bicycle-tour"],
  },
  {
    slug: "sokha-tuk-tuk-story",
    category: "Local Businesses",
    title: "Sokha's Tuk Tuk",
    subtitle: "Twelve years of sunrises – and a business built on word of mouth.",
    image: img.tuktuk,
    background: [
      "Sokha bought his first tuk tuk with a loan from his uncle and waited outside guesthouses for passengers.",
      "With a Cambodia Unlocked profile, travelers now message him directly before they even land.",
    ],
    impact: [
      { label: "Travelers driven", value: "6,000+" },
      { label: "Inquiries via platform", value: "140" },
      { label: "Commission paid", value: "$0" },
    ],
    families: [{ name: "Sokha", role: "Tuk tuk driver", quote: "Now travelers find me – I don't have to chase them." }],
    gallery: [img.tuktuk, img.hero],
    why: ["No middleman commission.", "Supports a family-run business.", "Local knowledge of every sunrise spot."],
    related: ["banteay-srei", "lotus-farm-experience"],
  },
];

export const guides = [
  { name: "Dara Sok", languages: "English · French", rating: 5.0, specialty: "Temple history", slug: "dara-local-guide" },
  { name: "Sreymom Chea", languages: "English · Khmer", rating: 4.9, specialty: "Village & food tours", slug: "dara-local-guide" },
  { name: "Vuthy Kim", languages: "English · Chinese", rating: 4.8, specialty: "Nature & Kulen hikes", slug: "dara-local-guide" },
];

export const adventures = [
  { name: "Sunset kayak on the West Baray", price: "$25", time: "2 hrs" },
  { name: "Quad bike rice-field ride", price: "$30", time: "1.5 hrs" },
  { name: "Jungle zipline", price: "$60", time: "3 hrs" },
];

export const homeCategories = [
  { label: "Culture & Heritage", to: "/explore", category: "Culture & Heritage" },
  { label: "Community Tourism", to: "/explore", category: "Community Tourism" },
  { label: "Nature & Outdoor", to: "/explore", category: "Nature & Outdoor" },
  { label: "Food & Dining", to: "/explore", category: "Food & Dining" },
  { label: "Accommodation", to: "/businesses", category: "Homestays" },
  { label: "Adventure Tours", to: "/explore", category: "Adventure Tours" },
  { label: "Tour Guides", to: "/businesses", category: "Tour Guides" },
  { label: "Transportation", to: "/businesses", category: "Tuk Tuk Services" },
  { label: "Events", to: "/events", category: "" },
] as const;

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
export const getBusiness = (slug: string) => businesses.find((b) => b.slug === slug);
export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
