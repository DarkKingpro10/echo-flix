"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcionalmente puedes logear el error a un servicio de reporte de errores
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
      <div className="space-y-8 text-center max-w-2xl mx-auto relative">
        {/* Icono de Error */}
        <div className="text-8xl mb-4">⚠️</div>

        {/* Mensaje de Error */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-600 text-transparent bg-clip-text">
            ¡Algo salió mal!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            No te preocupes, nuestro equipo de robots está trabajando en ello.
            Mientras tanto, puedes intentar:
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors w-full sm:w-auto"
          >
            Volver al inicio
          </Link>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
          <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
        </div>
      </div>
    </main>
  );
}
