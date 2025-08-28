type ConfigTabsProps = {
  activeTab: "provider" | "visualization";
  onTabChange: (tab: "provider" | "visualization") => void;
};

export function ConfigTabs({ activeTab, onTabChange }: ConfigTabsProps) {
  return (
    <div className="border-b border-slate-200">
      <div className="flex gap-8">
        <button
          onClick={() => onTabChange("provider")}
          className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "provider"
              ? "border-orange-500 text-orange-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Seleccionar proveedor
        </button>
        <button
          onClick={() => onTabChange("visualization")}
          className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "visualization"
              ? "border-orange-500 text-orange-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Opciones de visualización
        </button>
      </div>
    </div>
  );
}