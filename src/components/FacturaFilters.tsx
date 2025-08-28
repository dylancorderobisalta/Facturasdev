type FacturaFiltersProps = {
  buscar: string;
  desde: string;
  hasta: string;
  setBuscar: (v: string) => void;
  setDesde: (v: string) => void;
  setHasta: (v: string) => void;
  setPage: (v: number) => void;
};

export function FacturaFilters({ buscar: q, desde, hasta, setBuscar, setDesde, setHasta, setPage }: FacturaFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative w-full sm:w-[300px]">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          {/* icono buscar */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <input
          className="input"
          style={{ paddingLeft: '2.0rem' }}
          placeholder="Buscar"
          value={q}
          onChange={(e) => { setBuscar(e.target.value); setPage(1); }}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="date"
            className="input pl-9 w-[300px]"
            value={desde}
            onChange={(e) => { setDesde(e.target.value); setPage(1); }}
          />
        </div>
        <div className="relative">
          <input
            type="date"
            className="input pl-9 w-[300px]"
            value={hasta}
            onChange={(e) => { setHasta(e.target.value); setPage(1); }}
          />
        </div>
      </div>
    </div>
  );
}