import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { DashboardLayout, PageHeader } from "@/components/DashboardLayout";
import { api, type Studio, type Host } from "@/lib/api";
import { CalendarPlus } from "lucide-react";

export const Route = createFileRoute("/reservas")({
  head: () => ({ meta: [{ title: "Reservas — CodeCast" }] }),
  component: ReservasPage,
});

function toIsoOffset(local: string): string {
  // local = "YYYY-MM-DDTHH:mm" from datetime-local input
  if (!local) return "";
  const d = new Date(local);
  const pad = (n: number) => String(n).padStart(2, "0");
  const tz = -d.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const abs = Math.abs(tz);
  const tzh = pad(Math.floor(abs / 60));
  const tzm = pad(abs % 60);
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
    `${sign}${tzh}:${tzm}`
  );
}

function ReservasPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [studioId, setStudioId] = useState("");
  const [hostId, setHostId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const [s, h] = await Promise.all([api.getStudios(), api.getHosts()]);
        setStudios(Array.isArray(s) ? s : []);
        setHosts(Array.isArray(h) ? h : []);
      } catch {
        toast.error("Falha ao carregar dados");
      }
    })();
  }, []);

  const reset = () => {
    setStudioId("");
    setHostId("");
    setStartTime("");
    setEndTime("");
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.createBooking({
        studioId,
        hostId,
        startTime: toIsoOffset(startTime),
        endTime: toIsoOffset(endTime),
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Reserva confirmada com sucesso", {
          style: {
            background: "oklch(0.20 0.03 270)",
            border: "1px solid oklch(0.88 0.28 145)",
            color: "oklch(0.88 0.28 145)",
            boxShadow: "0 0 20px oklch(0.88 0.28 145 / 0.4)",
          },
        });
        reset();
      } else if (res.status === 409 || res.status === 400) {
        toast.error("⚠ HORÁRIO INDISPONÍVEL", {
          description: "Já existe uma reserva neste período. Escolha outro horário.",
          style: {
            background: "oklch(0.20 0.03 270)",
            border: "1px solid oklch(0.65 0.28 25)",
            color: "oklch(0.85 0.25 25)",
            boxShadow: "0 0 20px oklch(0.65 0.28 25 / 0.5)",
          },
        });
      } else {
        toast.error(`Erro ao criar reserva (${res.status})`);
      }
    } catch {
      toast.error("Erro de conexão com o servidor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader title="Nova Reserva" subtitle="agende uma sessão no estúdio" />

      <form onSubmit={submit} className="panel p-6 md:p-8 space-y-6 max-w-2xl neon-border">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <CalendarPlus className="h-6 w-6 text-[var(--neon)]" />
          <h3 className="font-display text-xl neon-text">AGENDAMENTO</h3>
        </div>

        <Field label="Sala">
          <select
            required
            value={studioId}
            onChange={(e) => setStudioId(e.target.value)}
            className="cyber-input"
          >
            <option value="">— selecione uma sala —</option>
            {studios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} (cap. {s.maxCapacity})
              </option>
            ))}
          </select>
        </Field>

        <Field label="Apresentador">
          <select
            required
            value={hostId}
            onChange={(e) => setHostId(e.target.value)}
            className="cyber-input"
          >
            <option value="">— selecione um host —</option>
            {hosts.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Início">
            <input
              required
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="cyber-input"
            />
          </Field>
          <Field label="Fim">
            <input
              required
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="cyber-input"
            />
          </Field>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={reset}
            className="px-5 py-2.5 rounded-md border border-border text-xs font-mono uppercase tracking-wider hover:bg-secondary/40"
          >
            Limpar
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-md bg-[var(--neon)] text-primary-foreground text-xs font-mono uppercase tracking-widest font-bold disabled:opacity-50 hover:shadow-[0_0_20px_var(--neon)] transition-all"
          >
            {submitting ? "Processando..." : "Confirmar Reserva"}
          </button>
        </div>
      </form>

      <style>{`
        .cyber-input {
          width: 100%;
          background: var(--input);
          border: 1px solid var(--border);
          color: var(--foreground);
          padding: 0.65rem 0.85rem;
          border-radius: 0.375rem;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          outline: none;
          transition: all 0.15s;
        }
        .cyber-input:focus {
          border-color: var(--neon);
          box-shadow: 0 0 0 2px color-mix(in oklab, var(--neon) 30%, transparent);
        }
        .cyber-input option {
          background: var(--card);
          color: var(--foreground);
        }
      `}</style>
    </DashboardLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--neon)] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
