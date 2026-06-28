import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { DashboardLayout, PageHeader } from "@/components/DashboardLayout";
import { api, type Studio } from "@/lib/api";
import { Plus, Radio, Users, Wrench } from "lucide-react";

export const Route = createFileRoute("/salas")({
  head: () => ({ meta: [{ title: "Salas — CodeCast" }] }),
  component: SalasPage,
});

function SalasPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [equipmentList, setEquipmentList] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getStudios();
      setStudios(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Falha ao carregar salas");
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
      await api.createStudio({
        name,
        maxCapacity: Number(maxCapacity),
        equipmentList: equipmentList
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      toast.success("Sala cadastrada com sucesso");
      setName("");
      setMaxCapacity("");
      setEquipmentList("");
      setShowForm(false);
      void load();
    } catch {
      toast.error("Erro ao cadastrar sala");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <PageHeader title="Salas" subtitle="estúdios cadastrados no sistema" />
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--neon)] text-primary-foreground font-mono uppercase text-xs tracking-wider hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" />
          Nova Sala
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="panel p-6 mb-8 space-y-4 neon-border">
          <h3 className="font-display text-lg neon-text">Cadastrar Nova Sala</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nome">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="cyber-input"
                placeholder="Estúdio Alpha"
              />
            </Field>
            <Field label="Capacidade Máxima">
              <input
                required
                type="number"
                min={1}
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="cyber-input"
                placeholder="4"
              />
            </Field>
          </div>
          <Field label="Equipamentos (separados por vírgula)">
            <input
              value={equipmentList}
              onChange={(e) => setEquipmentList(e.target.value)}
              className="cyber-input"
              placeholder="Microfone, Mesa de som, Câmera 4K"
            />
          </Field>
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
              className="px-4 py-2 rounded-md bg-[var(--neon)] text-primary-foreground text-xs font-mono uppercase tracking-wider disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Salvar"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-muted-foreground font-mono text-sm">{"> carregando..."}</p>
      ) : studios.length === 0 ? (
        <div className="panel p-10 text-center">
          <Radio className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Nenhuma sala cadastrada ainda.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {studios.map((s) => (
            <div key={s.id} className="panel p-5 hover:neon-border transition">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-[var(--neon)]">{s.name}</h3>
                <span className="text-[10px] font-mono text-muted-foreground">#{s.id}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Capacidade: <span className="text-foreground">{s.maxCapacity}</span>
              </div>
              <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <Wrench className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-foreground">
                  {Array.isArray(s.equipmentList)
                    ? s.equipmentList.join(", ")
                    : s.equipmentList || "—"}
                </span>
              </div>
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
          transition: all 0.15s;
        }
        .cyber-input:focus {
          border-color: var(--neon);
          box-shadow: 0 0 0 2px color-mix(in oklab, var(--neon) 30%, transparent);
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
