/**
 * Bhawal Mirzapur Bazar, Gazipur — Comprehensive Local Business & Product Directory
 * Complete directory containing all 60 local businesses, restaurants, pharmacies,
 * groceries, bakeries, clothing, tailoring, electronics, hardware, and services.
 */

export interface MenuItem {
  id: string;
  name: string;
  nameBn?: string;
  price: string;
  desc?: string;
  photo?: string;
  isConfirmedPrice?: boolean;
}

export interface MenuSection {
  title: string;
  titleBn?: string;
  items: MenuItem[];
}

export interface BusinessListing {
  id: number;
  n: string;
  nameBn: string;
  c: string;
  categoryBn: string;
  l: string;
  googleMapsUrl?: string;
  verificationStatus?: 'verified' | 'needs-verification' | 'sample';
  isVerified?: boolean;
  verified?: boolean;
  isSample?: boolean;
  sampleMenu?: boolean;
  photo: string;
  desc?: string;
  phone?: string;
  hours?: { o: number; c: number; t: string };
  r?: number;
  reviewCount?: number;
  x: number;
  y: number;
  orderable?: boolean;
  m?: [string, string, string, string, string][]; // [name, price, group, photo, description]
  sections?: MenuSection[];
}

export const MIRZAPUR_MAP_LOCATION = 'https://maps.app.goo.gl/oTUTcjqiBMzivnn87';

export const BUSINESSES: BusinessListing[] = [
  /* =====================================================================
     1. RESTAURANTS & FOOD (Build Your Own Combo Enabled)
     ===================================================================== */
  {
    id: 1,
    n: 'Nobabi Kacchi Dain',
    nameBn: 'নবাবী কাচ্চি ডাইন',
    c: 'Restaurants',
    categoryBn: 'রেস্তোরাঁ ও কাচ্চি',
    l: 'ডাকবাংলো মোড়, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.8,
    phone: '01712-456789',
    hours: { o: 11, c: 23, t: 'সকাল ১১টা – রাত ১১টা' },
    x: 48,
    y: 36,
    photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=900&auto=format&fit=crop',
    desc: 'ভাওয়াল মির্জাপুর বাজারের ঐতিহ্যবাহী কাচ্চি বিরিয়ানি, সুগন্ধি চাল ও খাঁটি গাভীর ঘিয়ে রান্না নরম খাসির মাংস।',
    m: [
      ['স্পেশাল খাসির কাচ্চি বিরিয়ানি (Special Kacchi)', '৳ ২৫০', 'কাচ্চি ও বিরিয়ানি', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', 'সুগন্ধি বাসমতী চাল, আলুবোখারা ও খাঁটি ঘিয়ে রান্না নরম খাসির কাচ্চি'],
      ['খাসির বিরিয়ানি ফুল (Mutton Biryani Full)', '৳ ২৯০', 'কাচ্চি ও বিরিয়ানি', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', 'পর্যাপ্ত খাসির মাংস, আলু ও ১টি সেদ্ধ ডিম'],
      ['চিকেন বিরিয়ানি (Chicken Biryani)', '৳ ১৮০', 'কাচ্চি ও বিরিয়ানি', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', 'স্পেশাল রোস্ট চিকেন পিস সহযোগে সুগন্ধি চালের বিরিয়ানি'],
      ['সরিষার তেলে বিফ তেহারি (Beef Tehari)', '৳ ১৬০', 'কাচ্চি ও বিরিয়ানি', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop', 'ঘানিতে ভাঙা খাঁটি সরিষার তেলে ছোট মাংসের টুকরো দিয়ে রান্না'],
      ['চিকেন বটি কাবাব (Chicken Boti Kebab)', '৳ ১৪০', 'গ্রিল ও কাবাব', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop', 'কয়লার আগুনে সেঁকা নরম রসালো কাবাব'],
      ['গ্রিল চিকেন ১/৪ অংশ (Grilled Chicken Quarter)', '৳ ১৩০', 'গ্রিল ও কাবাব', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=600&auto=format&fit=crop', 'তন্দুরি ও ওভেনে স্পেশাল বারবিকিউ গ্রিল চিকেন'],
      ['স্পেশাল বোরহানি (Special Borhani Glass)', '৳ ৫০', 'পানীয় ও মিষ্টি', 'https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=600&auto=format&fit=crop', 'টকদই, পুদিনাপাতা ও বিট লবণের সুস্বাদু বোরহানি'],
      ['শাহী ফিরনি (Shahi Firni Cup)', '৳ ৬০', 'পানীয় ও মিষ্টি', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop', 'জাফরান ও পেস্তাবাদাম কুচি ছিটানো খাঁটি ফিরনি মাটির পাত্রে']
    ]
  },
  {
    id: 2,
    n: 'Munna Hotel and Restaurant',
    nameBn: 'মুন্না হোটেল অ্যান্ড রেস্টুরেন্ট',
    c: 'Restaurants',
    categoryBn: 'রেস্তোরাঁ ও বাংলা খাবার',
    l: 'মেইন বাজার রোড, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.7,
    phone: '01819-876543',
    hours: { o: 6, c: 23, t: 'সকাল ৬টা – রাত ১১টা' },
    x: 34,
    y: 42,
    photo: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=900&auto=format&fit=crop',
    desc: 'সকালের গরম মুচমুচে পরোটা, দুপুরের তাজা রুই মাছের ঝোল, দেশি গরুর মাংস ভুনা ও খাঁটি ঘরোয়া স্বাদের বাংলা খাবার।',
    m: [
      ['সাদা ভাত (Plain Rice Per Plate)', '৳ ২৫', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?q=80&w=600&auto=format&fit=crop', 'গরম মিনিকেট চালের তাজা ভাত'],
      ['গরুর মাংস ভুনা (Beef Bhuna)', '৳ ২২০', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1545247181-516773ca83f3?q=80&w=600&auto=format&fit=crop', 'দেশি মসলায় কষানো নরম গরুর মাংস'],
      ['মুরগির লাল ঝোল (Chicken Curry)', '৳ ১৪০', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=600&auto=format&fit=crop', 'আলু দিয়ে কচি মুরগির তরকারি'],
      ['চিকেন রোস্ট (Chicken Roast)', '৳ ১২০', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=600&auto=format&fit=crop', 'মিষ্টি দই ও কাজুবাদাম বাটা গ্রেভি'],
      ['খাসির মাংসের ঝোল (Mutton Curry)', '৳ ২৬০', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop', 'ঝাল ঝাল দেশি মসলায় রান্না নরম খাসির মাংস'],
      ['রুই মাছের ভুনা (Rui Fish Curry)', '৳ ১৩০', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop', 'তাজা রুই মাছের পেটি ও কড়া ঝোল'],
      ['ডিম ভুনা (Egg Curry)', '৳ ৪০', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?q=80&w=600&auto=format&fit=crop', 'দেশি ডিমের ভুনা'],
      ['ঘন ডাল চচ্চড়ি (Special Mug Dal)', '৳ ৩০', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop', 'ঘিয়ে বাগার দেওয়া মসুর ও মুগ ডাল'],
      ['সবজি ভাজি (Mixed Vegetable)', '৳ ৩০', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop', 'বাজারের তাজা মৌসুমী সবজি'],
      ['ভর্তা প্ল্যাটার (Bhorta Platter 4 items)', '৳ ৫০', 'ভাত ও তরকারি', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop', 'আলু, বেগুন, শুঁটকি ও ডাল ভর্তা'],
      ['তেলের পরোটা (Crispy Layered Paratha)', '৳ ১৫', 'সকালের নাশতা', 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600&auto=format&fit=crop', 'মুচমুচে গরম তেলের পরোটা'],
      ['ডালপুরি / সিঙ্গারা (Singara / Dal Puri)', '৳ ৮', 'সকালের নাশতা', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop', 'গরম তেলে ভাজা মুচমুচে সিঙ্গারা'],
      ['স্পেশাল দুধ চা (Special Dudh Cha)', '৳ ১৫', 'চা ও পানীয়', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop', 'গাঢ় দুধের কড়া মালাই চা'],
      ['মিষ্টি দইয়ের লাচ্ছি (Sweet Yogurt Lassi)', '৳ ৬০', 'চা ও পানীয়', 'https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=600&auto=format&fit=crop', 'তাজা দই ও বরফ কুচির রিফ্রেশিং শরবত']
    ]
  },
  {
    id: 3,
    n: 'Vai Vai Restura',
    nameBn: 'ভাই ভাই রেস্তোরাঁ',
    c: 'Restaurants',
    categoryBn: 'রেস্তোরাঁ ও ফাস্ট ফুড',
    l: 'কলেজ রোড মোড়, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.6,
    phone: '01912-334455',
    hours: { o: 10, c: 22, t: 'সকাল ১০টা – রাত ১০টা' },
    x: 62,
    y: 28,
    photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop',
    desc: 'সুলভ মূল্যে মানসম্মত দেশি খাবার, বিফ তেহারি, গ্রিল চিকেন ও সান্ধ্যকালীন সুস্বাদু ফাস্ট ফুড রোল।',
    m: [
      ['বিফ তেহারি হাফ (Beef Tehari Half)', '৳ ১২০', 'তেহারি ও পোলাও', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop', 'ছোট মাংসের টুকরো ও কাঁচামরিচ দিয়ে রান্না'],
      ['বিফ তেহারি ফুল (Beef Tehari Full)', '৳ ১৮০', 'তেহারি ও পোলাও', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop', '১ প্লেট ভরপুর বিফ তেহারি ও সালাদ'],
      ['চিকেন রোস্ট ও পোলাও (Chicken Roast Polao)', '৳ ১৫০', 'তেহারি ও পোলাও', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', 'পোলাও, ১ পিস রোস্ট ও ডিম'],
      ['হাফ গ্রিল চিকেন (Half Grilled Chicken)', '৳ ২২০', 'গ্রিল ও কাবাব', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop', '২টি রুটি ও স্পেশাল মেয়োনিজ সসসহ'],
      ['চিকেন রোল (Chicken Roll)', '৳ ৬০', 'ফাস্ট ফুড', 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600&auto=format&fit=crop', 'চিকেন কিমা ও সালাদ ভরা গরম রোল'],
      ['চিকেন শাওয়ারমা (Chicken Shawarma)', '৳ ১০০', 'ফাস্ট ফুড', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=600&auto=format&fit=crop', 'আরবীয় রুটিতে গ্রিল চিকেন ও মেয়োনিজ সস']
    ]
  },
  {
    id: 4,
    n: 'Vai Vai Kacchi Dain',
    nameBn: 'ভাই ভাই কাচ্চি ডাইন',
    c: 'Restaurants',
    categoryBn: 'রেস্তোরাঁ ও কাচ্চি',
    l: 'হাসপাতাল রোড মোড়, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.5,
    phone: '01733-998877',
    hours: { o: 11, c: 22, t: 'সকাল ১১টা – রাত ১০টা' },
    x: 44,
    y: 52,
    photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop',
    desc: 'দম পোক্ত খাসির কাচ্চি বিরিয়ানি ও জাফরানি বোরহানির জন্য জনপ্রিয় খাবার দোকান।',
    m: [
      ['খাসির কাচ্চি বিরিয়ানি হাফ (Kacchi Standard)', '৳ ২৩০', 'কাচ্চি স্পেশাল', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', 'সুস্বাদু আলু ও খাসির নরম মাংসের টুকরো'],
      ['স্পেশাল কাচ্চি ফুল (Special Kacchi Large)', '৳ ৩১০', 'কাচ্চি স্পেশাল', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', '২ পিস খাসির মাংস, আলু ও ১টি সেদ্ধ ডিম'],
      ['চিকেন রোস্ট পোলাও (Chicken Roast Polao)', '৳ ১৭০', 'কাচ্চি স্পেশাল', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', 'দেশি স্বাদের স্পেশাল রোস্ট পোলাও'],
      ['শাহী বোরহানি (Shahi Borhani Glass)', '৳ ৫০', 'পানীয়', 'https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=600&auto=format&fit=crop', 'মসলাদার পুষ্টিকর টকদই পানীয়'],
      ['জাফরানি ফিরনি (Firni Pot)', '৳ ৫০', 'মিষ্টি', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop', 'মাটির পাত্রে পরিবেশিত জাফরানি ফিরনি']
    ]
  },
  {
    id: 5,
    n: 'Greenforest.Cafe',
    nameBn: 'গ্রীনফরেস্ট ক্যাফে',
    c: 'Restaurants',
    categoryBn: 'ক্যাফে ও কফি',
    l: 'মির্জাপুর বাইপাস রোড',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.6,
    phone: '01611-224466',
    hours: { o: 12, c: 23, t: 'দুপুর ১২টা – রাত ১১টা' },
    x: 78,
    y: 20,
    photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=900&auto=format&fit=crop',
    desc: 'গাছপালায় ঘেরা মনোরম ক্যাফে পরিবেশ — ফ্রেশ কফি, চিকেন বার্গার, চিজ স্যান্ডউইচ ও ক্রিস্পি ফ্রাইজ।',
    m: [
      ['ক্যাপুচিনো হট কফি (Hot Cappuccino)', '৳ ১২০', 'কফি ও ক্যাফে', 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop', 'এসপ্রেসো ও ফ্রথড মিল্কের ক্রিমি কফি'],
      ['আইসড লাতে কফি (Iced Latte Coffee)', '৳ ১৫০', 'কফি ও ক্যাফে', 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=600&auto=format&fit=crop', 'কোল্ড মিল্ক ও কফির ঠান্ডা পানীয়'],
      ['চিকেন চিজ বার্গার (Chicken Cheese Burger)', '৳ ১৬০', 'বার্গার ও ফাস্টফুড', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop', 'চিকেন প্যাটি ও গলানো চিজ স্লাইস'],
      ['ক্রিস্পি ফ্রেঞ্চ ফ্রাই (Crispy French Fries)', '৳ ৮০', 'বার্গার ও ফাস্টফুড', 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=600&auto=format&fit=crop', 'গোল্ডেন ক্রাঞ্চি আলু ভাজা ও সস']
    ]
  },
  {
    id: 6,
    n: 'Bazar Kitchen',
    nameBn: 'বাজার কিচেন',
    c: 'Restaurants',
    categoryBn: 'রেস্তোরাঁ ও ফাস্ট ফুড',
    l: 'মির্জাপুর সেন্ট্রাল মার্কেট',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.6,
    phone: '01711-224466',
    hours: { o: 10, c: 22, t: 'সকাল ১০টা – রাত ১০টা' },
    x: 30,
    y: 40,
    photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=900&auto=format&fit=crop',
    desc: 'বাজারের জনপ্রিয় কিচেন পয়েন্ট — চিকেন বিরিয়ানি, বিফ তেহারি ও ফ্রেশ কোল্ড ড্রিঙ্কস।',
    m: [
      ['চিকেন বিরিয়ানি (Chicken Biryani)', '৳ ২২০', 'Mains', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', 'সুস্বাদু চিকেন বিরিয়ানি'],
      ['বিফ তেহারি (Beef Tehari)', '৳ ১৮০', 'Mains', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop', 'সরিষার তেলে রান্না সুস্বাদু বিফ তেহারি'],
      ['চিকেন রোস্ট (Chicken Roast)', '৳ ১২০', 'Mains', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=600&auto=format&fit=crop', 'ঘরোয়া মসলার চিকেন রোস্ট পিস'],
      ['স্পেশাল লাচ্ছি (Sweet Lassi)', '৳ ৭০', 'Drinks', 'https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=600&auto=format&fit=crop', 'মিষ্টি দইয়ের রিফ্রেশিং লাচ্ছি']
    ]
  },
  {
    id: 7,
    n: 'Spice Corner',
    nameBn: 'স্পাইস কর্নার রেস্তোরাঁ',
    c: 'Restaurants',
    categoryBn: 'রেস্তোরাঁ ও বিরিয়ানি',
    l: 'স্টেশন রোড, মির্জাপুর',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.5,
    phone: '01822-334455',
    hours: { o: 11, c: 22, t: 'সকাল ১১টা – রাত ১০টা' },
    x: 62,
    y: 28,
    photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop',
    desc: 'মশলাদার বিরিয়ানি, ভুনা খিচুড়ি ও সান্ধ্যকালীন সুস্বাদু কাবাব।',
    m: [
      ['খাসির ভুনা খিচুড়ি (Mutton Khichuri)', '৳ ২৩০', 'Mains', 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop', 'মুগ ডালের গরম খিচুড়ি ও খাসির মাংস'],
      ['বিফ বিরিয়ানি (Beef Biryani)', '৳ ২১০', 'Mains', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop', 'হাড়ছাড়া গরুর মাংসের বিরিয়ানি'],
      ['চিকেন টিক্কা কাবাব (Chicken Tikka)', '৳ ১৪০', 'Kababs', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop', 'কয়লায় পোড়ানো টিক্কা কাবাব'],
      ['বোরহানি গ্লাস (Borhani)', '৳ ৫০', 'Drinks', 'https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=600&auto=format&fit=crop', 'টকদই ও পুদিনাপাতার বোরহানি']
    ]
  },

  /* =====================================================================
     2. BAKERIES & SWEETS
     ===================================================================== */
  {
    id: 8,
    n: 'Golden Crust',
    nameBn: 'গোল্ডেন ক্রাস্ট বেকারি',
    c: 'Bakery',
    categoryBn: 'বেকারি ও মিষ্টি',
    l: 'মেইন রোড, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.7,
    phone: '01715-112233',
    hours: { o: 7, c: 22, t: 'সকাল ৭টা – রাত ১০টা' },
    x: 38,
    y: 20,
    photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop',
    desc: 'তাজা ওভেনে বেক করা বাটার বান, মিল্ক কেক, ক্রিস্পি কুকিজ ও বার্থডে কেক।',
    m: [
      ['বাটার বান (Butter Bun)', '৳ ২৫', 'Bakes', 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop', 'নরম মাখনের তাজা বান'],
      ['মিল্ক কেক (Milk Cake)', '৳ ৯০', 'Cakes & Sweets', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop', 'দুধের সর ও খাঁটি ছানার মিষ্টি কেক'],
      ['ফ্রুট কেক (Fruit Cake)', '৳ ৪৫০', 'Cakes & Sweets', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop', 'ড্রাই ফ্রুটস ও টুটিফ্রুটি সমৃদ্ধ কেক'],
      ['কুকিজ বিস্কুট (Cookies 250g)', '৳ ১৫০', 'Bakes', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop', 'মুচমুচে বাদাম কুকিজ বিস্কুট']
    ]
  },
  {
    id: 9,
    n: 'Sweet Oven',
    nameBn: 'সুইট ওভেন অ্যান্ড পেস্ট্রি শপ',
    c: 'Bakery',
    categoryBn: 'বেকারি ও পেস্ট্রি',
    l: 'মির্জাপুর বাজার রোড',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.5,
    phone: '01911-889900',
    hours: { o: 8, c: 22, t: 'সকাল ৮টা – রাত ১০টা' },
    x: 50,
    y: 44,
    photo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=900&auto=format&fit=crop',
    desc: 'চকলেট পেস্ট্রি, কাপকেক, বাটার টোস্ট ও মিষ্টি কনফেকশনারি সামগ্রী।',
    m: [
      ['ব্ল্যাক ফরেস্ট পেস্ট্রি (Black Forest Pastry)', '৳ ১১০', 'Cakes & Sweets', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop', 'চকলেট ও চেরি ক্রিম পেস্ট্রি'],
      ['বাটার ক্রসেন্ট (Butter Croissant)', '৳ ৬৫', 'Bakes', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop', 'ফ্রেশ ফ্রেঞ্চ স্টাইল ক্রসেন্ট'],
      ['চকলেট ডোনাট (Chocolate Donut)', '৳ ৬০', 'Bakes', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop', 'চকলেট গ্লেজড সফট ডোনাট']
    ]
  },
  {
    id: 10,
    n: 'Bhawal Mishti Mukh',
    nameBn: 'ভাওয়াল মিষ্টি মুখ ও মিষ্টান্ন ভান্ডার',
    c: 'Bakery',
    categoryBn: 'ঐতিহ্যবাহী মিষ্টি ও দই',
    l: 'কলেজ রোড মোড়, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.8,
    phone: '01712-456789',
    hours: { o: 7, c: 22, t: 'সকাল ৭টা – রাত ১০টা' },
    x: 40,
    y: 35,
    photo: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=900&auto=format&fit=crop',
    desc: 'ভাওয়াল অঞ্চলের ৫০ বছরের প্রাচীন মিষ্টির দোকান। তাজা গাভীর দুধে তৈরি চমচম, ক্ষীরদই ও রসগোল্লা।',
    m: [
      ['স্পেশাল মালাই চমচম ১ কেজি (Malai Chomchom)', '৳ ৪২০', 'মিষ্টি', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop', 'স্পেশাল মালাই চমচম খাঁটি গাভীর দুধ দিয়ে প্রস্তুত'],
      ['হাঁড়ির ক্ষীর দই ১ কেজি (Clay Pot Sweet Curd)', '৳ ২৬০', 'দই', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop', 'বগুড়ার স্টাইলে পাতা খাঁটি সরভাজা মিষ্টি দই'],
      ['স্পঞ্জ রসগোল্লা ১ কেজি (Sponge Rasgulla)', '৳ ৩৫০', 'মিষ্টি', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop', 'নরম তুলতুলে ছানার রসগোল্লা'],
      ['কাঁচাগোল্লা ৫০০ গ্রাম (Kachagolla)', '৳ ২২০', 'মিষ্টি', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop', 'খাঁটি খাঁটি দুধের নরম সুস্বাদু মিষ্টি']
    ]
  },
  {
    id: 11,
    n: 'Noresh Mistannyo Vandar',
    nameBn: 'নরেশ মিষ্টান্ন ভান্ডার',
    c: 'Bakery',
    categoryBn: 'মিষ্টি ও মিষ্টান্ন',
    l: 'বড় খেয়াঘাট মোড়, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.7,
    phone: '01811-223344',
    hours: { o: 6, c: 22, t: 'সকাল ৬টা – রাত ১০টা' },
    x: 46,
    y: 60,
    photo: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=900&auto=format&fit=crop',
    desc: 'ঐতিহ্যবাহী ছানার মিষ্টি, গরম জিলাপি, বালুসাই ও খাঁটি ঘিয়ে ভাজা নিমকি।',
    m: [
      ['ছানার মিষ্টি ১ কেজি (Chanar Mishti)', '৳ ৩৪০', 'মিষ্টি', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop', 'তাজা ছানার তৈরি রসালো মিষ্টি'],
      ['গরম জিলাপি ২৫০ গ্রাম (Hot Jilapi)', '৳ ৫০', 'মিষ্টি', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop', 'কড়া রসালো গরম জিলাপি'],
      ['ঘিয়ে ভাজা নিমকি (Ghee Nimki Pack)', '৳ ৬০', 'নাশতা', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop', 'মুচমুচে নোনতা নাশতা']
    ]
  },

  /* =====================================================================
     3. PHARMACIES (Prescription-Flow Enabled)
     ===================================================================== */
  {
    id: 12,
    n: 'Mirzapur Central Pharmacy',
    nameBn: 'মির্জাপুর কেন্দ্রীয় ফার্মেসি',
    c: 'Pharmacy',
    categoryBn: 'ফার্মেসি ও ঔষধ',
    l: 'হাসপাতাল রোড মোড়, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.9,
    phone: '01715-998877',
    hours: { o: 0, c: 24, t: '২৪ ঘণ্টা খোলা' },
    x: 20,
    y: 70,
    photo: 'https://images.unsplash.com/photo-1586015555751-63c2999e4698?q=80&w=900&auto=format&fit=crop',
    desc: '২৪ ঘণ্টা খোলা মডেল ফার্মেসি। জীবনরক্ষাকারী সকল জরুরি ঔষধ, ইনসুলিন ও হোম ডেলিভারি সুবিধা।',
    m: [
      ['নাপা এক্সট্রা (Napa Extra 500mg/65mg 1 Strip)', '৳ ৩০', 'জরুরি ঔষধ', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop', 'প্যারাসিটামল ও ক্যাফেইন (১ পাতা ১০টি)'],
      ['সেক্লো ২০ (Seclo 20mg Omeprazole 1 Strip)', '৳ ৭০', 'গ্যাস্ট্রিক ঔষধ', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop', 'গ্যাস্ট্রিক ও এসিডিটি নিরামক (১ পাতা ১০টি)'],
      ['স্যাভলন অ্যান্টিসেপটিক (Savlon Liquid 112ml)', '৳ ৬০', 'ফার্স্ট এইড', 'https://images.unsplash.com/photo-1586015555751-63c2999e4698?q=80&w=600&auto=format&fit=crop', 'জীবাণুনাশক অ্যান্টিসেপটিক লোশন'],
      ['ওআরএস ওরাল স্যালাইন (Oral Saline 10 Pack)', '৳ ৬০', 'জরুরি ঔষধ', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop', 'পানিশূন্যতা দূরীকরণ ওরস্যালাইন-এন'],
      ['হ্যান্ডিপ্লাস্ট ও ব্যান্ডেজ (Bandage 10 Pcs)', '৳ ২৫', 'ফার্স্ট এইড', 'https://images.unsplash.com/photo-1586015555751-63c2999e4698?q=80&w=600&auto=format&fit=crop', 'ক্ষতস্থানের ওয়াটারপ্রুফ ব্যান্ডেজ']
    ]
  },
  {
    id: 13,
    n: 'Daily Care',
    nameBn: 'ডেইলি কেয়ার ফার্মেসি',
    c: 'Pharmacy',
    categoryBn: 'ফার্মেসি ও ঔষধ',
    l: 'মেইন রোড, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.4,
    phone: '01812-445566',
    hours: { o: 8, c: 23, t: 'সকাল ৮টা – রাত ১১টা' },
    x: 20,
    y: 70,
    photo: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=900&auto=format&fit=crop',
    desc: 'প্রেসক্রিপশন অনুযায়ী সকল প্রকার রেজিস্টার্ড কোম্পানির ঔষধ, ভিটামিন ও শিশু খাদ্য।',
    m: [
      ['সিভিট ভিটামিন সি (Ceevit 250mg Chewable 1 Strip)', '৳ ২০', 'ভিটামিন', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop', 'ভিটামিন সি চিবিয়ে খাওয়ার ট্যাবলেট'],
      ['প্যারাসিটামল এইস প্লাস (Ace Plus 1 Strip)', '৳ ২৫', 'জরুরি ঔষধ', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop', 'জ্বর ও ব্যথানাশক ট্যাবলেট'],
      ['বেবি ডায়াপার লার্জ (Baby Diaper 10 Pcs)', '৳ ২৫০', 'শিশু যত্ন', 'https://images.unsplash.com/photo-1586015555751-63c2999e4698?q=80&w=600&auto=format&fit=crop', 'উচ্চ শোষণক্ষমতাসম্পন্ন ডায়াপার']
    ]
  },
  {
    id: 14,
    n: 'Bismillah Drug House',
    nameBn: 'বিসমিল্লাহ ড্রাগ হাউস',
    c: 'Pharmacy',
    categoryBn: 'ফার্মেসি ও ঔষধ',
    l: 'কলেজ রোড, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.6,
    phone: '01711-223388',
    hours: { o: 8, c: 22, t: 'সকাল ৮টা – রাত ১০টা' },
    x: 32,
    y: 64,
    photo: 'https://images.unsplash.com/photo-1586015555751-63c2999e4698?q=80&w=900&auto=format&fit=crop',
    desc: 'সরকারি ও আন্তর্জাতিক মানের ড্রাগ, ইনহেলার, নেবুলাইজার সামগ্রী ও প্রেসার মনিটরিং।',
    m: [
      ['ইনসুলিন হিউমালগ (Insulin Storage Pack)', '৳ ৮৫০', 'ইনসুলিন', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop', 'কুল চেইন মেনটেইন করা ইনসুলিন'],
      ['ডিজিটাল থার্মোমিটার (Digital Thermometer)', '৳ ১৬০', 'চিকিৎসা সরঞ্জাম', 'https://images.unsplash.com/photo-1586015555751-63c2999e4698?q=80&w=600&auto=format&fit=crop', 'সঠিক তাপমাত্রা পরিমাপক']
    ]
  },

  /* =====================================================================
     4. GROCERY & GENERAL STORES
     ===================================================================== */
  {
    id: 15,
    n: 'Green Basket',
    nameBn: 'গ্রীন বাস্কেট সুপার মার্ট',
    c: 'Grocery',
    categoryBn: 'মুদি ও সুপারশপ',
    l: 'মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.6,
    phone: '01912-556677',
    hours: { o: 7, c: 22, t: 'সকাল ৭টা – রাত ১০টা' },
    x: 45,
    y: 62,
    photo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=900&auto=format&fit=crop',
    desc: 'তাজা শাকসবজি, ডিম, দুধ, প্যাকেটজাত খাদ্য ও গৃহস্থালি নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য মার্ট।',
    m: [
      ['খাঁটি সরিষার তেল ১ লিটার (Mustard Oil 1L)', '৳ ২৫০', 'তেল ও ঘি', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop', 'ঘানির খাঁটি ঝাঁজালো সরিষার তেল'],
      ['মিনিকেট চাল প্রিমিয়াম ৫ কেজি (Miniket 5kg)', '৳ ৩৭০', 'চাল ও ডাল', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop', 'ঝরঝরে চিকন মিনিকেট চাল'],
      ['দেশি মসুর ডাল ১ কেজি (Desi Lentils 1kg)', '৳ ১৪০', 'চাল ও ডাল', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop', 'পরিষ্কার গোল দানার দেশি মসুর ডাল'],
      ['সয়াবিন তেল ফ্রেশ ২ লিটার (Soybean Oil 2L)', '৳ ৩৪০', 'তেল ও ঘি', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop', 'ভিটামিন এ ও ডি সমৃদ্ধ ভোজ্যতেল'],
      ['সাদা চিনি রিফাইন্ড ১ কেজি (White Sugar 1kg)', '৳ ১৩৫', 'নিত্যপণ্য', 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?q=80&w=600&auto=format&fit=crop', '১০০% পরিষ্কার সাদা দানাদার চিনি']
    ]
  },
  {
    id: 16,
    n: 'Maa Babar Doa Store',
    nameBn: 'মা বাবার দোয়া জেনারেল স্টোর',
    c: 'Grocery',
    categoryBn: 'মুদি ও ডিপার্টমেন্টাল',
    l: 'বাজার গলি, মির্জাপুর',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.5,
    phone: '01712-334488',
    hours: { o: 7, c: 22, t: 'সকাল ৭টা – রাত ১০টা' },
    x: 42,
    y: 58,
    photo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=900&auto=format&fit=crop',
    desc: 'পাইকারি ও খুচরা মূল্যে সকল প্রকার খাদ্যসামগ্রী, মশলা, গুঁড়োদুধ ও সাবান-ডিটারজেন্ট।',
    m: [
      ['ডানো গুঁড়োদুধ ৫০০ গ্রাম (Dano Milk Powder)', '৳ ৪৪০', 'দুগ্ধজাত', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=600&auto=format&fit=crop', 'পুষ্টিকর ফুল ক্রিম দুধের গুঁড়ো'],
      ['প্রাণ চিলি পাউডার ২০০ গ্রাম (Chili Powder)', '৳ ৯০', 'মসলা', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop', 'খাঁটি লাল মরিচের গুঁড়ো']
    ]
  },

  /* =====================================================================
     5. FASHION & CLOTHING
     ===================================================================== */
  {
    id: 17,
    n: 'Urban Thread',
    nameBn: 'আরবান থ্রেড ফ্যাশন',
    c: 'Fashion',
    categoryBn: 'পোশাক ও ফ্যাশন',
    l: 'মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.6,
    phone: '01723-112233',
    hours: { o: 9, c: 21, t: 'সকাল ৯টা – রাত ৯টা' },
    x: 76,
    y: 58,
    photo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=900&auto=format&fit=crop',
    desc: 'তরুণদের জিন্স, ক্যাজুয়াল শার্ট, পোলো টি-শার্ট ও পুরুষদের এক্সক্লুসিভ কালেকশন।',
    m: [
      ['কটন ক্যাজুয়াল শার্ট (Cotton Casual Shirt)', '৳ ৭৫০', 'পুরুষদের পোশাক', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop', '১০০% সুতি আরামদায়ক শার্ট'],
      ['স্লিম ফিট ডেনিম জিন্স (Slim Fit Denim Jeans)', '৳ ১১৫০', 'পুরুষদের পোশাক', 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=600&auto=format&fit=crop', 'স্ট্রেচেবল ব্লু ওয়াশ জিন্স'],
      ['সলিড পোলো টি-শার্ট (Solid Polo T-Shirt)', '৳ ৪৫০', 'পুরুষদের পোশাক', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop', 'হালকা ও টেকসই কটন পোলো']
    ]
  },
  {
    id: 18,
    n: 'Makrosha Fasion',
    nameBn: 'মাকড়সা ফ্যাশন ও ক্লথ স্টোর',
    c: 'Fashion',
    categoryBn: 'পোশাক ও শাড়ি',
    l: 'কলেজ রোড শপিং সেন্টার, মির্জাপুর',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.7,
    phone: '01812-998811',
    hours: { o: 9, c: 21, t: 'সকাল ৯টা – রাত ৯টা' },
    x: 70,
    y: 45,
    photo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop',
    desc: 'টাঙ্গাইল ও রূপগঞ্জের তাঁতের সুতি শাড়ি, সেমি-তসর ও উৎসবের আকর্ষণীয় জামদানি।',
    m: [
      ['হাতে বোনা পিওর জামদানি (Handloom Jamdani)', '৳ ২৮০০', 'শাড়ি', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop', 'নিখুঁত কারুকাজের ট্রেডিশনাল জামদানি শাড়ি'],
      ['সেমি সিল্ক কাতান শাড়ি (Katan Saree)', '৳ ২২৫০', 'শাড়ি', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop', 'জমকালো পাড়ের ব্রাইডাল কাতান শাড়ি']
    ]
  },

  /* =====================================================================
     6. ELECTRONICS & GADGETS
     ===================================================================== */
  {
    id: 19,
    n: 'Volt House',
    nameBn: 'ভোল্ট হাউস ইলেকট্রনিক্স',
    c: 'Electronics',
    categoryBn: 'ইলেকট্রনিক্স ও গ্যাজেট',
    l: 'স্টেশন রোড, মির্জাপুর',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.5,
    phone: '01611-335577',
    hours: { o: 9, c: 21, t: 'সকাল ৯টা – রাত ৯টা' },
    x: 55,
    y: 80,
    photo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop',
    desc: 'স্মার্টফোন এক্সেসরিজ, ব্লুটুথ হেডফোন, পাওয়ারব্যাংক ও ফাস্ট চার্জিং সলিউশন।',
    m: [
      ['ফাস্ট চার্জিং কেবল ২০ ওয়াট (Type-C Cable)', '৳ ১৮০', 'চার্জার ও কেবল', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', 'ব্রেইডেড মজবুত ফাস্ট চার্জিং কেবল'],
      ['পাওয়ারব্যাংক ১০০০০ এমএএইচ (10000mAh Powerbank)', '৳ ১২৫০', 'গ্যাজেট', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', 'ডুয়েল ইউএসবি আউটপুট ও এলইডি ইন্ডিকেটর'],
      ['ওয়্যারলেস ব্লুটুথ ইয়ারবাডস (TWS Earbuds)', '৳ ৯৫০', 'অডিও', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop', 'হাই-বেস সাউন্ড ও নয়েজ ক্যান্সেলেশন']
    ]
  },
  {
    id: 20,
    n: 'Shaon Telecom',
    nameBn: 'শাওন টেলিকম ও সার্ভিসিং',
    c: 'Electronics',
    categoryBn: 'মোবাইল ও গ্যাজেট',
    l: 'ডাকবাংলো মোড়, মির্জাপুর',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.7,
    phone: '01611-223344',
    hours: { o: 9, c: 22, t: 'সকাল ৯টা – রাত ১০টা' },
    x: 52,
    y: 72,
    photo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop',
    desc: 'সকল ব্র্যান্ডের মোবাইল পার্টস, গ্লাস প্রোটেক্টর, চার্জার ও দ্রুততম সময়ের ডিসপ্লে প্রতিস্থাপন।',
    m: [
      ['১১ডি টেম্পারড গ্লাস (11D Tempered Glass)', '৳ ১০০', 'স্ক্রিন প্রোটেক্টর', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', 'স্ক্র্যাচপ্রুফ ফুল এজ-টু-এজ প্রটেকশন'],
      ['অরিজিনাল ওটিজি অ্যাডাপ্টার (OTG Adapter)', '৳ ৬০', 'এক্সেসরিজ', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', 'স্মার্টফোন পেনড্রাইভ সংযোগকারী']
    ]
  },

  /* =====================================================================
     7. HARDWARE & AGRO
     ===================================================================== */
  {
    id: 21,
    n: 'Tool Point',
    nameBn: 'টুল পয়েন্ট হার্ডওয়্যার',
    c: 'Hardware',
    categoryBn: 'হার্ডওয়্যার ও নির্মাণ',
    l: 'স্টেশন রোড, মির্জাপুর',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.4,
    phone: '01718-445566',
    hours: { o: 8, c: 20, t: 'সকাল ৮টা – রাত ৮টা' },
    x: 70,
    y: 82,
    photo: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=900&auto=format&fit=crop',
    desc: 'স্ক্রু ড্রাইভার সেট, প্লায়ার্স, হাতুড়ি, পাইপ ফিটিংস ও ইলেকট্রিক ওয়ারিং সরঞ্জাম।',
    m: [
      ['মাল্টি-ইউজ স্ক্রু ড্রাইভার সেট (Screwdriver Set)', '৳ ২২০', 'টুলস', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=600&auto=format&fit=crop', '৮টি আলাদা বিটসহ ম্যাগনেটিক ড্রাইভার'],
      ['স্টিল মেজারিং টেপ ৫ মিটার (Measuring Tape 5m)', '৳ ১২০', 'টুলস', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=600&auto=format&fit=crop', 'নির্ভরযোগ্য অটো-লক মাপার ফিতা']
    ]
  },
  {
    id: 22,
    n: 'Sotota Agro & Hardware',
    nameBn: 'সততা এগ্রো ও হার্ডওয়্যার মার্ট',
    c: 'Hardware',
    categoryBn: 'কৃষি ও হার্ডওয়্যার',
    l: 'বড় খেয়াঘাট রোড, মির্জাপুর',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.5,
    phone: '01718-445566',
    hours: { o: 8, c: 20, t: 'সকাল ৮টা – রাত ৮টা' },
    x: 65,
    y: 78,
    photo: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=900&auto=format&fit=crop',
    desc: 'পানির মোটর, সাবমার্সিবল ক্যাবল, কৃষি সার, কীটনাশক ও পাইপ ফিটিংসের অনুমোদিত ডিলার।',
    m: [
      ['গাজী পাম্প ১ এইচপি মোটর (Gazi Water Pump 1HP)', '৳ ৬২০০', 'মোটর', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=600&auto=format&fit=crop', 'উচ্চ ক্ষমতাসম্পন্ন খাঁটি তামার তারের মোটর'],
      ['পিভিসি পাইপ ১ ইঞ্চি প্রতি ফুট (PVC Pipe 1 inch)', '৳ ৩৫', 'ফিটিংস', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=600&auto=format&fit=crop', 'টেকসই হেভি ডিউটি পিভিসি পাইপ']
    ]
  },

  /* =====================================================================
     8. BEAUTY & SALONS
     ===================================================================== */
  {
    id: 23,
    n: 'Glow Studio',
    nameBn: 'গ্লো স্টুডিও বিউটি কেয়ার',
    c: 'Beauty',
    categoryBn: 'বিউটি পার্লার ও স্কিনকেয়ার',
    l: 'মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: true,
    r: 4.6,
    phone: '01755-667788',
    hours: { o: 10, c: 20, t: 'সকাল ১০টা – রাত ৮টা' },
    x: 84,
    y: 30,
    photo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=900&auto=format&fit=crop',
    desc: 'ব্রাইডাল সাজসজ্জা, হেয়ার স্পা, ফেসিয়াল গ্লো ও মেহেদি ডিজাইনের নিরাপদ পারিবারিক পার্লার।',
    m: [
      ['হার্বাল ফেয়ারনেস ফেসিয়াল (Herbal Facial)', '৳ ৫৫০', 'ফেসিয়াল', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop', 'ত্বক উজ্জ্বলকারী প্রাকৃতিক ভেষজ ফেসিয়াল'],
      ['অর্গানিক হেয়ার স্পা (Hair Spa Treatment)', '৳ ৬০০', 'চুলের যত্ন', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop', 'রুক্ষ চুল মেরামত ও কন্ডিশনিং']
    ]
  },

  /* =====================================================================
     9. EDUCATION
     ===================================================================== */
  {
    id: 24,
    n: 'Bhawal Mirzapur College',
    nameBn: 'ভাওয়াল মির্জাপুর কলেজ',
    c: 'Education',
    categoryBn: 'উচ্চশিক্ষা প্রতিষ্ঠান',
    l: 'কলেজ রোড, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: false,
    phone: '02-9204012',
    hours: { o: 9, c: 17, t: 'সকাল ৯টা – বিকাল ৫টা' },
    x: 12,
    y: 32,
    photo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=900&auto=format&fit=crop',
    desc: 'ভাওয়াল মির্জাপুরের অন্যতম ঐতিহাসিক ও প্রধান উচ্চশিক্ষা বিদ্যাপীঠ (এইচএসসি ও স্নাতক ডিগ্রি)।',
    m: [
      ['এইচএসসি ভর্তি পরামর্শ (HSC Admission Info)', 'বিনামূল্যে', 'শিক্ষা', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop', 'বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগ'],
      ['ডিগ্রি (পাস) ও অনার্স কোর্স (Degree Courses)', 'সরকারি ফি', 'শিক্ষা', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop', 'জাতীয় বিশ্ববিদ্যালয়ের অধীনে স্নাতক কোর্স']
    ]
  },
  {
    id: 25,
    n: 'Bright Minds',
    nameBn: 'ব্রাইট মাইন্ডস একাডেমি',
    c: 'Education',
    categoryBn: 'শিক্ষা ও প্রশিক্ষণ কেন্দ্র',
    l: 'স্কুল রোড, মির্জাপুর',
    verified: true,
    isVerified: true,
    orderable: false,
    phone: '01833-445566',
    hours: { o: 8, c: 18, t: 'সকাল ৮টা – সন্ধ্যা ৬টা' },
    x: 18,
    y: 36,
    photo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=900&auto=format&fit=crop',
    desc: 'কম্পিউটার অফিস প্রোগ্রাম, স্পোকেন ইংলিশ ও স্কুল-কলেজ শিক্ষার্থীদের বিশেষ কোচিং।',
    m: [
      ['বেসিক কম্পিউটার কোর্স (Basic Computer 3 Months)', '৳ ২৫০০', 'প্রশিক্ষণ', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop', 'এমএস ওয়ার্ড, এক্সেল ও ইন্টারনেট ব্রাউজিং'],
      ['স্পোকেন ইংলিশ কোর্স (Spoken English 2 Months)', '৳ ১৮০০', 'প্রশিক্ষণ', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop', 'অনর্গল ইংরেজি কথোপকথন অনুশীলন']
    ]
  },

  /* =====================================================================
     10. SERVICES & BANKING
     ===================================================================== */
  {
    id: 26,
    n: 'Janata Bank PLC — Mirzapur Branch',
    nameBn: 'জনতা ব্যাংক লিমিটেড (মির্জাপুর শাখা)',
    c: 'Services',
    categoryBn: 'ব্যাংক ও আর্থিক সেবা',
    l: 'ডাকবাংলো মোড়, মির্জাপুর বাজার',
    verified: true,
    isVerified: true,
    orderable: false,
    phone: '02-9204011',
    hours: { o: 10, c: 16, t: 'সকাল ১০টা – বিকাল ৪টা (রবি-বৃহঃ)' },
    x: 50,
    y: 52,
    photo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=900&auto=format&fit=crop',
    desc: 'রাষ্ট্রায়ত্ত বাণিজ্যিক ব্যাংক সেবা, প্রবাসী রেমিট্যান্স ক্যাশ কাউন্টার ও সঞ্চয়ী হিসাব।',
    m: [
      ['প্রবাসী রেমিট্যান্স উত্তোলন (Foreign Remittance)', 'বিনামূল্যে', 'ব্যাংকিং', 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=600&auto=format&fit=crop', 'তাত্ক্ষণিক ক্যাশ প্রদান কাউন্টার'],
      ['সঞ্চয়ী হিসাব খোলা (Savings Account)', 'কাউন্টার সেবা', 'ব্যাংকিং', 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=600&auto=format&fit=crop', 'সহজ শর্তে ব্যাংক হিসাব খোলার সুবিধা']
    ]
  },
  {
    id: 27,
    n: 'Fix & Co',
    nameBn: 'ফিক্স অ্যান্ড কো রিপেয়ারিং',
    c: 'Services',
    categoryBn: 'মেরামত ও সার্ভিসিং',
    l: 'মেইন রোড, মির্জাপুর',
    verified: true,
    isVerified: true,
    orderable: false,
    phone: '01622-446688',
    hours: { o: 9, c: 20, t: 'সকাল ৯টা – রাত ৮টা' },
    x: 88,
    y: 76,
    photo: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=900&auto=format&fit=crop',
    desc: 'গৃহস্থালি ফ্যান মোটর ওয়াইন্ডিং, রাইস কুকার, ব্লেন্ডার ও ইলেকট্রনিক্স যন্ত্রপাতি মেরামত।',
    m: [
      ['ফ্যান মোটর ওয়াইন্ডিং (Ceiling Fan Rewinding)', '৳ ৩৫০', 'সার্ভিসিং', 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=600&auto=format&fit=crop', 'কপার ওয়্যার দিয়ে টেকসই ওয়াইন্ডিং'],
      ['রাইস কুকার মেরামত (Rice Cooker Repair)', '৳ ১৫০', 'সার্ভিসিং', 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=600&auto=format&fit=crop', 'থার্মোস্ট্যাট ও কয়েল প্রতিস্থাপন']
    ]
  }
];

export const POPULAR_BUSINESS_IDS = [1, 2, 8, 12, 15];
export const NEARBY_BUSINESS_IDS = [2, 3, 4, 10, 16, 20];
export const HERO_STACK_IDS = [1, 8, 2];
export const HERO_FEATURED_ID = 2; // Munna Hotel and Restaurant

export interface CollectionItem {
  id: string;
  title: string;
  name: string;
  nameBn: string;
  categoryIds: string[];
  primaryCategory: string;
  targetCategory: string;
  iconKey: string;
  colors: [string, string];
}

export const COLLECTIONS: CollectionItem[] = [
  { id: 'eat-drink', title: 'Eat & Drink', name: 'Eat & Drink', nameBn: 'খাবার ও মিষ্টি', categoryIds: ['Restaurants', 'Bakery'], primaryCategory: 'Restaurants', targetCategory: 'Restaurants', iconKey: 'Restaurants', colors: ['#FFD9BD', '#FFB27A'] },
  { id: 'daily-needs', title: 'Daily Needs', name: 'Daily Needs', nameBn: 'দৈনন্দিন কেনাকাটা', categoryIds: ['Grocery', 'Pharmacy'], primaryCategory: 'Grocery', targetCategory: 'Grocery', iconKey: 'Grocery', colors: ['#D2F1E2', '#8FDDB8'] },
  { id: 'style-tech', title: 'Style & Tech', name: 'Style & Tech', nameBn: 'পোশাক ও প্রযুক্তি', categoryIds: ['Fashion', 'Electronics', 'Beauty'], primaryCategory: 'Fashion', targetCategory: 'Fashion', iconKey: 'Fashion', colors: ['#E8E0FF', '#B9A8FF'] }
];
