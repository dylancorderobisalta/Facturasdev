"use client";

export function ProviderSelector({
  providers,
  value,
  onChange,
}: {
  providers: { id: string; name: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      <div className="col-span-12 sm:col-span-6">
        <div className="text-sm font-semibold mb-1">Proveedor:</div>
        <select
          className="input w-full"
          value={value}                       // ← controlado
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Seleccionar…</option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Estado (solo a modo ilustrativo) */}
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
  );
}
