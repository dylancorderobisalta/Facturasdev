"use client";

import { useMemo, useState } from "react";
import { DATA } from "../data/facturas";
import { FacturaRow } from "../components/FacturaRow";
import { FacturaFilters } from "../components/FacturaFilters";
import { TableFooter } from "../components/TableFooter";
import { Navigation } from "../components/HeaderNavigation";

/** ========= Utilidades ========= */
function formatFechaLargo(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-CR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function Home() {
  // Filtros 
  const [buscar, setBuscar] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  // Paginación
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Fila expandida (para el botón Procesar)
  const [openId, setOpenId] = useState<string | null>(null);
  type FormValue = {
    descripcion?: string;
    monto?: number;        // TOTAL calculado (number)
    subtotal?: number;     // number
    centroCostos?: string;
    cuentaContable?: string;
    impuesto?: number;     // number
    moneda?: string;
  };

  const [formValues, setFormValues] = useState<Record<string, FormValue>>({});
  const [formErrors, setFormErrors] = useState<Record<string, Record<string, string>>>({});

  // Filtrado
  const filtradas = useMemo(() => {
    const qNorm = buscar.trim().toLowerCase();
    const start = desde ? new Date(desde) : null;
    const end = hasta ? new Date(hasta) : null;

    return DATA.filter((f) => {
      const matchesQ =
        !qNorm ||
        f.proveedor.toLowerCase().includes(qNorm) ||
        f.descripcion.toLowerCase().includes(qNorm) ||
        f.id.toLowerCase().includes(qNorm);

      const fecha = new Date(f.fecha);
      const matchesFecha = (!start || fecha >= start) && (!end || fecha <= end);

      return matchesQ && matchesFecha;
    });
  }, [buscar, desde, hasta]);

  // Paginación correcta (cálculo de índices)
  const total = filtradas.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageItems = filtradas.slice(startIndex, endIndex);

  const go = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  const handleConfirmar = (id: string) => {
    const values = formValues[id] || {};
    const errors: Record<string, string> = {};

    if (!values.descripcion || typeof values.descripcion !== "string") {
      errors.descripcion = "Descripción requerida";
    }
    if (values.subtotal === undefined || isNaN(Number(values.subtotal)) || Number(values.subtotal) <= 0) {
      errors.subtotal = "Subtotal debe ser mayor a 0";
    }

    if (values.monto === undefined || isNaN(Number(values.monto)) || Number(values.monto) <= 0) {
      errors.monto = "Total debe ser mayor a 0";
    }

    if (!values.centroCostos) {
      errors.centroCostos = "Centro de costos requerido";
    }
    if (!values.cuentaContable) {
      errors.cuentaContable = "Cuenta contable requerida";
    }
    // Nuevos chequeos
    if (
      values.impuesto === undefined ||
      isNaN(Number(values.impuesto)) ||
      Number(values.impuesto) < 0 ||
      Number(values.impuesto) > 100
    ) {
      errors.impuesto = "Impuesto es requerido (0–100%)";
    }

    if (!values.moneda) {
      errors.moneda = "Moneda es requerida";
    }

    setFormErrors((prev) => ({ ...prev, [id]: errors }));

    if (Object.keys(errors).length === 0) {
      setOpenId(null);
      // aquí podrías hacer submit a API
    }
  };


  return (
    <main className="container-page py-6">
      {/* Header */}
      <Navigation />

      <div className="card p-4">
        {/* Filtros */}
        <FacturaFilters
          buscar={buscar}
          desde={desde}
          hasta={hasta}
          setBuscar={setBuscar}
          setDesde={setDesde}
          setHasta={setHasta}
          setPage={setPage} // resetea a pág 1 cuando cambien filtros
        />

        {/* Tabla */}
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="th px-4 py-3">Proveedor</th>
                <th className="th px-4 py-3">
                  ID<br />Factura
                </th>
                <th className="th px-4 py-3">Fecha de factura</th>
                <th className="th px-4 py-3">Descripcion</th>
                <th className="th px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pageItems.map((f) => (
                <FacturaRow
                  key={f.id}
                  factura={f}
                  formatFechaLargo={formatFechaLargo}
                  /** props para abrir/cerrar el panel al presionar Procesar */
                  expanded={openId === f.id}
                  onToggle={() =>
                    setOpenId((prev) => (prev === f.id ? null : f.id))
                  }
                  formValues={formValues[f.id] || {}}
                  setFormValues={(vals: FormValue) =>
                    setFormValues((prev) => ({ ...prev, [f.id]: vals }))
                  }
                  formErrors={formErrors[f.id] || {}}
                  onConfirmar={() => handleConfirmar(f.id)}
                />
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                    No hay resultados para los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer de tabla */}
        <TableFooter
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          go={go}
        />
      </div>
    </main>
  );
}
