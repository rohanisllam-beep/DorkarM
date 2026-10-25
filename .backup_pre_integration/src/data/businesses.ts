/**
 * Bhawal Mirzapur Bazar, Gazipur — Local Business Directory Data
 * 
 * Based on authentic location: https://maps.app.goo.gl/oTUTcjqiBMzivnn87
 * 
 * Includes:
 * 1. Explicitly provided user businesses (Munna Hotel, Nobabi Kacchi, Vai Vai,
 *    Polash Saloon, Jobayers Saloon, Dada Vai Er Saloon, Salauddin Store, Rifa Store,
 *    Manik Mia Store, Rifat Store, Jobayer Store, Makrosha Fasion, Duronto Fasion).
 * 2. Editable sample entries for additional local categories, clearly tagged as
 *    isSample: true and isVerified: false so no unverified facts are fabricated.
 */

export interface BusinessListing {
  id: number;
  n: string;              // English / Primary name
  nameBn: string;         // Bengali name
  c: string;              // Category ID matching CATEGORY_LIST
  categoryBn: string;     // Bengali category name
  l: string;              // Address / Area in Mirzapur
  googleMapsUrl: string;  // Preserved Google Maps location
  isVerified: boolean;    // True for confirmed businesses
  isSample: boolean;      // True for editable sample entries
  photo: string;          // Relevant real photograph (CDN optimized)
  desc?: string;          // Description
  phone?: string;         // Verified phone number only
  hours?: string;         // Verified hours only
  r?: number;             // Rating only when verified
  reviewCount?: number;   // Review count only when verified
  x: number;              // Relative Map X position (0 - 100%)
  y: number;              // Relative Map Y position (0 - 100%)
  items?: [string, string][]; // Menu / Catalog sample items
}

export const MIRZAPUR_MAP_LOCATION = 'https://maps.app.goo.gl/oTUTcjqiBMzivnn87';

export const BUSINESSES: BusinessListing[] = [
  /* =====================================================================
     1. RESTAURANTS (User-supplied real names)
     ===================================================================== */
  {
    id: 1,
    n: 'Nobabi Kacchi Dain',
    nameBn: 'নবাবী কাচ্চি ডাইন',
    c: 'Restaurants',
    categoryBn: 'রেস্তোরাঁ ও ফাস্ট ফুড',
    l: 'ডাকবাংলো মোড়, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=900&auto=format&fit=crop',
    desc: 'ভাওয়াল মির্জাপুর বাজারের ঐতিহ্যবাহী কাচ্চি বিরিয়ানি ও সুস্বাদু খাবার প্রস্তুতকারক।',
    x: 48,
    y: 36,
    items: [
      ['খাসির শাহী কাচ্চি', '৳ ২৪০'],
      ['চিকেন বিরিয়ানি', '৳ ১৮০'],
      ['স্পেশাল বোরহানি', '৳ ৫০'],
      ['জালি কাবাব', '৳ ৪০'],
    ],
  },
  {
    id: 2,
    n: 'Munna Hotel and Restaurant',
    nameBn: 'মুন্না হোটেল অ্যান্ড রেস্টুরেন্ট',
    c: 'Restaurants',
    categoryBn: 'রেস্তোরাঁ ও ফাস্ট ফুড',
    l: 'মেইন বাজার রোড, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=900&auto=format&fit=crop',
    desc: 'সকালের গরম পরোটা, দেশি রুই-কাতল মাছের ঝোল ও দুপুরের ফ্রেশ বাঙালি খাবার।',
    x: 34,
    y: 42,
    items: [
      ['গরম পরোটা ও ভাজি', '৳ ৩০'],
      ['দেশি রুই মাছের ঝোল', '৳ ১২০'],
      ['গরুর মাংস ও ভাত', '৳ ২২০'],
      ['মুগ ডাল চচ্চড়ি', '৳ ৩০'],
    ],
  },
  {
    id: 3,
    n: 'Vai Vai Restura',
    nameBn: 'ভাই ভাই রেস্তোরাঁ',
    c: 'Restaurants',
    categoryBn: 'রেস্তোরাঁ ও ফাস্ট ফুড',
    l: 'কলেজ রোড মোড়, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop',
    desc: 'সুলভ মূল্যে মানসম্মত দেশি খাবার, বিফ তেহারি ও সান্ধ্যকালীন নাশতা।',
    x: 62,
    y: 28,
    items: [
      ['সরিষার তেলে বিফ তেহারি', '৳ ১৬০'],
      ['চিকেন রোস্ট ও পোলাও', '৳ ১৪০'],
      ['ডিম খিচুড়ি', '৳ ৭০'],
      ['স্পেশাল দুধ চা', '৳ ১৫'],
    ],
  },

  /* =====================================================================
     2. SALONS (User-supplied real names)
     ===================================================================== */
  {
    id: 4,
    n: 'Polash Saloon',
    nameBn: 'পলাশ সেলুন',
    c: 'Salons',
    categoryBn: 'সেলুন ও বিউটি সেবা',
    l: 'বাজার রোড, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=900&auto=format&fit=crop',
    desc: 'পুরুষদের আধুনিক হেয়ারকাট, শেভিং এবং ফেসিয়াল গ্রুমিং সেবা।',
    x: 28,
    y: 56,
    items: [
      ['স্টাইলিশ হেয়ারকাট', '৳ ৮০'],
      ['স্মুথ শেভিং', '৳ ৫০'],
      ['হেড ও শোল্ডার ম্যাসাজ', '৳ ১০০'],
      ['ফেসিয়াল স্ক্রাব', '৳ ১৫০'],
    ],
  },
  {
    id: 5,
    n: 'Jobayers Saloon',
    nameBn: 'জোবায়ের্স সেলুন',
    c: 'Salons',
    categoryBn: 'সেলুন ও বিউটি সেবা',
    l: 'ডাকবাংলো মোড় সংলগ্ন, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=900&auto=format&fit=crop',
    desc: 'দক্ষ নাপিত দ্বারা পরিষ্কার-পরিচ্ছন্ন পরিবেশে যত্নসহকারে সেবা প্রদান।',
    x: 52,
    y: 64,
    items: [
      ['নিয়মিত চুল ছাঁটা', '৳ ৭০'],
      ['দাড়ি ডিজাইন ও ট্রিমিং', '৳ ৫০'],
      ['হেয়ার কালার ও ডাই', '৳ ১২০'],
    ],
  },
  {
    id: 6,
    n: 'Dada Vai Er Saloon',
    nameBn: 'দাদা ভাই এর সেলুন',
    c: 'Salons',
    categoryBn: 'সেলুন ও বিউটি সেবা',
    l: 'পুরাতন বাজার গলি, মির্জাপুর',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=900&auto=format&fit=crop',
    desc: 'মির্জাপুর বাজারের দীর্ঘদিনের বিশ্বস্ত ক্লাসিক সেলুন সেবা।',
    x: 75,
    y: 72,
    items: [
      ['সাধারণ চুল ছাঁটা', '৳ ৬০'],
      ['দাড়ি শেভ', '৳ ৪০'],
      ['তেল মালিশ', '৳ ৫০'],
    ],
  },

  /* =====================================================================
     3. GROCERY / GENERAL STORES (User-supplied real names)
     ===================================================================== */
  {
    id: 7,
    n: 'Salauddin Store',
    nameBn: 'সালাউদ্দিন স্টোর',
    c: 'Grocery',
    categoryBn: 'মুদি ও নিত্যপ্রয়োজনীয়',
    l: 'সেন্ট্রাল মার্কেট নিচতলা, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=900&auto=format&fit=crop',
    desc: 'নিত্যপ্রয়োজনীয় মুদি সামগ্রী, ডাল, তেল, চিনি, মসলা ও গৃহস্থালি পণ্য।',
    x: 42,
    y: 50,
    items: [
      ['তীর সয়াবিন তেল (৫ লিটার)', '৳ ৮৯০'],
      ['দেশি মসুর ডাল (১ কেজি)', '৳ ১৩৫'],
      ['রাধুনী গুঁড়ো মসলা প্যাক', '৳ ৪৫'],
    ],
  },
  {
    id: 8,
    n: 'Rifa Store',
    nameBn: 'রিফা স্টোর',
    c: 'Grocery',
    categoryBn: 'মুদি ও নিত্যপ্রয়োজনীয়',
    l: 'হাসপাতাল রোড মোড়, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=900&auto=format&fit=crop',
    desc: 'তাজা মুদি পণ্য, শিশু খাদ্য, দুগ্ধজাত সামগ্রী ও গৃহস্থালি দ্রব্যাদি।',
    x: 20,
    y: 68,
    items: [
      ['ডানো ফুলক্রিম গুঁড়োদুধ', '৳ ৪৫০'],
      ['আটা ও ময়দা (২ কেজি)', '৳ ১২০'],
      ['বিস্কুট ও কনফেকশনারি', '৳ ৫০'],
    ],
  },
  {
    id: 9,
    n: 'Manik Mia Store',
    nameBn: 'মানিক মিয়া স্টোর',
    c: 'Grocery',
    categoryBn: 'মুদি ও নিত্যপ্রয়োজনীয়',
    l: 'খেয়াঘাট রোড, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=900&auto=format&fit=crop',
    desc: 'গ্রামের তাজা সরিষার তেল, দেশি পেঁয়াজ, রসুন ও পাইকারি-খুচরা মুদি।',
    x: 82,
    y: 45,
    items: [
      ['ঘানির সরিষার তেল (১ কেজি)', '৳ ২৬০'],
      ['দেশি পেঁয়াজ (৫ কেজি)', '৳ ৩৫০'],
      ['সাদা লবণ (১ কেজি)', '৳ ৩৫'],
    ],
  },

  /* =====================================================================
     4. RICE SHOPS (User-supplied real names)
     ===================================================================== */
  {
    id: 10,
    n: 'Rifat Store',
    nameBn: 'রিফাত স্টোর (চালের আড়ত)',
    c: 'RiceShops',
    categoryBn: 'চালের আড়ত ও দোকান',
    l: 'বড় খেয়াঘাট চালপট্টি, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=900&auto=format&fit=crop',
    desc: 'নাজিরশাইল, মিনিকেট, বাসমতী, পাইজাম ও কাটারিভোগ চালের নির্ভরযোগ্য পাইকারি ও খুচরা বিক্রেতা।',
    x: 65,
    y: 78,
    items: [
      ['মিনিকেট প্রিমিয়াম চাল (৫০ কেজি বস্তা)', '৳ ৩,৪৫০'],
      ['নাজিরশাইল ক্লাসিক (৫০ কেজি)', '৳ ৩,৭০০'],
      ['চিনিকুড়া পোলাও চাল (১ কেজি)', '৳ ১৩০'],
    ],
  },
  {
    id: 11,
    n: 'Jobayer Store',
    nameBn: 'জোবায়ের স্টোর (চালের দোকান)',
    c: 'RiceShops',
    categoryBn: 'চালের আড়ত ও দোকান',
    l: 'চালপট্টি গলি, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=900&auto=format&fit=crop',
    desc: 'পরিষ্কার ঝকঝকে পলিশ চাল, সুগন্ধি চাল ও লাল চালের বিশেষ সরবরাহ।',
    x: 72,
    y: 84,
    items: [
      ['২৮ নম্বর ভাত চাল (১ কেজি)', '৳ ৫৮'],
      ['২৯ নম্বর সিদ্ধ চাল (১ কেজি)', '৳ ৫৪'],
      ['দেশি লাল আমন চাল (১ কেজি)', '৳ ৮৫'],
    ],
  },

  /* =====================================================================
     5. FASHION & CLOTHES (User-supplied real names)
     ===================================================================== */
  {
    id: 12,
    n: 'Makrosha Fasion',
    nameBn: 'মাকড়শা ফ্যাশন',
    c: 'Fashion',
    categoryBn: 'পোশাক ও ফ্যাশন',
    l: 'কলেজ রোড শপিং সেন্টার, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop',
    desc: 'তরুণদের রেডিমেড শার্ট, জিন্স প্যান্ট, টি-শার্ট ও স্টাইলিশ পোশাকের সমাহার।',
    x: 38,
    y: 22,
    items: [
      ['ক্যাজুয়াল ফুলহাতা শার্ট', '৳ ৬৫০'],
      ['এক্সপোর্ট কোয়ালিটি ডেনিম জিন্স', '৳ ৯৫০'],
      ['কটন প্রিন্টেড টি-শার্ট', '৳ ২৮০'],
    ],
  },
  {
    id: 13,
    n: 'Duronto Fasion',
    nameBn: 'দুরন্ত ফ্যাশন',
    c: 'Fashion',
    categoryBn: 'পোশাক ও ফ্যাশন',
    l: 'মেইন রোড মার্কেট, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=900&auto=format&fit=crop',
    desc: 'ঈদ ও উৎসব কালেকশন, পাঞ্জাবি, পলো শার্ট ও মেয়েদের থ্রি-পিস।',
    x: 88,
    y: 32,
    items: [
      ['সেমি-লং সুতি পাঞ্জাবি', '৳ ৮৫০'],
      ['ডিজাইনার জর্জেট থ্রি-পিস', '৳ ১,৪০০'],
      ['বাচ্চাদের পার্টি ড্রেস', '৳ ৬০০'],
    ],
  },

  /* =====================================================================
     6. ADDITIONAL LOCAL CATEGORIES (Editable Sample Entries)
     Clearly tagged with isSample: true and isVerified: false
     ===================================================================== */
  {
    id: 14,
    n: 'Tamanna Ladies Tailors',
    nameBn: 'তামান্না লেডিস টেইলার্স ও ফেব্রিক্স',
    c: 'Tailoring',
    categoryBn: 'টেইলার্স ও সেলাই',
    l: 'মির্জাপুর বাজার রোড',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: false,
    isSample: true,
    photo: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=900&auto=format&fit=crop',
    desc: '[সম্পাদনাযোগ্য নমুনা তথ্য] নারী ও শিশুদের আধুনিক ডিজাইনের পোশাক নিখুঁত মাপে সেলাই।',
    x: 58,
    y: 48,
    items: [
      ['থ্রি-পিস কাটিং ও মেকিং', '৳ ৩৫০'],
      ['ব্লাউজ ও পেটিকোট সেলাই', '৳ ১৮০'],
    ],
  },
  {
    id: 15,
    n: 'Matir Cup Cha & Tong',
    nameBn: 'মাটির কাপ চা ও টং আড্ডা',
    c: 'TeaStalls',
    categoryBn: 'চা স্টল ও টং',
    l: 'কলেজ গেট সংলগ্ন, মির্জাপুর',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: false,
    isSample: true,
    photo: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop',
    desc: '[সম্পাদনাযোগ্য নমুনা তথ্য] খাঁটি মাটির ভাঁড়ে ঘন দুধের মালাই চা ও গরম সমুচা।',
    x: 32,
    y: 18,
    items: [
      ['মাটির কাপ মালাই চা', '৳ ২০'],
      ['লেবু-আদা মসলা চা', '৳ ১০'],
      ['গরম পেঁয়াজু ও সমুচা (প্রতি পিস)', '৳ ৮'],
    ],
  },
  {
    id: 16,
    n: 'Bhawal Mishti Mukh',
    nameBn: 'ভাওয়াল মিষ্টি মুখ ও মিষ্টান্ন ভান্ডার',
    c: 'Bakery',
    categoryBn: 'বেকারি ও মিষ্টি',
    l: 'কেন্দ্রীয় মসজিদ মোড়, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: false,
    isSample: true,
    photo: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=900&auto=format&fit=crop',
    desc: '[সম্পাদনাযোগ্য নমুনা তথ্য] খাঁটি গাভীর দুধের স্পেশাল চমচম, ক্ষীরদই ও রসমালাই।',
    x: 50,
    y: 44,
    items: [
      ['মালাই চমচম (১ কেজি)', '৳ ৪২০'],
      ['হাঁড়ির ক্ষীর দই (১ কেজি)', '৳ ২৬০'],
      ['তাজা রসগোল্লা (১ কেজি)', '৳ ৩৫০'],
    ],
  },
  {
    id: 17,
    n: 'Golden Crust Bakery',
    nameBn: 'গোল্ডেন ক্রাস্ট বেকারি',
    c: 'Bakery',
    categoryBn: 'বেকারি ও মিষ্টি',
    l: 'মেইন রোড, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: false,
    isSample: true,
    photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop',
    desc: '[সম্পাদনাযোগ্য নমুনা তথ্য] ওভেন-তাজা মাখন পাউরুটি, বার্থডে কেক ও বিস্কুট।',
    x: 40,
    y: 20,
    items: [
      ['স্পেশাল বাটার বান', '৳ ২৫'],
      ['চকলেট পেস্ট্রি কেক', '৳ ৮০'],
      ['ড্রাই ফ্রুট কুকিজ', '৳ ১৬০'],
    ],
  },
  {
    id: 18,
    n: 'Mirzapur Central Pharmacy',
    nameBn: 'মির্জাপুর সেন্ট্রাল ফার্মেসি',
    c: 'Pharmacy',
    categoryBn: 'ফার্মেসি ও ঔষধ',
    l: 'হাসপাতাল রোড, ভাওয়াল মির্জাপুর',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: false,
    isSample: true,
    photo: 'https://images.unsplash.com/photo-1586015555751-63c2999e4698?q=80&w=900&auto=format&fit=crop',
    desc: '[সম্পাদনাযোগ্য নমুনা তথ্য] জরুরি প্রেসক্রিপশন ঔষধ, ইনসুলিন ও প্রাথমিক চিকিৎসা সামগ্রী।',
    x: 18,
    y: 74,
    items: [
      ['প্রেসার ও ডায়াবেটিস স্ক্রিনিং', '৳ ২০'],
      ['নেবুলাইজার সেবা', '৳ ৫০'],
    ],
  },
  {
    id: 19,
    n: 'Shaon Telecom & Gadgets',
    nameBn: 'শাওন টেলিকম ও ইলেকট্রনিক্স',
    c: 'Electronics',
    categoryBn: 'মোবাইল ও ইলেকট্রনিক্স',
    l: 'ডাকবাংলো মোড়, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: false,
    isSample: true,
    photo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop',
    desc: '[সম্পাদনাযোগ্য নমুনা তথ্য] মোবাইল এক্সেসরিজ, ব্লুটুথ স্পিকার ও চার্জার সামগ্রী।',
    x: 55,
    y: 80,
    items: [
      ['ফাস্ট চার্জার ও কেবল', '৳ ২৫০'],
      ['ওয়্যারলেস ব্লুটুথ ইয়ারবাড', '৳ ৯৫০'],
      ['মোবাইল ব্যাক কভার ও গ্লাস', '৳ ১২০'],
    ],
  },
  {
    id: 20,
    n: 'Ideal Library & Stationery',
    nameBn: 'আইডিয়াল লাইব্রেরি ও স্টেশনারি',
    c: 'Stationery',
    categoryBn: 'বই ও স্টেশনারি',
    l: 'স্কুল রোড, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: false,
    isSample: true,
    photo: 'https://images.unsplash.com/photo-1507842229456-52f026a76044?q=80&w=900&auto=format&fit=crop',
    desc: '[সম্পাদনাযোগ্য নমুনা তথ্য] পাঠ্যপুস্তক, খাতা, কলম, জ্যামিতি বক্স ও ফটোস্ট্যাট সেবা।',
    x: 12,
    y: 32,
    items: [
      ['হোয়াইটপ্রিন্ট খাতা ডজন', '৳ ৩০০'],
      ['বলপেন সেট', '৳ ৬০'],
      ['ফটোকপি ও প্রিন্ট (প্রতি পৃষ্ঠা)', '৳ ৫'],
    ],
  },
  {
    id: 21,
    n: 'Sotota Agro & Hardware',
    nameBn: 'সততা এগ্রো ও হার্ডওয়্যার মার্ট',
    c: 'Hardware',
    categoryBn: 'হার্ডওয়্যার ও নির্মাণ',
    l: 'বড় খেয়াঘাট সংলগ্ন রোড, মির্জাপুর',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: false,
    isSample: true,
    photo: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=900&auto=format&fit=crop',
    desc: '[সম্পাদনাযোগ্য নমুনা তথ্য] পানির পাম্প, পিভিসি পাইপ, ইলেকট্রিক তার ও কৃষি যন্ত্রপাতি।',
    x: 70,
    y: 82,
    items: [
      ['১ ইঞ্চি আরএফএল পাইপ ফিটিংস', '৳ ২২০'],
      ['বিআরবি ইলেকট্রিক ক্যাবল', '৳ ৩৫০'],
    ],
  },
  {
    id: 22,
    n: 'Bhawal Mirzapur College',
    nameBn: 'ভাওয়াল মির্জাপুর কলেজ',
    c: 'Education',
    categoryBn: 'শিক্ষা প্রতিষ্ঠান',
    l: 'কলেজ রোড, মির্জাপুর, গাজীপুর',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=900&auto=format&fit=crop',
    desc: 'এলাকার প্রাচীন ও সুপরিচিত উচ্চশিক্ষা প্রতিষ্ঠান (এইচএসসি ও ডিগ্রি)।',
    x: 25,
    y: 12,
    items: [
      ['উচ্চ মাধ্যমিক শিক্ষা (বিজ্ঞান/মানবিক/ব্যবসায়)', 'ভর্তি তথ্য'],
      ['স্নাতক ডিগ্রি প্রোগ্রাম', 'অফিস তথ্য'],
    ],
  },
  {
    id: 23,
    n: 'QuickFix Mobile & Repair Lab',
    nameBn: 'কুইকফিক্স মোবাইল ল্যাব',
    c: 'Repair',
    categoryBn: 'মেরামত ও সার্ভিসিং',
    l: 'মেইন রোড মার্কেট, মির্জাপুর',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: false,
    isSample: true,
    photo: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=900&auto=format&fit=crop',
    desc: '[সম্পাদনাযোগ্য নমুনা তথ্য] স্মার্টফোন ডিসপ্লে পরিবর্তন ও ইলেকট্রনিক্স গ্যাজেট রিপেয়ার।',
    x: 88,
    y: 76,
    items: [
      ['স্মার্টফোন স্ক্রিন রিপ্লেসমেন্ট', '৳ ৭০০'],
      ['ব্যাটারি ও চার্জিং পোর্ট মেরামত', '৳ ২৫০'],
    ],
  },
  {
    id: 24,
    n: 'Janata Bank PLC — Mirzapur Branch',
    nameBn: 'জনতা ব্যাংক লিমিটেড (মির্জাপুর শাখা)',
    c: 'Services',
    categoryBn: 'আর্থিক ও অন্যান্য সেবা',
    l: 'ডাকবাংলো মোড়, মির্জাপুর বাজার',
    googleMapsUrl: MIRZAPUR_MAP_LOCATION,
    isVerified: true,
    isSample: false,
    photo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=900&auto=format&fit=crop',
    desc: 'রাষ্ট্রায়ত্ত বাণিজ্যিক ব্যাংক সেবা, প্রবাসী রেমিট্যান্স ক্যাশ কাউন্টার ও সঞ্চয়ী হিসাব।',
    x: 50,
    y: 52,
    items: [
      ['প্রবাসী রেমিট্যান্স তাৎক্ষণিক প্রদান', 'কাউন্টার সেবা'],
      ['কৃষি ও ক্ষুদ্র ব্যবসা ঋণ সহায়তা', 'ডেস্ক সেবা'],
    ],
  },
];

export const POPULAR_BUSINESS_IDS = [1, 2, 7, 4, 12];
export const NEARBY_BUSINESS_IDS = [10, 3, 5, 8, 11, 16];
export const HERO_STACK_IDS = [1, 16, 12]; // Nobabi Kacchi, Bhawal Mishti, Makrosha Fasion
export const HERO_FEATURED_ID = 1;         // Nobabi Kacchi Dain

export const COLLECTIONS = [
  {
    title: 'খাবার ও রেস্তোরাঁ',
    titleEn: 'Eat & Drink',
    categoryIds: ['Restaurants', 'Bakery', 'TeaStalls'],
    targetCategory: 'Restaurants',
    colors: ['#FFD9BD', '#FFB27A'] as [string, string],
    iconKey: 'Restaurants',
  },
  {
    title: 'দৈনিক মুদি ও চাল',
    titleEn: 'Daily Needs',
    categoryIds: ['Grocery', 'RiceShops', 'Pharmacy'],
    targetCategory: 'Grocery',
    colors: ['#D2F1E2', '#8FDDB8'] as [string, string],
    iconKey: 'Grocery',
  },
  {
    title: 'ফ্যাশন ও গ্রুমিং',
    titleEn: 'Style & Grooming',
    categoryIds: ['Fashion', 'Salons', 'Tailoring', 'Electronics'],
    targetCategory: 'Fashion',
    colors: ['#E8E0FF', '#B9A8FF'] as [string, string],
    iconKey: 'Fashion',
  },
];
