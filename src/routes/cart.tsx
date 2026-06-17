import { createFileRoute, Link } from "@tanstack/react-router";
import { StoreHeader } from "@/components/StoreHeader";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سبد خرید | MobileNirvana" },
      { name: "description", content: "سبد خرید شما در فروشگاه MobileNirvana" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);
  const count = items.reduce((a, b) => a + b.qty, 0);

  return (
    <div className="min-h-screen">
      <StoreHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 font-display text-3xl text-neon-pink text-neon">سبد خرید</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-background/40 p-12 text-center">
            <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">سبد خرید شما خالی است</p>
            <Link to="/">
              <Button className="mt-4">بازگشت به فروشگاه</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-background/40 p-3 backdrop-blur"
                >
                  <div className="coming-soon-pattern h-16 w-16 shrink-0 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold">{it.title}</div>
                    <div className="text-xs text-muted-foreground">{it.category} • {it.id}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setQty(it.id, it.qty - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{it.qty}</span>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setQty(it.id, it.qty + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive" onClick={() => remove(it.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-background/40 p-5 backdrop-blur">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">تعداد اقلام</span>
                <span>{count}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">جمع کل</span>
                <span className="font-bold">به‌زودی اعلام می‌شود</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  className="flex-1 bg-neon-pink text-background font-bold"
                  style={{ boxShadow: "0 0 24px -4px var(--neon-pink)" }}
                  onClick={() => toast.info("درگاه پرداخت به‌زودی فعال می‌شود")}
                >
                  تسویه حساب
                </Button>
                <Button variant="outline" onClick={() => clear()}>خالی کردن سبد</Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
