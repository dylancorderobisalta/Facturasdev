"use client";

import { useState } from "react";

export function ProviderSelector() {
  const [selectedProvider, setSelectedProvider] = useState("");

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Proveedor</h2>
      
      <div className="max-w-md">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Proveedor:
        </label>
        <div className="relative">
          <select
            className="input w-full pr-10"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            <option value="maria-bustamante">Maria Gabriela Bustamante Gutierrez</option>
            <option value="sociedad-anonima">3-101-681238 Sociedad Anónima</option>
            <option value="ana-hernandez">Ana Isabel Hernandez Valverde</option>
            <option value="proveedor-4">Proveedor Ejemplo 4</option>
            <option value="proveedor-5">Proveedor Ejemplo 5</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Estado del proveedor */}
        <div className="mt-4 flex items-center gap-4">
          <div className="text-sm">
            <span className="font-medium text-slate-700">Estado:</span>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-slate-700">Configurado</span>
            </label>
            <label className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-700">No configurado</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}