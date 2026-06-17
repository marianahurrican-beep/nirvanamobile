import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-gaming-room.jpg";
import { CATEGORIES } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MobileNirvana | فروشگاه گجت‌های لوکس" },
      { name: "description", content: "فروشگاه آنلاین موبایل، لپ‌تاپ، کنسول، گیمینگ، گیفت کارت و لوازم جانبی" },
      { property: "og:title", content: "MobileNirvana" },
      { property: "og:description", content: "فروشگاه آنلاین موبایل، لپ‌تاپ، کنسول، گیمینگ و لوازم جانبی" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const count = useCart((s) => s.items.reduce((a, b) => a + b.qty, 0));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.10_0.04_290)_85%)]" />
      </div>

      {/* Cart icon */}
      <Link
        to="/cart"
        className="fixed top-4 left-4 z-40 flex items-center gap-2 rounded-full glass px-4 py-2 hover:scale-105 transition"
      >
        <ShoppingCart className="h-5 w-5 text-neon-pink" />
        {mounted && count > 0 && (
          <span className="text-sm font-bold text-neon-pink">{count}</span>
        )}
      </Link>

      <main className="relative mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="mb-10 text-center sm:mb-14">
          <h1
            className="font-display text-5xl font-black tracking-[0.12em] sm:text-7xl md:text-8xl"
            style={{
              color: "var(--neon-pink)",
              textShadow:
                "0 0 12px var(--neon-pink), 0 0 32px var(--neon-pink), 0 0 60px var(--neon-purple)",
            }}
          >
            MobileNirvana
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            دنیای گجت‌های لوکس و گیمینگ
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} cat={cat} mouse={mouse} />
          ))}
        </div>
      </main>
    </div>
  );
}
