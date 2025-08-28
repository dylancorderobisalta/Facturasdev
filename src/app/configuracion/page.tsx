"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DATA } from "@/data/facturas";
import { Navigation } from "@/components/HeaderNavigation";
import VisualizationOptions from "@/components/VisualizationOptions"; // ← IMPORTA LOS TOGGLES

type TabKey = "defaults" | "display";

function useActiveTab(): [TabKey, (t: TabKey) => void] {
  const router = useRouter();
  const sp = useSearchParams();
  const current = (sp.get("tab") as TabKey) || "defaults";
  const setTab = (t: TabKey) => {
    const params = new URLSearchParams(sp.toString());
    params.set("tab", t);
    router.replace(`?${params.toString()}`);
  };
  return [current, setTab];
}

export default function ConfigurationPage() {
  const [active, setActive] = useActiveTab();

  const providers = useMemo(
    () =>
      Array.from(new Set(DATA.map((f) => f.proveedor))).map((name, i) => ({
        id: String(i + 1),
        name,
      })),
    []
  );

  const [providerId, setProviderId] = useState("");

  return (
    <main className="container-page py-6">
      <Navigation />

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-2">Configuración</h2>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-slate-200">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active === "defaults"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setActive("defaults")}
          >
            Seleccionar proveedor
          </button>

          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active === "display"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setActive("display")}
          >
            Opciones de visualización
          </button>
        </div>

        {/* TAB: Seleccionar proveedor */}
        {active === "defaults" && (
          <>
            <section className="mt-6">
              <h3 className="text-base font-semibold mb-3">Proveedor</h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-6">
                  <div className="text-sm font-semibold mb-1">Proveedor:</div>
                  <select
                    className="input w-full"
                    value={providerId}
                    onChange={(e) => setProviderId(e.target.value)}
                  >
                    <option value="">Seleccionar…</option>
                    {providers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>

                  <div className="mt-3 flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span className="size-2 rounded-full bg-emerald-500 inline-block" />
                      Configurado
                    </span>
                    <span className="flex items-center gap-1 text-rose-700">
                      <span className="size-2 rounded-full bg-rose-500 inline-block" />
                      No configurado
                    </span>
                  </div>
                </div>
              </div>

              {!providerId && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700">
                  Debe seleccionar un proveedor para configurar los valores por defecto.
                </div>
              )}
            </section>

            <section className="mt-8">
              <h3 className="text-base font-semibold mb-3">Valores por defecto</h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-6">
                  <div className="text-sm font-semibold mb-1">Centro contable por defecto:</div>
                  <select className="input w-full" disabled={!providerId}>
                    <option value="">Seleccionar…</option>
                    <option>CC-001</option>
                    <option>CC-002</option>
                  </select>
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <div className="text-sm font-semibold mb-1">Cuenta contable por defecto:</div>
                  <select className="input w-full" disabled={!providerId}>
                    <option value="">Seleccionar…</option>
                    <option>5-01-001</option>
                    <option>5-01-002</option>
                  </select>
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <div className="text-sm font-semibold mb-1">Moneda por defecto:</div>
                  <select className="input w-full" disabled={!providerId}>
                    <option value="">Seleccionar…</option>
                    <option>CRC</option>
                    <option>USD</option>
                  </select>
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <div className="text-sm font-semibold mb-1">Impuesto por defecto:</div>
                  <select className="input w-full" disabled={!providerId}>
                    <option value="">Seleccionar…</option>
                    <option>0</option>
                    <option>13</option>
                  </select>
                </div>

                <div className="col-span-12">
                  <div className="text-sm font-semibold mb-1">Comentarios por defecto para este proveedor:</div>
                  <textarea className="input w-full h-28 resize-none" disabled={!providerId} />
                </div>
              </div>

              <div className="mt-6">
                <button className="btn btn-primary" disabled={!providerId}>
                  Guardar cambios
                </button>
              </div>
            </section>
          </>
        )}

        {/* TAB: Opciones de visualización */}
        {active === "display" && <VisualizationOptions />}
      </div>
    </main>
  );
}
