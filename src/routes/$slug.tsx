import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getCategory, generateProducts, CATEGORIES } from "@/data/categories";
import { StoreHeader } from "@/components/StoreHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Filter, Search, ShoppingCart, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name} | MobileNirvana` },
          { name: "description", content: `خرید ${loaderData.cat.name} از همه برندها در MobileNirvana` },
        ]
      : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center">
      <div>
        <h1 className="font-display text-4xl text-neon-pink">۴۰۴</h1>
        <p className="text-muted-foreground mt-2">این دسته‌بندی پیدا نشد</p>
      </div>
    </div>
  ),
});

const PER_PAGE = 24;

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const allProducts = useMemo(() => generateProducts(cat), [cat]);

  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, Set<string>>>({});
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<(typeof allProducts)[number] | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) && !p.id.toLowerCase().includes(q)) return false;
      for (const fkey of Object.keys(activeFilters)) {
        const set = activeFilters[fkey];
        if (set.size === 0) continue;
        const label = cat.filters.find((f) => f.key === fkey)?.label;
        if (!label) continue;
        if (!set.has(p.attrs[label])) return false;
      }
      return true;
    });
  }, [allProducts, query, activeFilters, cat]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleFilter = (k: string, v: string) => {
    setPage(1);
    setActiveFilters((prev) => {
      const set = new Set(prev[k] ?? []);
      set.has(v) ? set.delete(v) : set.add(v);
      return { ...prev, [k]: set };
    });
  };

  const Icon = cat.icon;

  const Sidebar = (
    <aside className="space-y-5 p-4">
      <div className="flex items-center gap-3">
        <Icon
          className="h-7 w-7"
          style={{ color: cat.colorVar, filter: `drop-shadow(0 0 6px ${cat.colorVar})` }}
        />
        <div>
          <h2 className="font-display text-lg" style={{ color: cat.colorVar }}>{cat.name}</h2>
          <p className="text-xs text-muted-foreground">{filtered.length} محصول</p>
        </div>
      </div>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          dir="rtl"
          placeholder="جستجو..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          className="pr-9"
        />
      </div>
      {cat.filters.map((f) => (
        <div key={f.key}>
          <h3 className="mb-2 text-sm font-bold text-foreground">{f.label}</h3>
          <div className="flex flex-wrap gap-1.5">
            {f.options.map((opt) => {
              const active = activeFilters[f.key]?.has(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleFilter(f.key, opt)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    active
                      ? "border-transparent text-background"
                      : "border-white/15 text-muted-foreground hover:text-foreground hover:border-white/40"
                  }`}
                  style={active ? { background: cat.colorVar } : {}}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );

  return (
    <div className="min-h-screen">
      <StoreHeader />

      {/* Hero strip */}
      <div
        className="border-b border-white/10"
        style={{
          background: `radial-gradient(ellipse at center, color-mix(in oklch, ${cat.colorVar} 15%, transparent), transparent 70%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-8 text-center">
          <h1
            className="font-display text-3xl font-black sm:text-5xl"
            style={{ color: cat.colorVar, textShadow: `0 0 16px ${cat.colorVar}` }}
          >
            {cat.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{cat.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="hidden rounded-2xl border border-white/10 bg-background/30 backdrop-blur-md lg:block">
            {Sidebar}
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="ml-2 h-4 w-4" /> فیلترها
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] overflow-y-auto">
                  <SheetTitle className="sr-only">فیلترها</SheetTitle>
                  {Sidebar}
                </SheetContent>
              </Sheet>
              <span className="text-xs text-muted-foreground">{filtered.length} محصول</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {pageItems.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="group relative aspect-[3/4] rounded-xl border border-white/10 bg-background/40 p-3 text-right transition-all duration-200 hover:scale-[1.03] hover:border-transparent"
                  style={{
                    boxShadow: `0 0 0 0 transparent`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 24px -4px ${cat.colorVar}, inset 0 0 24px -8px ${cat.colorVar}`;
                    e.currentTarget.style.borderColor = cat.colorVar;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  <div className="coming-soon-pattern absolute inset-3 rounded-lg grid place-items-center overflow-hidden">
                    <div className="text-center opacity-70 transition group-hover:opacity-100">
                      <Sparkles
                        className="mx-auto h-6 w-6 mb-1"
                        style={{ color: cat.colorVar, filter: `drop-shadow(0 0 6px ${cat.colorVar})` }}
                      />
                      <div className="font-display text-[10px] tracking-wider" style={{ color: cat.colorVar }}>
                        COMING SOON
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1">به‌زودی</div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-3 left-3">
                    <div className="text-[10px] text-muted-foreground">{p.id}</div>
                    <div className="truncate text-xs font-bold group-hover:text-foreground" style={{ color: "var(--foreground)" }}>
                      {p.brand}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center text-muted-foreground">محصولی پیدا نشد</div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination page={page} total={totalPages} onChange={setPage} color={cat.colorVar} />
            )}
          </div>
        </div>
      </div>

      <ProductDialog
        product={selected}
        cat={cat}
        onClose={() => setSelected(null)}
      />

      <RelatedCats currentSlug={cat.slug} />
    </div>
  );
}

function Pagination({
  page, total, onChange, color,
}: { page: number; total: number; onChange: (p: number) => void; color: string }) {
  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(total, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => onChange(page - 1)}>
        قبلی
      </Button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-9 w-9 rounded-md text-sm transition ${
            p === page
              ? "text-background font-bold"
              : "border border-white/15 text-muted-foreground hover:text-foreground"
          }`}
          style={p === page ? { background: color, boxShadow: `0 0 16px -4px ${color}` } : {}}
        >
          {p}
        </button>
      ))}
      <Button variant="outline" size="sm" disabled={page === total} onClick={() => onChange(page + 1)}>
        بعدی
      </Button>
    </div>
  );
}

function ProductDialog({
  product, cat, onClose,
}: {
  product: ReturnType<typeof generateProducts>[number] | null;
  cat: ReturnType<typeof getCategory>;
  onClose: () => void;
}) {
  const add = useCart((s) => s.add);
  if (!cat) return null;
  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl" style={{ color: cat.colorVar }}>
            {product?.title}
          </DialogTitle>
          <DialogDescription>
            کد محصول: {product?.id}
          </DialogDescription>
        </DialogHeader>

        <div
          className="coming-soon-pattern grid h-48 place-items-center rounded-lg border border-white/10"
          style={{ boxShadow: `inset 0 0 40px -10px ${cat.colorVar}` }}
        >
          <div className="text-center">
            <Sparkles
              className="mx-auto h-10 w-10 mb-2"
              style={{ color: cat.colorVar, filter: `drop-shadow(0 0 10px ${cat.colorVar})` }}
            />
            <div className="font-display text-sm" style={{ color: cat.colorVar }}>
              تصویر به‌زودی اضافه می‌شود
            </div>
          </div>
        </div>

        {product && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold">مشخصات</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(product.attrs).map(([k, v]) => (
                <Badge key={k} variant="secondary" className="text-xs">
                  {k}: {v}
                </Badge>
              ))}
            </div>
            <p className="pt-2 text-xs text-muted-foreground">
              قیمت پس از موجود شدن محصول اعلام می‌شود.
            </p>
          </div>
        )}

        <Button
          onClick={() => {
            if (!product) return;
            add({
              id: product.id,
              title: product.title,
              category: cat.name,
              price: 0,
            });
            toast.success("به سبد خرید اضافه شد", { description: product.title });
            onClose();
          }}
          className="w-full text-background font-bold"
          style={{ background: cat.colorVar, boxShadow: `0 0 20px -4px ${cat.colorVar}` }}
        >
          <ShoppingCart className="ml-2 h-4 w-4" />
          افزودن به سبد خرید
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function RelatedCats({ currentSlug }: { currentSlug: string }) {
  const others = CATEGORIES.filter((c) => c.slug !== currentSlug).slice(0, 6);
  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 pb-12">
      <h2 className="mb-4 font-display text-lg text-muted-foreground">سایر دسته‌بندی‌ها</h2>
      <div className="flex flex-wrap gap-2">
        {others.map((c) => {
          const I = c.icon;
          return (
            <a
              key={c.slug}
              href={`/${c.slug}`}
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs hover:border-white/30 transition"
              style={{ color: c.colorVar }}
            >
              <I className="h-3.5 w-3.5" />
              {c.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
