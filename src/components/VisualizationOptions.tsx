"use client";

import { useEffect, useState } from "react";

type Flags = {
  flete: boolean;
  descuento: boolean;
  cantidad: boolean;
  impuesto: boolean;
  moneda: boolean;
  comentarios: boolean;
};

const KEY = "display_options_v1";

export default function VisualizationOptions() {
  const [opts, setOpts] = useState<Flags>({
    flete: true,
    descuento: true,
    cantidad: false,
    impuesto: false,
    moneda: false,
    comentarios: false,
  });

  // Cargar desde localStorage al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setOpts((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, []);

  // Guardar cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(opts));
    } catch {}
  }, [opts]);

  const set = (k: keyof Flags, v: boolean) => setOpts((p) => ({ ...p, [k]: v }));

  return (
    <section className="mt-6">
      <h3 className="text-base font-semibold mb-4">Opciones de visualización</h3>

      <div className="grid grid-cols-12 gap-6">
        <ToggleCard className="col-span-12 sm:col-span-4" label="Mostrar flete:" value={opts.flete} onChange={(v) => set("flete", v)} />
        <ToggleCard className="col-span-12 sm:col-span-4" label="Mostrar descuento:" value={opts.descuento} onChange={(v) => set("descuento", v)} />
        <ToggleCard className="col-span-12 sm:col-span-4" label="Mostrar cantidad:" value={opts.cantidad} onChange={(v) => set("cantidad", v)} />
        <ToggleCard className="col-span-12 sm:col-span-4" label="Mostrar impuesto:" value={opts.impuesto} onChange={(v) => set("impuesto", v)} />
        <ToggleCard className="col-span-12 sm:col-span-4" label="Mostrar moneda:" value={opts.moneda} onChange={(v) => set("moneda", v)} />
        <ToggleCard className="col-span-12 sm:col-span-4" label="Mostrar comentarios:" value={opts.comentarios} onChange={(v) => set("comentarios", v)} />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          className="rounded-xl bg-emerald-600 px-6 py-2 text-white shadow-sm hover:bg-emerald-700"
          onClick={() => console.log("Guardado", opts)}
        >
          Guardar cambios
        </button>
      </div>
    </section>
  );
}

function ToggleCard({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <span className="font-semibold text-slate-800">{label}</span>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              value ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-500"
            }`}
          >
            {value ? "Activo" : "Inactivo"}
          </span>

          {/* Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={value}
            onClick={() => onChange(!value)}
            className={`relative h-6 w-10 rounded-full transition-colors ${
              value ? "bg-orange-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                value ? "translate-x-4" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
