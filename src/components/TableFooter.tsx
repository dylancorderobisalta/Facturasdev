type TableFooterProps = {
  pageSize: number;
  setPageSize: (n: number) => void;
  currentPage: number;
  totalPages: number;
  go: (p: number) => void;
};

export function TableFooter({
  pageSize,
  setPageSize,
  currentPage,
  totalPages,
  go,
}: TableFooterProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">Mostrar resultados</span>
        <div className="relative">
          <select
            className="input pr-8 w-[80px]"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); go(1); }}
          >
            {[10, 20, 30, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn btn-ghost px-3"
          onClick={() => go(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹ Anterior
        </button>

        {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => {
          const p = i + 1;
          const active = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => go(p)}
              className={`btn px-3 ${active ? "bg-blue-600 text-white" : "btn-ghost"}`}
            >
              {p}
            </button>
          );
        })}

        <button className="btn btn-ghost px-3"
          onClick={() => go(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente ›
        </button>
      </div>
    </div>
  );
}