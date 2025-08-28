"use client";

export function DefaultValues({ providerId }: { providerId: string }) {
  const disabled = !providerId;

  return (
    <section className="mt-8">
      <h3 className="text-base font-semibold mb-3">Valores por defecto</h3>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6">
          <div className="text-sm font-semibold mb-1">Centro contable por defecto:</div>
          <select className="input w-full" disabled={disabled}>
            <option value="">Seleccionar…</option>
            <option>CC-001</option>
            <option>CC-002</option>
          </select>
        </div>

        <div className="col-span-12 sm:col-span-6">
          <div className="text-sm font-semibold mb-1">Cuenta contable por defecto:</div>
          <select className="input w-full" disabled={disabled}>
            <option value="">Seleccionar…</option>
            <option>5-01-001</option>
            <option>5-01-002</option>
          </select>
        </div>

        <div className="col-span-12 sm:col-span-6">
          <div className="text-sm font-semibold mb-1">Moneda por defecto:</div>
          <select className="input w-full" disabled={disabled}>
            <option value="">Seleccionar…</option>
            <option>CRC</option>
            <option>USD</option>
          </select>
        </div>

        <div className="col-span-12 sm:col-span-6">
          <div className="text-sm font-semibold mb-1">Impuesto por defecto:</div>
          <select className="input w-full" disabled={disabled}>
            <option value="">Seleccionar…</option>
            <option>0</option>
            <option>13</option>
          </select>
        </div>

        <div className="col-span-12">
          <div className="text-sm font-semibold mb-1">Comentarios por defecto para este proveedor:</div>
          <textarea className="input w-full h-28 resize-none" disabled={disabled} />
        </div>
      </div>

      <div className="mt-6">
        <button className="btn btn-primary" disabled={disabled}>
          Guardar cambios
        </button>
      </div>
    </section>
  );
}
