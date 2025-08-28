"use client";

import { useState } from "react";

type VisualizationOptionsProps = {
  selectedProvider: string;
};

type FieldOptions = {
  mostrarFlete: boolean;
  mostrarDescuento: boolean;
  mostrarCantidad: boolean;
  mostrarImpuesto: boolean;
  mostrarMoneda: boolean;
  mostrarComentarios: boolean;
};

export function VisualizationOptions({ selectedProvider }: VisualizationOptionsProps) {
  const [options, setOptions] = useState<FieldOptions>({
    mostrarFlete: true,
    mostrarDescuento: true,
    mostrarCantidad: false,
    mostrarImpuesto: false,
    mostrarMoneda: false,
    mostrarComentarios: false,
  });

  const handleToggle = (field: keyof FieldOptions) => {
    setOptions(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = () => {
    if (!selectedProvider) {
      alert("Debe seleccionar un proveedor primero");
      return;
    }
    
    // Aquí iría la lógica para guardar las opciones del proveedor
    console.log(`Guardando opciones para proveedor: ${selectedProvider}`, options);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Opciones de visualización
        {selectedProvider && (
          <span className="text-sm font-normal text-slate-600 ml-2">
            - {selectedProvider}
          </span>
        )}
      </h2>
      
      {!selectedProvider && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            Debe seleccionar un proveedor en la pestaña anterior para configurar las opciones de visualización.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
        <ToggleField
          label="Mostrar flete:"
          checked={options.mostrarFlete}
          onChange={() => handleToggle("mostrarFlete")}
          disabled={!selectedProvider}
        />
        
        <ToggleField
          label="Mostrar descuento:"
          checked={options.mostrarDescuento}
          onChange={() => handleToggle("mostrarDescuento")}
          disabled={!selectedProvider}
        />
        
        <ToggleField
          label="Mostrar cantidad:"
          checked={options.mostrarCantidad}
          onChange={() => handleToggle("mostrarCantidad")}
          disabled={!selectedProvider}
        />
        
        <ToggleField
          label="Mostrar impuesto:"
          checked={options.mostrarImpuesto}
          onChange={() => handleToggle("mostrarImpuesto")}
          disabled={!selectedProvider}
        />
        
        <ToggleField
          label="Mostrar moneda:"
          checked={options.mostrarMoneda}
          onChange={() => handleToggle("mostrarMoneda")}
          disabled={!selectedProvider}
        />
        
        <ToggleField
          label="Mostrar comentarios:"
          checked={options.mostrarComentarios}
          onChange={() => handleToggle("mostrarComentarios")}
          disabled={!selectedProvider}
        />
      </div>

      {/* Botón guardar */}
      <div className="mt-8">
        <button 
          className="btn btn-primary px-8"
          onClick={handleSave}
          disabled={!selectedProvider}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}

// Componente para cada toggle individual
function ToggleField({ 
  label, 
  checked, 
  onChange, 
  disabled = false 
}: { 
  label: string; 
  checked: boolean; 
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <div className={`border border-slate-200 rounded-lg p-4 ${disabled ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <div className="flex items-center">
          <button
            onClick={onChange}
            disabled={disabled}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
              checked 
                ? "bg-orange-500" 
                : "bg-slate-300"
            } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                checked ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`ml-3 text-xs font-medium px-2 py-1 rounded ${
            checked 
              ? "bg-orange-100 text-orange-700" 
              : "bg-slate-100 text-slate-600"
          }`}>
            {checked ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
    </div>
  );
}