import { Link } from "@tanstack/react-router";
import { useRef, type MouseEvent } from "react";
import type { Category } from "@/data/categories";

export function CategoryCard({ cat, mouse }: { cat: Category; mouse: { x: number; y: number } }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = cat.icon;

  // parallax tilt based on global mouse
  let tx = 0, ty = 0, intensity = 0;
  if (ref.current) {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const dist = Math.hypot(dx, dy);
    const max = 600;
    intensity = Math.max(0, 1 - dist / max);
    tx = (dx / max) * 8;
    ty = (dy / max) * 8;
  }

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <Link
      ref={ref}
      to="/$slug"
      params={{ slug: cat.slug }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative block rounded-2xl border border-white/10 bg-background/30 p-5 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-background/50"
      style={{
        color: cat.colorVar,
        transform: `perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translate3d(${tx}px, ${ty}px, 0)`,
        boxShadow: `0 0 ${20 + intensity * 40}px -10px ${cat.colorVar}, inset 0 0 ${intensity * 30}px -10px ${cat.colorVar}`,
      }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="grid h-14 w-14 place-items-center rounded-xl"
          style={{
            background: `radial-gradient(circle at center, color-mix(in oklch, ${cat.colorVar} 18%, transparent), transparent 70%)`,
          }}
        >
          <Icon
            className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 animate-float-y"
            style={{
              color: cat.colorVar,
              filter: `drop-shadow(0 0 6px ${cat.colorVar}) drop-shadow(0 0 16px ${cat.colorVar})`,
            }}
            strokeWidth={1.5}
          />
        </div>
        <div>
          <h3
            className="font-display text-sm font-bold tracking-wide sm:text-base"
            style={{ color: cat.colorVar, textShadow: `0 0 8px ${cat.colorVar}` }}
          >
            {cat.name}
          </h3>
          <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{cat.subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
