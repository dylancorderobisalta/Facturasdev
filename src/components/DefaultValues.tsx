"use client";

import { useState } from "react";

type DefaultValuesProps = {
  selectedProvider: string;
};

export function DefaultValues({ selectedProvider }: DefaultValuesProps) {
  const [formData, setFormData] = useState({
    centroCostable: "",
    cuentaContable: "",
    moneda: "",
    impuesto: "",
    comentarios: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    if (!selectedProvider) {
      alert("Debe seleccionar un proveedor primero");
      return;
    }

    const newErrors: Record<string, string> = {};

    if (!formData.centroCostable) {
      newErrors.centroCostable = "Centro contable por defecto es requerido";
    }
    if (!formData.cuentaContable) {
      newErrors.cuentaContable = "Cuenta contable por defecto es requerida";
    }
    if (!formData.moneda) {
      newErrors.moneda = "Moneda por defecto es requerida";
    }
    if (!formData.impuesto) {
      newErrors.impuesto = "Impuesto por defecto es requerido";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aquí iría la lógica para guardar
      console.log(`Guardando configuración para proveedor: ${selectedProvider}`, formData);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Valores por defecto
        {selectedProvider && (
          <span className="text-sm font-normal text-slate-600 ml-2">
            - {selectedProvider}
          </span>
        )}
      </h2>
      
      {!selectedProvider && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            Debe seleccionar un proveedor para configurar los valores por defecto.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Centro contable por defecto */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Centro contable por defecto:
          </label>
          <select
            className={`input w-full ${errors.centroCostable ? "!border-red-500 ring-1 ring-red-500" : ""} ${!selectedProvider ? "opacity-50" : ""}`}
            value={formData.centroCostable}
            onChange={(e) => updateField("centroCostable", e.target.value)}
            disabled={!selectedProvider}
          >
            <option value="">Seleccionar...</option>
            <option value="CC-001">CC-001</option>
            <option value="CC-002">CC-002</option>
            <option value="CC-003">CC-003</option>
          </select>
          {errors.centroCostable && (
            <p className="mt-1 text-xs text-red-600">{errors.centroCostable}</p>
          )}
        </div>

        {/* Cuenta contable por defecto */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cuenta contable por defecto:
          </label>
          <select
            className={`input w-full ${errors.cuentaContable ? "!border-red-500 ring-1 ring-red-500" : ""} ${!selectedProvider ? "opacity-50" : ""}`}
            value={formData.cuentaContable}
            onChange={(e) => updateField("cuentaContable", e.target.value)}
            disabled={!selectedProvider}
          >
            <option value="">Seleccionar...</option>
            <option value="5-01-001">5-01-001</option>
            <option value="5-01-002">5-01-002</option>
            <option value="5-01-003">5-01-003</option>
          </select>
          {errors.cuentaContable && (
            <p className="mt-1 text-xs text-red-600">{errors.cuentaContable}</p>
          )}
        </div>

        {/* Moneda por defecto */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Moneda por defecto:
          </label>
          <select
            className={`input w-full ${errors.moneda ? "!border-red-500 ring-1 ring-red-500" : ""} ${!selectedProvider ? "opacity-50" : ""}`}
            value={formData.moneda}
            onChange={(e) => updateField("moneda", e.target.value)}
            disabled={!selectedProvider}
          >
            <option value="">Seleccionar...</option>
            <option value="CRC">CRC - Colón Costarricense</option>
            <option value="USD">USD - Dólar Estadounidense</option>
            <option value="EUR">EUR - Euro</option>
          </select>
          {errors.moneda && (
            <p className="mt-1 text-xs text-red-600">{errors.moneda}</p>
          )}
        </div>

        {/* Impuesto por defecto */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Impuesto por defecto:
          </label>
          <select
            className={`input w-full ${errors.impuesto ? "!border-red-500 ring-1 ring-red-500" : ""} ${!selectedProvider ? "opacity-50" : ""}`}
            value={formData.impuesto}
            onChange={(e) => updateField("impuesto", e.target.value)}
            disabled={!selectedProvider}
          >
            <option value="">Seleccionar...</option>
            <option value="0">0% - Sin impuesto</option>
            <option value="4">4% - Impuesto reducido</option>
            <option value="13">13% - IVA general</option>
            <option value="1">1% - Impuesto mínimo</option>
          </select>
          {errors.impuesto && (
            <p className="mt-1 text-xs text-red-600">{errors.impuesto}</p>
          )}
        </div>

        {/* Comentarios por defecto */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Comentarios por defecto para este proveedor:
          </label>
          <textarea
            className={`input w-full min-h-[100px] resize-y ${!selectedProvider ? "opacity-50" : ""}`}
            placeholder="Comentarios por defecto para este proveedor"
            value={formData.comentarios}
            onChange={(e) => updateField("comentarios", e.target.value)}
            disabled={!selectedProvider}
          />
        </div>
      </div>

      {/* Botón guardar */}
      <div className="mt-8">
        <button 
          className="btn btn-primary px-8"
          onClick={handleSubmit}
          disabled={!selectedProvider}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}