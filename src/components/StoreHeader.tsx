import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useEffect, useState } from "react";

export function StoreHeader() {
  const count = useCart((s) => s.items.reduce((a, b) => a + b.qty, 0));
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => setMounted(true), []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use browser history if there's something to go back to, otherwise home
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/" });
    }
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="mx-auto grid h-14 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:h-16 sm:px-4">
        {!isHome ? (
          <button
            onClick={handleBack}
            className="flex shrink-0 items-center gap-1 rounded-full px-2 py-1.5 text-foreground hover:bg-white/5 hover:text-neon-pink transition sm:gap-2 sm:px-3"
            aria-label="بازگشت"
          >
            <ArrowRight className="h-5 w-5" />
            <span className="hidden text-sm sm:inline">بازگشت</span>
          </button>
        ) : (
          <span className="w-8" />
        )}

        <Link
          to="/"
          className="font-display truncate text-center text-base tracking-widest text-neon-cyan text-neon sm:text-xl"
        >
          MobileNirvana
        </Link>

        <Link
          to="/cart"
          className="relative flex shrink-0 items-center justify-center rounded-full px-2 py-2 hover:bg-white/5 transition sm:px-3"
          aria-label="سبد خرید"
        >
          <ShoppingCart className="h-5 w-5 text-neon-pink" />
          {mounted && count > 0 && (
            <span className="absolute -top-0.5 -left-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-neon-pink px-1 text-[10px] font-bold text-background sm:h-5 sm:min-w-5 sm:text-[11px]">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
