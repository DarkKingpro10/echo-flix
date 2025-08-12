import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
      <div className="space-y-8 text-center">
        {/* Número 404 estilizado */}
        <h1 className="text-9xl font-black bg-gradient-to-r from-primary to-red-600 text-transparent bg-clip-text">
          404
        </h1>

        {/* Mensaje de error */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">¡Oops! Página no encontrada</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            La página que estás buscando parece que se perdió en el espacio... 
            ¿Tal vez fue abducida por aliens? 👽
          </p>
        </div>

        {/* Botón de regreso */}
        <Link 
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          Volver al inicio
        </Link>

        {/* Animación de estrellas */}
        <div className="relative w-full max-w-lg mx-auto mt-8">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
        </div>
      </div>
    </main>
  );
}
