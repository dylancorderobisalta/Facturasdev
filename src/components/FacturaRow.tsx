"use client";

import { useEffect, useMemo, useState } from "react";
import type { Factura } from "@/types/factura";

type FormValue = {
  descripcion?: string;
  monto?: number;
  subtotal?: number;
  centroCostos?: string;
  cuentaContable?: string;
  impuesto?: number;   // %
  moneda?: string;
};

type Props = {
  factura: Factura;
  formatFechaLargo: (iso: string) => string;
  expanded: boolean;
  onToggle: () => void;

  formValues: FormValue;
  setFormValues: (vals: FormValue) => void;
  formErrors: Record<string, string>;
  onConfirmar: () => void;
};

export function FacturaRow({
  factura,
  formatFechaLargo,
  expanded,
  onToggle,
  formValues,
  setFormValues,
  formErrors,
  onConfirmar,
}: Props) {
  return (
    <>
      <tr className="hover:bg-slate-50/60">
        <td className="td px-4 py-3">
          <span className="font-medium text-slate-800">{factura.proveedor}</span>
        </td>
        <td className="td px-4 py-3">{factura.id}</td>
        <td className="td px-4 py-3">{formatFechaLargo(factura.fecha)}</td>
        <td className="td px-4 py-3">{factura.descripcion}</td>
        <td className="px-4 py-3">
          <div className="flex justify-end">
            <button className="btn btn-primary w-[120px]" onClick={onToggle}>
              {expanded ? "Cerrar" : "Procesar"}
            </button>
          </div>
        </td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan={5} className="bg-white">
            <EditorPanel
              formValues={formValues}
              setFormValues={setFormValues}
              formErrors={formErrors}
              onConfirmar={onConfirmar}
            />
          </td>
        </tr>
      )}
    </>
  );
}

/* ---------- pequeño wrapper para evitar repetición ---------- */
function Field({
  label,
  center = true,
  error,
  className,
  children,
}: {
  label: string;
  center?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className={`text-sm font-semibold mb-1 ${center ? "text-center" : ""}`}>{label}</div>
      {children}
      <div className="min-h-[1.25rem]">
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}

/* ------------------- Panel de edición ------------------- */
function EditorPanel({
  formValues,
  setFormValues,
  formErrors,
  onConfirmar,
}: {
  formValues: FormValue;
  setFormValues: (vals: FormValue) => void;
  formErrors: Record<string, string>;
  onConfirmar: () => void;
}) {
  // Inputs string para manejar <input type="number">
  const [impuestoPctInput, setImpuestoPctInput] = useState<string>(
    formValues.impuesto !== undefined ? String(formValues.impuesto) : ""
  );
  const [desc, setDesc] = useState(formValues.descripcion || "");
  const [precioInput, setPrecioInput] = useState("");
  const [cantidadInput, setCantidadInput] = useState("");
  const [descuentoPctInput, setDescuentoPctInput] = useState("");
  const [fleteInput, setFleteInput] = useState("");
  const [centro, setCentro] = useState(formValues.centroCostos || "");
  const [cuenta, setCuenta] = useState(formValues.cuentaContable || "");
  const [moneda, setMoneda] = useState(formValues.moneda || "");

  const toNum = (s: string) => (s.trim() === "" ? NaN : Number(s));
  const clampPct = (n: number) => (isNaN(n) ? NaN : Math.min(100, Math.max(0, n)));

  const precio = toNum(precioInput);
  const cantidad = toNum(cantidadInput);
  const descuentoPct = clampPct(toNum(descuentoPctInput));
  const flete = toNum(fleteInput);
  const impuestoPct = clampPct(toNum(impuestoPctInput));

  const items = useMemo(
    () => (isNaN(precio) ? 0 : precio) * (isNaN(cantidad) ? 0 : cantidad),
    [precio, cantidad]
  );

  // Descuento % aplicado a (items + flete). Cambia a "items" si así lo prefieres.
  const descuentoMonto = useMemo(() => {
    const base = items + (isNaN(flete) ? 0 : flete);
    const pct = isNaN(descuentoPct) ? 0 : descuentoPct / 100;
    return base * pct;
  }, [items, flete, descuentoPct]);

  const subtotal = useMemo(() => {
    const f = isNaN(flete) ? 0 : flete;
    const s = items - descuentoMonto + f;
    return s < 0 ? 0 : s;
  }, [items, descuentoMonto, flete]);

  const impuestoMonto = useMemo(() => {
    const pct = isNaN(impuestoPct) ? 0 : impuestoPct / 100;
    return subtotal * pct;
  }, [subtotal, impuestoPct]);

  const total = useMemo(() => subtotal + impuestoMonto, [subtotal, impuestoMonto]);

  // Sincroniza con el padre (solo numbers/undefined)
  useEffect(() => {
    setFormValues({
      descripcion: desc,
      centroCostos: centro || undefined,
      cuentaContable: cuenta || undefined,
      moneda: moneda || undefined,
      impuesto: isNaN(impuestoPct) ? undefined : Number(impuestoPct.toFixed(2)),
      subtotal: Number(subtotal.toFixed(2)),
      monto: Number(total.toFixed(2)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desc, centro, cuenta, moneda, impuestoPct, subtotal, total]);

  const err = (k: string) => !!formErrors?.[k];

  return (
    <div className="p-4 border-t border-slate-200">
      {/* Fila 1: cada campo dentro de su propio contenedor */}
      <div className="grid grid-cols-12 gap-4">
        

        <Field label="Descripcion" error={formErrors?.descripcion} className="col-span-12 sm:col-span-3">
          <input
            className={`input w-full ${err("descripcion") ? "!border-red-500 ring-1 ring-red-500" : ""}`}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Descripción"
          />
        </Field>
        <Field label="Impuesto %" error={formErrors?.impuesto} className="col-span-12 sm:col-span-2">
          <input
            className={`input w-full ${err("impuesto") ? "!border-red-500 ring-1 ring-red-500" : ""}`}
            type="number"
            value={impuestoPctInput}
            onChange={(e) => setImpuestoPctInput(e.target.value)}
            placeholder="Ej: 13"
          />
        </Field>
        <Field label="Precio" className="col-span-6 sm:col-span-2">
          <input
            className="input w-full"
            type="number"
            value={precioInput}
            onChange={(e) => setPrecioInput(e.target.value)}
            placeholder="Precio"
          />
        </Field>

        <Field label="Cantidad" className="col-span-6 sm:col-span-1">
          <input
            className="input w-full"
            type="number"
            value={cantidadInput}
            onChange={(e) => setCantidadInput(e.target.value)}
            placeholder="Cantidad"
          />
        </Field>

        <Field label="Descuento %" className="col-span-6 sm:col-span-2">
          <input
            className="input w-full"
            type="number"
            value={descuentoPctInput}
            onChange={(e) => setDescuentoPctInput(e.target.value)}
            placeholder="Ej: 2"
          />
        </Field>

        <Field label="Flete" className="col-span-6 sm:col-span-2">
          <input
            className="input w-full"
            type="number"
            value={fleteInput}
            onChange={(e) => setFleteInput(e.target.value)}
            placeholder="Flete"
          />
        </Field>
      </div>

      {/* Fila 2: Centro/Cuenta */}
      <div className="mt-5 grid grid-cols-12 gap-4">
        <Field label="Centro de costos" error={formErrors?.centroCostos} className="col-span-12 sm:col-span-6">
          <select
            className={`input w-full ${err("centroCostos") ? "!border-red-500 ring-1 ring-red-500" : ""}`}
            value={centro}
            onChange={(e) => setCentro(e.target.value)}
          >
            <option value="">Seleccionar…</option>
            <option value="CC-001">CC-001</option>
            <option value="CC-002">CC-002</option>
          </select>
        </Field>

        <Field label="Cuenta contable" error={formErrors?.cuentaContable} className="col-span-12 sm:col-span-6">
          <select
            className={`input w-full ${err("cuentaContable") ? "!border-red-500 ring-1 ring-red-500" : ""}`}
            value={cuenta}
            onChange={(e) => setCuenta(e.target.value)}
          >
            <option value="">Seleccionar…</option>
            <option value="5-01-001">5-01-001</option>
            <option value="5-01-002">5-01-002</option>
          </select>
        </Field>
      </div>

      {/* Fila 3: Moneda/Subtotal/Total/Comentarios */}
      <div className="mt-6 grid grid-cols-12 gap-4">
        <Field label="Moneda" error={formErrors?.moneda} className="col-span-12 sm:col-span-2">
          <select
            className={`input w-full ${err("moneda") ? "!border-red-500 ring-1 ring-red-500" : ""}`}
            value={moneda}
            onChange={(e) => setMoneda(e.target.value)}
          >
            <option value="">Seleccionar…</option>
            <option value="CRC">CRC</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </Field>

        <Field label="Subtotal" error={formErrors?.subtotal} className="col-span-12 sm:col-span-2">
          <input
            className={`input w-full ${err("subtotal") ? "!border-red-500 ring-1 ring-red-500" : ""}`}
            value={subtotal.toFixed(2)}
            readOnly
          />
        </Field>

        <Field label="Total" error={formErrors?.monto} className="col-span-12 sm:col-span-2">
          <input
            className={`input w-full ${err("monto") ? "!border-red-500 ring-1 ring-red-500" : ""}`}
            value={total.toFixed(2)}
            readOnly
          />
        </Field>

        <Field label="Comentarios (opcional)" center={false} className="col-span-12 sm:col-span-4">
          <input className="input w-full" placeholder="Escribir comentarios" />
        </Field>
      </div>

      {/* Botón confirmar */}
      <div className="mt-6 flex justify-center">
        <button className="btn btn-primary px-8" onClick={onConfirmar}>
          Confirmar
        </button>
      </div>
    </div>
  );
}
