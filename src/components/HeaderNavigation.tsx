"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isConfig = pathname === "/configuracion";
  
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
        <span className="text-lg font-semibold">
          {isConfig ? "Configuración" : "Home"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary w-[120px]">Historial</button>
        {isHome ? (
          <Link href="/configuracion" className="btn btn-primary w-[120px]">
            Configuración
          </Link>
        ) : (
          <Link href="/" className="btn btn-primary w-[120px]">
            Volver
          </Link>
        )}
      </div>
    </div>
  );
}