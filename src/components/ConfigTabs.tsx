"use client";

type TabKey = "defaults" | "display";

export function ConfigTabs({
  active,
  onChange,
  labels = { defaults: "Seleccionar proveedor", display: "Opciones de visualización" },
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
  labels?: Record<TabKey, string>;
}) {
  const base =
    "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors";
  const activeCls = "border-orange-500 text-orange-600";
  const inactiveCls = "border-transparent text-slate-500 hover:text-slate-700";

  return (
    <div className="flex gap-6 border-b border-slate-200">
      <button
        type="button"
        className={`${base} ${active === "defaults" ? activeCls : inactiveCls}`}
        onClick={() => onChange("defaults")}
      >
        {labels.defaults}
      </button>
      <button
        type="button"
        className={`${base} ${active === "display" ? activeCls : inactiveCls}`}
        onClick={() => onChange("display")}
      >
        {labels.display}
      </button>
    </div>
  );
}
