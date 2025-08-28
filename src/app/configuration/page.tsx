"use client";

import { useState } from "react";
import { Navigation } from "@/components/HeaderNavigation";
import { ConfigTabs } from "@/components/ConfigTabs";
import { ProviderSelector } from "@/components/ProviderSelector";
import { DefaultValues } from "@/components/DefaultValues";

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState<"provider" | "visualization">("provider");

  return (
    <main className="container-page py-6">
      {/* Header */}
      <Navigation />

      <div className="card p-6">
        <h1 className="text-xl font-semibold text-slate-800 mb-6">Configuración</h1>
        
        {/* Tabs */}
        <ConfigTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "provider" && (
            <div className="space-y-8">
              <ProviderSelector />
              <DefaultValues />
            </div>
          )}
          
          {activeTab === "visualization" && (
            <div className="text-center py-12 text-slate-500">
              Opciones de visualización - En desarrollo
            </div>
          )}
        </div>
      </div>
    </main>
  );
}