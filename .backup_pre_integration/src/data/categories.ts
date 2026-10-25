/**
 * Category Definitions, 3D Isometric Vectors, and Visual Themes
 * Extracted directly from visual reference HTML with extended directory coverage
 */

export interface CategoryMeta {
  id: string;
  name: string;
  nameBn: string;
  colors: [string, string];
  iconKey: string;
  count?: number;
}

export const CATEGORY_PALETTES: [string, string][] = [
  ['#FFE0C7', '#FFB27A'], // Warm Orange
  ['#E8E0FF', '#B9A8FF'], // Pastel Lavender
  ['#D8E8FF', '#9CC4FF'], // Sky Blue
  ['#FFDCE8', '#FFA6C4'], // Rose Pink
  ['#D2F1E2', '#8FDDB8'], // Mint Green
  ['#FFE8BA', '#FDBA74'], // Golden Amber
  ['#E0E7FF', '#818CF8'], // Indigo
  ['#CCFBF1', '#5EEAD4'], // Teal
];

export const CATEGORY_LIST: CategoryMeta[] = [
  { id: 'Restaurants', name: 'Restaurants', nameBn: 'রেস্তোরাঁ ও ফাস্ট ফুড', colors: ['#FFE0C7', '#FFB27A'], iconKey: 'Restaurants' },
  { id: 'Salons', name: 'Salons & Beauty', nameBn: 'সেলুন ও বিউটি সেবা', colors: ['#FFDCE8', '#FFA6C4'], iconKey: 'Beauty' },
  { id: 'Grocery', name: 'Grocery & Essentials', nameBn: 'মুদি ও নিত্যপ্রয়োজনীয়', colors: ['#D2F1E2', '#8FDDB8'], iconKey: 'Grocery' },
  { id: 'RiceShops', name: 'Rice Shops', nameBn: 'চালের আড়ত ও দোকান', colors: ['#FFE8BA', '#FDBA74'], iconKey: 'Rice' },
  { id: 'Fashion', name: 'Fashion & Clothes', nameBn: 'পোশাক ও ফ্যাশন', colors: ['#E8E0FF', '#B9A8FF'], iconKey: 'Fashion' },
  { id: 'Tailoring', name: 'Tailoring Shops', nameBn: 'টেইলার্স ও সেলাই', colors: ['#FFDCE8', '#FFA6C4'], iconKey: 'Tailoring' },
  { id: 'TeaStalls', name: 'Tea Stalls', nameBn: 'চা স্টল ও টং', colors: ['#FFE0C7', '#FFB27A'], iconKey: 'Tea' },
  { id: 'Bakery', name: 'Bakeries & Sweets', nameBn: 'বেকারি ও মিষ্টি', colors: ['#FFE8BA', '#FDBA74'], iconKey: 'Bakery' },
  { id: 'Pharmacy', name: 'Pharmacies', nameBn: 'ফার্মেসি ও ঔষধ', colors: ['#D8E8FF', '#9CC4FF'], iconKey: 'Pharmacy' },
  { id: 'Electronics', name: 'Mobile & Electronics', nameBn: 'মোবাইল ও ইলেকট্রনিক্স', colors: ['#D8E8FF', '#9CC4FF'], iconKey: 'Electronics' },
  { id: 'Stationery', name: 'Stationery & Books', nameBn: 'বই ও স্টেশনারি', colors: ['#E0E7FF', '#818CF8'], iconKey: 'Education' },
  { id: 'Hardware', name: 'Hardware & Materials', nameBn: 'হার্ডওয়্যার ও নির্মাণ', colors: ['#D2F1E2', '#8FDDB8'], iconKey: 'Hardware' },
  { id: 'Education', name: 'Educational Institutions', nameBn: 'শিক্ষা প্রতিষ্ঠান', colors: ['#E8E0FF', '#B9A8FF'], iconKey: 'Education' },
  { id: 'Repair', name: 'Repair Services', nameBn: 'মেরামত ও সার্ভিসিং', colors: ['#D8E8FF', '#9CC4FF'], iconKey: 'Repair' },
  { id: 'Services', name: 'Other Local Services', nameBn: 'আর্থিক ও অন্যান্য সেবা', colors: ['#CCFBF1', '#5EEAD4'], iconKey: 'Services' },
];

export const IC_PATHS: Record<string, string> = {
  home: "M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z",
  search: "M11 4.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM16 16l4.5 4.5",
  pin: "M12 21s7-6.2 7-11.2A7 7 0 005 9.8C5 14.8 12 21 12 21zM12 12a2.4 2.4 0 100-4.8 2.4 2.4 0 000 4.8z",
  heart: "M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.3a4.3 4.3 0 017.5 2.5C19.5 15.4 12 20 12 20z",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  back: "M15 5l-7 7 7 7",
  chev: "M9 5l7 7-7 7",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A15 15 0 014 5a1 1 0 011-1z",
  share: "M12 15V4M8 8l4-4 4 4M5 13v6h14v-6",
  clock: "M12 4a8 8 0 100 16 8 8 0 000-16zM12 8v4.5l3 1.5",
  star: "M12 4l2.4 5 5.4.7-4 3.8 1 5.4-4.8-2.7-4.8 2.7 1-5.4-4-3.8 5.4-.7z",
  Restaurants: "M7 4v7M5 4v4a2 2 0 004 0V4M7 11v9M16 20V4c-2 1-3 4-3 7h3",
  Grocery: "M4 9h16l-1.5 10h-13zM8 9l3-5M16 9l-3-5",
  Pharmacy: "M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z",
  Fashion: "M12 7a2 2 0 10-2-2M12 7v2l8 5a1 1 0 01-.5 1.8h-15A1 1 0 014 14l8-5",
  Electronics: "M13 3L5 13h6l-1 8 8-10h-6z",
  Bakery: "M4 16c0-4 3.5-7 8-7s8 3 8 7v1.5H4zM9 9.5v8M15 9.5v8",
  Beauty: "M12 4l1.8 4.7 4.7 1.8-4.7 1.8L12 17l-1.8-4.7-4.7-1.8 4.7-1.8zM18 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z",
  Education: "M3 9l9-4 9 4-9 4zM7 11.5V16c2.5 2 7.5 2 10 0v-4.5",
  Hardware: "M14 5a4 4 0 00-4.5 5.2L4 15.7 8.3 20l5.5-5.5A4 4 0 0019 10l-2.5 2.5-3-1 1-3z",
  Services: "M4 8h16v11H4zM9 8V5h6v3M4 13h16",
  Rice: "M12 3c-4 4-6 8-6 11a6 6 0 0012 0c0-3-2-7-6-11z",
  Tea: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3",
  Tailoring: "M6 6a3 3 0 100 6 3 3 0 000-6zm12 0a3 3 0 100 6 3 3 0 000-6zm-7.5 4.5L18 19M13.5 10.5L6 19",
  Repair: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
};

export const SCN_RAW: Record<string, string> = {
  Restaurants: '<circle cx="60" cy="58" r="31" fill="#fff"/><circle cx="60" cy="58" r="22" fill="#F4EFEA"/><circle cx="60" cy="58" r="15" fill="#E8683A"/><circle cx="55" cy="53" r="5" fill="#7BB661"/><circle cx="66" cy="62" r="4" fill="#FFD27A"/><path d="M97 26v14a4 4 0 008 0V26M101 40v40" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>',
  Bakery: '<ellipse cx="60" cy="62" rx="36" ry="21" fill="#E9A55F"/><ellipse cx="60" cy="56" rx="32" ry="15" fill="#F2BC7C"/><path d="M42 50l8 12M56 46l8 14M70 48l8 12" stroke="#FFE6C2" stroke-width="4" stroke-linecap="round"/>',
  Grocery: '<circle cx="46" cy="42" r="12" fill="#E5533D"/><circle cx="66" cy="37" r="12" fill="#F3B63F"/><circle cx="82" cy="45" r="10" fill="#7BB661"/><path d="M26 50h68l-8 34H34z" fill="#fff"/><path d="M44 58v18M60 58v18M76 58v18" stroke="#0001" stroke-width="3"/>',
  Pharmacy: '<rect x="32" y="32" width="36" height="52" rx="9" fill="#fff"/><rect x="32" y="24" width="36" height="12" rx="5" fill="#5B7CFF"/><path d="M50 50v18M41 59h18" stroke="#5B7CFF" stroke-width="4" stroke-linecap="round"/><rect x="74" y="64" width="32" height="14" rx="7" fill="#FF8FA9" transform="rotate(-20 90 71)"/>',
  Fashion: '<path d="M38 34l-18 12 9 12 9-6v34h44V52l9 6 9-12-18-12c-4 7-10 9-22 9S42 41 38 34z" fill="#fff"/><path d="M38 62h44" stroke="#FF8FB0" stroke-width="4"/><path d="M60 26a5 5 0 10-5-5" stroke="#fff" stroke-width="3" fill="none"/>',
  Electronics: '<rect x="40" y="14" width="38" height="70" rx="9" fill="#fff"/><rect x="45" y="21" width="28" height="50" rx="5" fill="#5B7CFF" opacity=".55"/><circle cx="59" cy="77" r="3" fill="#0002"/><circle cx="94" cy="68" r="9" fill="#fff"/><circle cx="94" cy="68" r="4" fill="#0002"/>',
  Beauty: '<rect x="36" y="52" width="20" height="32" rx="4" fill="#fff"/><rect x="39" y="28" width="14" height="26" rx="6" fill="#E5456F"/><rect x="66" y="60" width="34" height="24" rx="7" fill="#fff"/><rect x="66" y="52" width="34" height="10" rx="4" fill="#F3B63F"/>',
  Salons: '<rect x="36" y="52" width="20" height="32" rx="4" fill="#fff"/><rect x="39" y="28" width="14" height="26" rx="6" fill="#E5456F"/><rect x="66" y="60" width="34" height="24" rx="7" fill="#fff"/><rect x="66" y="52" width="34" height="10" rx="4" fill="#F3B63F"/>',
  Education: '<rect x="24" y="66" width="72" height="16" rx="3" fill="#fff"/><rect x="30" y="50" width="62" height="16" rx="3" fill="#7C6BFF"/><rect x="26" y="34" width="60" height="16" rx="3" fill="#FF8A3D"/><path d="M92 24l10 28" stroke="#fff" stroke-width="5" stroke-linecap="round"/>',
  Hardware: '<path d="M28 76L68 36a15 15 0 0020-19l-10 10-9-2-2-9 10-10A15 15 0 0058 25L20 66z" fill="#fff"/><circle cx="90" cy="72" r="8" fill="#fff"/><path d="M86 72h8" stroke="#0003" stroke-width="3"/>',
  Services: '<path d="M50 42v-8a5 5 0 015-5h10a5 5 0 015 5v8" stroke="#fff" stroke-width="5" fill="none"/><rect x="28" y="42" width="64" height="42" rx="8" fill="#fff"/><path d="M28 60h64" stroke="#0001" stroke-width="3"/><rect x="55" y="55" width="10" height="10" rx="3" fill="#FF8A3D"/>',
  RiceShops: '<ellipse cx="60" cy="58" rx="26" ry="34" fill="#FDE68A"/><path d="M48 42c8 10 16 10 24 0M48 60c8 10 16 10 24 0" stroke="#D97706" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="74" r="5" fill="#B45309"/>',
  Rice: '<ellipse cx="60" cy="58" rx="26" ry="34" fill="#FDE68A"/><path d="M48 42c8 10 16 10 24 0M48 60c8 10 16 10 24 0" stroke="#D97706" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="74" r="5" fill="#B45309"/>',
  TeaStalls: '<path d="M38 42h44v28a12 12 0 01-12 12H50a12 12 0 01-12-12V42z" fill="#fff"/><path d="M82 48h10a6 6 0 010 12h-10" stroke="#fff" stroke-width="5" fill="none"/><path d="M48 24c0 6 6 8 6 14M62 24c0 6 6 8 6 14" stroke="#FF7A1A" stroke-width="3" stroke-linecap="round"/>',
  Tea: '<path d="M38 42h44v28a12 12 0 01-12 12H50a12 12 0 01-12-12V42z" fill="#fff"/><path d="M82 48h10a6 6 0 010 12h-10" stroke="#fff" stroke-width="5" fill="none"/><path d="M48 24c0 6 6 8 6 14M62 24c0 6 6 8 6 14" stroke="#FF7A1A" stroke-width="3" stroke-linecap="round"/>',
  Tailoring: '<rect x="30" y="34" width="60" height="40" rx="8" fill="#fff"/><circle cx="60" cy="54" r="12" fill="#EC4899"/><path d="M40 74h40" stroke="#0002" stroke-width="4"/>',
  Stationery: '<rect x="30" y="26" width="36" height="52" rx="4" fill="#fff"/><rect x="54" y="26" width="36" height="52" rx="4" fill="#818CF8"/><path d="M42 42h16M42 54h16M64 42h16M64 54h16" stroke="#fff" stroke-width="3"/>',
  Repair: '<path d="M34 76l38-38a12 12 0 0016-16l-8 8-7-2-2-7 8-8a12 12 0 00-16 16L25 67z" fill="#fff"/><circle cx="86" cy="72" r="8" fill="#3B82F6"/>',
};

export const SH_ELLIPSE = '<ellipse cx="60" cy="86" rx="40" ry="6" fill="#000" opacity=".13"/>';

export function getCategoryPalette(categoryId: string): [string, string] {
  const cat = CATEGORY_LIST.find((c) => c.id === categoryId);
  if (cat) return cat.colors;
  const idx = Math.abs(categoryId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % CATEGORY_PALETTES.length;
  return CATEGORY_PALETTES[idx];
}

export function getCategoryIconSvg(iconKey: string, size: number = 22, extraClass: string = ''): string {
  const path = IC_PATHS[iconKey] || IC_PATHS[iconKey.toLowerCase()] || IC_PATHS['home'];
  return `<svg class="${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`;
}

export function getCategorySceneSvg(categoryId: string): string {
  const inner = SCN_RAW[categoryId] || SCN_RAW['Restaurants'];
  return `<svg viewBox="0 0 120 100" aria-hidden="true">${SH_ELLIPSE}${inner}</svg>`;
}
