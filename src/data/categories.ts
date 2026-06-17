import {
  Smartphone, ShieldCheck, Laptop, Gift, Watch, Gamepad2,
  Speaker, Headphones, Joystick, BatteryCharging, Cable,
  type LucideIcon,
} from "lucide-react";

export type CategoryFilter = {
  key: string;
  label: string;
  options: string[];
};

export type Category = {
  slug: string;
  name: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  colorVar: string;
  brands: string[];
  filters: CategoryFilter[];
  itemCount: number;
};

export const CATEGORIES: Category[] = [
  {
    slug: "mobile",
    name: "موبایل",
    subtitle: "همه برندها و مدل‌ها",
    icon: Smartphone,
    color: "text-neon-cyan",
    colorVar: "var(--neon-cyan)",
    brands: ["Apple", "Samsung", "Xiaomi", "Huawei", "Google", "OnePlus", "Nokia", "Sony", "Honor", "Realme"],
    filters: [
      { key: "brand", label: "برند", options: ["Apple", "Samsung", "Xiaomi", "Huawei", "Google", "OnePlus", "Nokia", "Sony", "Honor", "Realme"] },
      { key: "ram", label: "حافظه رم", options: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
      { key: "color", label: "رنگ", options: ["مشکی", "سفید", "طلایی", "نقره‌ای", "آبی", "بنفش"] },
    ],
    itemCount: 216,
  },
  {
    slug: "cases",
    name: "قاب گوشی",
    subtitle: "برای همه مدل‌ها",
    icon: ShieldCheck,
    color: "text-neon-pink",
    colorVar: "var(--neon-pink)",
    brands: ["Spigen", "OtterBox", "Apple", "Samsung", "UAG", "Nillkin", "Baseus"],
    filters: [
      { key: "brand", label: "برند", options: ["Spigen", "OtterBox", "Apple", "Samsung", "UAG", "Nillkin", "Baseus"] },
      { key: "type", label: "نوع", options: ["سیلیکونی", "ژله‌ای", "محافظ", "چرمی", "شفاف", "مگ‌سیف"] },
      { key: "phone", label: "گوشی", options: ["iPhone 15", "iPhone 14", "Galaxy S24", "Galaxy S23", "Xiaomi 14", "Pixel 8"] },
    ],
    itemCount: 232,
  },
  {
    slug: "laptops",
    name: "لپ‌تاپ و کامپیوتر",
    subtitle: "همه برندها",
    icon: Laptop,
    color: "text-neon-purple",
    colorVar: "var(--neon-purple)",
    brands: ["Apple", "ASUS", "Dell", "HP", "Lenovo", "MSI", "Acer", "Razer"],
    filters: [
      { key: "brand", label: "برند", options: ["Apple", "ASUS", "Dell", "HP", "Lenovo", "MSI", "Acer", "Razer"] },
      { key: "cpu", label: "پردازنده", options: ["Intel i5", "Intel i7", "Intel i9", "Ryzen 5", "Ryzen 7", "Ryzen 9", "Apple M3"] },
      { key: "ram", label: "رم", options: ["8GB", "16GB", "32GB", "64GB"] },
      { key: "gpu", label: "گرافیک", options: ["RTX 4050", "RTX 4060", "RTX 4070", "RTX 4080", "RTX 4090"] },
    ],
    itemCount: 208,
  },
  {
    slug: "giftcards",
    name: "گیفت کارت",
    subtitle: "بازی، اپ، موزیک",
    icon: Gift,
    color: "text-neon-gold",
    colorVar: "var(--neon-gold)",
    brands: ["PSN", "Xbox", "Steam", "Google Play", "App Store", "Spotify", "Netflix", "Nintendo"],
    filters: [
      { key: "platform", label: "پلتفرم", options: ["PSN", "Xbox", "Steam", "Google Play", "App Store", "Spotify", "Netflix", "Nintendo", "Apple Music"] },
      { key: "amount", label: "مبلغ", options: ["$5", "$10", "$25", "$50", "$100"] },
      { key: "region", label: "منطقه", options: ["آمریکا", "اروپا", "ترکیه", "انگلیس", "کانادا"] },
    ],
    itemCount: 224,
  },
  {
    slug: "smartwatch",
    name: "ساعت هوشمند",
    subtitle: "همه برندها",
    icon: Watch,
    color: "text-neon-green",
    colorVar: "var(--neon-green)",
    brands: ["Apple", "Samsung", "Garmin", "Huawei", "Xiaomi", "Amazfit", "Fitbit"],
    filters: [
      { key: "brand", label: "برند", options: ["Apple", "Samsung", "Garmin", "Huawei", "Xiaomi", "Amazfit", "Fitbit"] },
      { key: "size", label: "سایز", options: ["38mm", "41mm", "44mm", "45mm", "49mm"] },
      { key: "connectivity", label: "اتصال", options: ["GPS", "Cellular", "Bluetooth"] },
    ],
    itemCount: 204,
  },
  {
    slug: "gaming",
    name: "هدست، موس و کیبورد گیمینگ",
    subtitle: "همه برندها",
    icon: Gamepad2,
    color: "text-neon-red",
    colorVar: "var(--neon-red)",
    brands: ["Razer", "Logitech", "SteelSeries", "Corsair", "HyperX", "ASUS ROG"],
    filters: [
      { key: "type", label: "نوع", options: ["هدست", "موس", "کیبورد", "ماوس‌پد"] },
      { key: "brand", label: "برند", options: ["Razer", "Logitech", "SteelSeries", "Corsair", "HyperX", "ASUS ROG"] },
      { key: "wireless", label: "اتصال", options: ["باسیم", "بی‌سیم", "بلوتوث"] },
    ],
    itemCount: 220,
  },
  {
    slug: "speakers",
    name: "اسپیکر",
    subtitle: "همه برندها",
    icon: Speaker,
    color: "text-neon-orange",
    colorVar: "var(--neon-orange)",
    brands: ["JBL", "Bose", "Sony", "Marshall", "Harman Kardon", "Anker", "Xiaomi"],
    filters: [
      { key: "brand", label: "برند", options: ["JBL", "Bose", "Sony", "Marshall", "Harman Kardon", "Anker", "Xiaomi"] },
      { key: "type", label: "نوع", options: ["قابل حمل", "خانگی", "ضدآب", "هوشمند"] },
      { key: "battery", label: "باتری", options: ["تا ۱۰ ساعت", "تا ۲۰ ساعت", "تا ۴۰ ساعت"] },
    ],
    itemCount: 212,
  },
  {
    slug: "headphones",
    name: "هندزفری",
    subtitle: "همه برندها",
    icon: Headphones,
    color: "text-neon-blue",
    colorVar: "var(--neon-blue)",
    brands: ["Apple", "Samsung", "Sony", "Bose", "JBL", "Anker", "Xiaomi", "Sennheiser"],
    filters: [
      { key: "brand", label: "برند", options: ["Apple", "Samsung", "Sony", "Bose", "JBL", "Anker", "Xiaomi", "Sennheiser"] },
      { key: "type", label: "نوع", options: ["TWS", "Over-Ear", "On-Ear", "In-Ear", "باسیم"] },
      { key: "anc", label: "نویز کنسلینگ", options: ["دارد", "ندارد"] },
    ],
    itemCount: 228,
  },
  {
    slug: "consoles",
    name: "کنسول بازی",
    subtitle: "همه برندها",
    icon: Joystick,
    color: "text-neon-violet",
    colorVar: "var(--neon-violet)",
    brands: ["Sony", "Microsoft", "Nintendo", "Valve"],
    filters: [
      { key: "brand", label: "برند", options: ["Sony", "Microsoft", "Nintendo", "Valve"] },
      { key: "model", label: "مدل", options: ["PS5", "PS5 Pro", "PS5 Slim", "Xbox Series X", "Xbox Series S", "Switch", "Switch OLED", "Steam Deck"] },
      { key: "edition", label: "نسخه", options: ["استاندارد", "Digital", "Bundle"] },
    ],
    itemCount: 200,
  },
  {
    slug: "powerbanks",
    name: "پاوربانک",
    subtitle: "همه برندها",
    icon: BatteryCharging,
    color: "text-neon-yellow",
    colorVar: "var(--neon-yellow)",
    brands: ["Anker", "Xiaomi", "Baseus", "Romoss", "Energizer", "Samsung"],
    filters: [
      { key: "brand", label: "برند", options: ["Anker", "Xiaomi", "Baseus", "Romoss", "Energizer", "Samsung"] },
      { key: "capacity", label: "ظرفیت", options: ["10000mAh", "20000mAh", "30000mAh", "50000mAh"] },
      { key: "power", label: "توان", options: ["18W", "22.5W", "45W", "65W", "100W"] },
    ],
    itemCount: 208,
  },
  {
    slug: "chargers",
    name: "شارژر و کابل",
    subtitle: "همه برندها",
    icon: Cable,
    color: "text-neon-teal",
    colorVar: "var(--neon-teal)",
    brands: ["Apple", "Samsung", "Anker", "Baseus", "Xiaomi", "Belkin", "Ugreen"],
    filters: [
      { key: "type", label: "نوع", options: ["شارژر دیواری", "شارژر ماشین", "کابل", "شارژر بی‌سیم", "آداپتور"] },
      { key: "connector", label: "کانکتور", options: ["USB-C", "Lightning", "Micro USB", "MagSafe"] },
      { key: "power", label: "توان", options: ["20W", "30W", "45W", "65W", "100W", "140W"] },
    ],
    itemCount: 240,
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export type PlaceholderProduct = {
  id: string;
  title: string;
  brand: string;
  price: number;
  attrs: Record<string, string>;
};

export function generateProducts(cat: Category): PlaceholderProduct[] {
  const items: PlaceholderProduct[] = [];
  for (let i = 1; i <= cat.itemCount; i++) {
    const brand = cat.brands[i % cat.brands.length];
    const attrs: Record<string, string> = { برند: brand };
    cat.filters.slice(1).forEach((f) => {
      attrs[f.label] = f.options[i % f.options.length];
    });
    items.push({
      id: `${cat.slug}-${String(i).padStart(3, "0")}`,
      title: `${cat.name} ${brand} مدل ${String(i).padStart(3, "0")}`,
      brand,
      price: 0,
      attrs,
    });
  }
  return items;
}
