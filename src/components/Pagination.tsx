"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalResults: number;
  path?: string;
}

export default function Pagination({
	currentPage,
	totalPages,
	totalResults,
  path=''
}: PaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`/${path}?${params.toString()}`);
	};

	// Calcular rango de páginas a mostrar
	const getPageRange = () => {
		const range = [];
		const maxButtons = 5; // Número máximo de botones a mostrar
		let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
		const end = Math.min(totalPages, start + maxButtons - 1);

		// Ajustar el inicio si estamos cerca del final
		if (end - start + 1 < maxButtons) {
			start = Math.max(1, end - maxButtons + 1);
		}

		for (let i = start; i <= end; i++) {
			range.push(i);
		}

		return range;
	};

	// No mostrar paginación si solo hay una página
	if (totalPages <= 1) return null;

	const pageRange = getPageRange();

	return (
		<div className="flex flex-col items-center gap-4 py-8">
			{/* Información de resultados */}
			<p className="text-sm text-zinc-600 dark:text-zinc-400">
				Mostrando página {currentPage} de {totalPages} ({totalResults} resultados)
			</p>

			{/* Controles de paginación */}
			<div className="flex items-center gap-2">
				{/* Botón anterior */}
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Página anterior</span>
				</button>

				{/* Botones de página */}
				<div className="flex items-center gap-1">
					{pageRange[0] > 1 && (
						<>
							<button
								onClick={() => handlePageChange(1)}
								className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
							>
								1
							</button>
							{pageRange[0] > 2 && (
								<span className="px-2 text-zinc-600 dark:text-zinc-400">...</span>
							)}
						</>
					)}

					{pageRange.map((page) => (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
								page === currentPage
									? "bg-primary text-white"
									: "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700"
							}`}
						>
							{page}
						</button>
					))}

					{pageRange[pageRange.length - 1] < totalPages && (
						<>
							{pageRange[pageRange.length - 1] < totalPages - 1 && (
								<span className="px-2 text-zinc-600 dark:text-zinc-400">...</span>
							)}
							<button
								onClick={() => handlePageChange(totalPages)}
								className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
							>
								{totalPages}
							</button>
						</>
					)}
				</div>

				{/* Botón siguiente */}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<ChevronRight className="h-4 w-4" />
					<span className="sr-only">Página siguiente</span>
				</button>
			</div>
		</div>
	);
}
