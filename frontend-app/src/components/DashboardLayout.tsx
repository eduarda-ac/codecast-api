import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Home, Radio, Mic2, CalendarPlus, Terminal } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/salas", label: "Salas", icon: Radio },
  { to: "/apresentadores", label: "Apresentadores", icon: Mic2 },
  { to: "/reservas", label: "Reservas", icon: CalendarPlus },
] as const;

export function DashboardLayout({ children }: { children?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-card/40 backdrop-blur">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
          <Terminal className="h-6 w-6 text-[var(--neon)]" />
          <div>
            <div className="font-display text-lg neon-text tracking-widest">CODECAST</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
              studio_ctrl
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-mono uppercase tracking-wider transition-all ${
                  active
                    ? "bg-[color-mix(in_oklab,var(--neon)_18%,transparent)] text-[var(--neon)] neon-border"
                    : "text-muted-foreground hover:text-[var(--neon)] hover:bg-secondary/40"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 text-[10px] text-muted-foreground font-mono border-t border-border">
          <span className="text-[var(--neon)]">●</span> sistema online
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-card/80 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-[var(--neon)]" />
            <span className="font-display neon-text tracking-widest">CODECAST</span>
          </div>
        </div>
        <nav className="flex overflow-x-auto px-2 pb-2 gap-1">
          {navItems.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-mono uppercase whitespace-nowrap ${
                  active
                    ? "bg-[color-mix(in_oklab,var(--neon)_18%,transparent)] text-[var(--neon)]"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <main className="flex-1 min-w-0 pt-28 md:pt-0">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl font-display neon-text">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground font-mono">{`> ${subtitle}`}</p>
      )}
    </header>
  );
}
