import Image from "next/image";

export function Navigation() {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <Image
          src="/Logo Construplaza.png"
          alt="Logo"
          width={36}
          height={36}
          className="rounded-lg"
          priority
        />
        <span className="text-lg font-semibold">Home</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary w-[120px]">Historial</button>
        <button className="btn btn-primary w-[120px]">Configuracion</button>
      </div>
    </div>
  );
}