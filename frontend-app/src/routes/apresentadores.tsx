import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { DashboardLayout, PageHeader } from "@/components/DashboardLayout";
import { api, type Host } from "@/lib/api";
import { Plus, Mic2, Mail } from "lucide-react";

export const Route = createFileRoute("/apresentadores")({
  head: () => ({ meta: [{ title: "Apresentadores — CodeCast" }] }),
  component: HostsPage,
});

function HostsPage() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getHosts();
      setHosts(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Falha ao carregar apresentadores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createHost({ name, email });
      toast.success("Apresentador cadastrado");
      setName("");
      setEmail("");
      setShowForm(false);
      void load();
    } catch {
      toast.error("Erro ao cadastrar apresentador");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <PageHeader title="Apresentadores" subtitle="hosts cadastrados" />
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--neon-pink)] text-primary-foreground font-mono uppercase text-xs tracking-wider hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" />
          Novo Host
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="panel p-6 mb-8 space-y-4 neon-border-pink">
          <h3 className="font-display text-lg neon-text-pink">Cadastrar Novo Host</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nome">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="cyber-input"
                placeholder="Neo Anderson"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cyber-input"
                placeholder="neo@codecast.io"
              />
            </Field>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-md border border-border text-xs font-mono uppercase tracking-wider hover:bg-secondary/40"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-md bg-[var(--neon-pink)] text-primary-foreground text-xs font-mono uppercase tracking-wider disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Salvar"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-muted-foreground font-mono text-sm">{"> carregando..."}</p>
      ) : hosts.length === 0 ? (
        <div className="panel p-10 text-center">
          <Mic2 className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Nenhum apresentador cadastrado.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {hosts.map((h) => (
            <div key={h.id} className="panel p-5 flex items-center gap-4 hover:neon-border-pink transition">
              <div className="h-12 w-12 rounded-full grid place-items-center bg-secondary border border-[var(--neon-pink)] shrink-0">
                <Mic2 className="h-5 w-5 text-[var(--neon-pink)]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-lg truncate">{h.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono truncate">
                  <Mail className="h-3 w-3 shrink-0" /> {h.email}
                </div>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">#{h.id}</span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .cyber-input {
          width: 100%;
          background: var(--input);
          border: 1px solid var(--border);
          color: var(--foreground);
          padding: 0.6rem 0.8rem;
          border-radius: 0.375rem;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          outline: none;
        }
        .cyber-input:focus {
          border-color: var(--neon-pink);
          box-shadow: 0 0 0 2px color-mix(in oklab, var(--neon-pink) 30%, transparent);
        }
      `}</style>
    </DashboardLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
