import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/DashboardLayout";
import { Radio, Mic2, CalendarPlus, Activity } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeCast — Painel" },
      { name: "description", content: "Painel de controle do CodeCast" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <DashboardLayout>
      <PageHeader title="Bem-vindo ao CodeCast" subtitle="painel de controle do estúdio" />

      <div className="panel p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-lg neon-border grid place-items-center shrink-0">
            <Activity className="h-7 w-7 text-[var(--neon)]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-display neon-text-pink">SISTEMA ATIVO</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Gerencie salas, apresentadores e reservas do seu podcast. Use o menu lateral para navegar
              entre os módulos.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Radio, label: "Salas", desc: "Gerencie estúdios e equipamentos disponíveis." },
          { icon: Mic2, label: "Apresentadores", desc: "Cadastre os hosts do seu programa." },
          { icon: CalendarPlus, label: "Reservas", desc: "Agende sessões evitando conflitos." },
        ].map((c) => (
          <div key={c.label} className="panel p-5 hover:neon-border transition-all">
            <c.icon className="h-6 w-6 text-[var(--neon)] mb-3" />
            <div className="font-display tracking-wider text-lg">{c.label}</div>
            <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
