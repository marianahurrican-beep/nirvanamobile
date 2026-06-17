import { Link } from "@tanstack/react-router";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useEffect, useState } from "react";

export function StoreHeader() {
  const count = useCart((s) => s.items.reduce((a, b) => a + b.qty, 0));
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-foreground hover:text-neon-pink transition">
          <ArrowRight className="h-5 w-5" />
          <span className="text-sm">بازگشت</span>
        </Link>
        <Link to="/" className="font-display text-xl tracking-widest text-neon-cyan text-neon">
          MobileNirvana
        </Link>
        <Link
          to="/cart"
          className="relative flex items-center gap-2 rounded-full px-3 py-2 hover:bg-white/5 transition"
        >
          <ShoppingCart className="h-5 w-5 text-neon-pink" />
          {mounted && count > 0 && (
            <span className="absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neon-pink px-1 text-[11px] font-bold text-background">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
