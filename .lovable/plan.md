
## نمای کلی

ساخت فروشگاه **MobileNirvana** فقط در سمت فرانت‌اند (بدون بک‌اند، بدون درگاه واقعی، بدون باشگاه مشتریان فعال). همه چیز با TanStack Router به صورت چندصفحه‌ای ساخته می‌شود تا هر کتگوری URL و SEO اختصاصی داشته باشد. سبد خرید در `localStorage` نگه داشته می‌شود.

> توجه: درگاه پرداخت واقعی، حساب کاربری، و باشگاه مشتریان فعلاً پیاده‌سازی نمی‌شوند (طبق انتخاب شما). دکمه «افزودن به سبد» کار می‌کند اما تسویه‌حساب فقط ماک است. هر وقت خواستید، با فعال کردن Lovable Cloud می‌توان بک‌اند واقعی اضافه کرد.

## صفحه اول (`/`)

- نام بزرگ **MobileNirvana** در مرکز/بالا با تایپوگرافی نئونی فارسی+لاتین (فونت Vazirmatn برای فارسی، Orbitron/Audiowide برای لاتین).
- پس‌زمینه: یک تصویر سینمایی تولید‌شده با AI — «پسری با گوشی لوکس نشسته در اتاق گیمینگ نئونی در حال تماشای انیمه روی مانیتور بزرگ، نور بنفش/آبی/صورتی، RGB، هدفون، کنسول، اسپیکر، ساعت هوشمند روی میز» — با اورلی تیره برای خوانایی.
- ۱۱ کارت کتگوری به صورت Grid مینیمال شیشه‌ای/نئونی:
  1. موبایل
  2. قاب گوشی
  3. لپ‌تاپ و کامپیوتر
  4. گیفت کارت
  5. ساعت هوشمند
  6. هدست/موس/کیبورد گیمینگ
  7. اسپیکر
  8. هندزفری
  9. کنسول
  10. پاوربانک
  11. شارژر و کابل
- هر کارت آیکون مینیمال SVG مخصوص خود با رنگ نئونی متفاوت (موبایل=سایان، قاب=صورتی، لپ‌تاپ=بنفش، گیفت=طلایی، ساعت=سبز نئون، گیمینگ=قرمز، اسپیکر=نارنجی، هندزفری=آبی، کنسول=بنفش روشن، پاوربانک=زرد، شارژر=سبز فیروزه‌ای) با بک‌گراند ترنسپرنت.
- **افکت موس**: با ردیابی موقعیت موس روی صفحه، آیکون‌ها به صورت parallax/tilt حرکت می‌کنند و glow نئونی روی نزدیک‌ترین کارت به موس روشن می‌شود (CSS transform + `mousemove` listener، بدون کتابخانه سنگین).
- روی هاور: کارت کمی بزرگ، نور نئون قوی‌تر، آیکون انیمیشن (چرخش/پالس).

## صفحات کتگوری

برای هر کتگوری یک route مجزا:
- `/mobile`, `/cases`, `/laptops`, `/giftcards`, `/smartwatch`, `/gaming`, `/speakers`, `/headphones`, `/consoles`, `/powerbanks`, `/chargers`

ساختار هر صفحه:
- **هدر چسبان** با لوگو + لینک بازگشت + آیکون سبد خرید (با badge تعداد).
- **سایدبار سرچ و فیلتر** (در دسکتاپ کنار، در موبایل به صورت Drawer). فیلترها مخصوص هر کتگوری:
  - موبایل/قاب: برند (Apple, Samsung, Xiaomi, Huawei, Google, OnePlus, Nokia, Sony, …)، مدل، رنگ، محدوده قیمت
  - لپ‌تاپ: برند (Apple, ASUS, Dell, HP, Lenovo, MSI, Acer, Razer)، CPU، RAM، GPU
  - گیفت کارت: نوع (PSN, Xbox, Steam, Google Play, App Store, Spotify, Netflix, …)، مبلغ، منطقه
  - ساعت: برند، سایز، اتصال
  - گیمینگ: نوع (هدست/موس/کیبورد)، برند، باسیم/بی‌سیم
  - اسپیکر/هندزفری: برند، نوع اتصال، باتری
  - کنسول: برند (Sony, Microsoft, Nintendo)، نسل
  - پاوربانک: ظرفیت، توان، برند
  - شارژر/کابل: نوع کانکتور (USB-C/Lightning/Micro)، توان، برند
- **گرید کادرها**: ۲۰۰+ کادر «Coming Soon» با Pagination (مثلاً ۲۴ عدد در هر صفحه = ~۹ صفحه). هر کادر:
  - فریم خالی با pattern شطرنجی ظریف و متن «به‌زودی / Coming Soon»
  - عنوان generic مثل «محصول #001»
  - روی هاور: **بولد شدن** (border نئونی، scale، glow)
  - کلیک: باز شدن **Dialog/Modal** با:
    - عنوان محصول
    - مشخصات نمونه (placeholder)
    - قیمت placeholder
    - دکمه «افزودن به سبد خرید»
- جستجوی متنی در سایدبار با فیلتر زنده روی همان ۲۰۰ کادر.

## سبد خرید

- آیکون سبد در هدر همه صفحات.
- صفحه `/cart` با لیست اقلام، تغییر تعداد، حذف، جمع کل.
- دکمه «تسویه‌حساب» که فعلاً یک toast نمایش می‌دهد: «درگاه پرداخت به‌زودی فعال می‌شود».
- ذخیره در `localStorage` (Zustand یا Context ساده).

## دارایی‌های تصویری

با AI تولید می‌شوند:
1. تصویر hero پس‌زمینه صفحه اول (`src/assets/hero-gaming-room.jpg`) — 1920×1024 سینمایی نئونی.
2. ۱۱ آیکون SVG/PNG شفاف نئونی برای کتگوری‌ها — یا با Lucide React + استایل نئون (سبک‌تر و سریع‌تر؛ ترجیح می‌دهم Lucide با گلو CSS استفاده کنم تا حجم پایین بماند).

## جزئیات فنی

- **استک**: TanStack Start (موجود)، Tailwind v4، shadcn/ui (Dialog, Sheet, Input, Button, Badge, Pagination).
- **فونت**: نصب `@fontsource-variable/vazirmatn` و `@fontsource/orbitron`.
- **RTL**: `dir="rtl"` و `lang="fa"` روی `<html>` در `__root.tsx`.
- **توکن‌های رنگ نئونی** در `src/styles.css` با OKLCH:
  - `--neon-cyan`, `--neon-pink`, `--neon-purple`, `--neon-green`, `--neon-gold`, `--neon-red`, `--neon-orange`, `--neon-blue`, `--neon-yellow`, `--neon-teal`
  - `--bg-deep` (مشکی-بنفش تیره)، gradient/shadow ها
- **داده محصولات**: یک فایل `src/data/categories.ts` با تعریف هر کتگوری، فیلترهایش، و تابعی که آرایه‌ای از ۲۰۰ پلیس‌هولدر تولید می‌کند.
- **state سبد**: `src/lib/cart-store.ts` با Zustand + persist.
- **SEO**: هر route با `head()` اختصاصی (title و description فارسی).

## فایل‌های ساخته‌شده

```text
src/
  routes/
    __root.tsx           (RTL, فونت‌ها، Provider سبد، Header در کتگوری‌ها)
    index.tsx            (صفحه اول نئونی)
    mobile.tsx
    cases.tsx
    laptops.tsx
    giftcards.tsx
    smartwatch.tsx
    gaming.tsx
    speakers.tsx
    headphones.tsx
    consoles.tsx
    powerbanks.tsx
    chargers.tsx
    cart.tsx
  components/
    HeroBackground.tsx
    CategoryCard.tsx        (با parallax موس و گلو نئون)
    StoreHeader.tsx
    CategoryPage.tsx        (کامپوننت مشترک برای همه صفحات کتگوری)
    ProductGrid.tsx
    ProductCard.tsx         (کادر Coming Soon)
    ProductDialog.tsx
    FilterSidebar.tsx
    CartDrawer.tsx
  data/
    categories.ts
  lib/
    cart-store.ts
  assets/
    hero-gaming-room.jpg
  styles.css                (توکن‌های نئون + RTL)
```

## خارج از این فاز

- درگاه پرداخت واقعی (Stripe/زرین‌پال)
- ثبت‌نام/ورود
- باشگاه مشتریان (امتیاز، سطح، تخفیف)
- پنل ادمین برای آپلود محصولات

این موارد در فازهای بعدی با فعال کردن Lovable Cloud قابل اضافه شدن هستند.
