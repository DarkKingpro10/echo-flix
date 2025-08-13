'use client';
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ title }: { title?: string }) {
	const router = useRouter();

	return (
		<button
			onClick={router.back}
			className="mb-6 inline-flex items-center gap-2 text-white hover:text-primary dark:hover:text-secondary transition-colors"
		>
			<ChevronLeft className="h-5 w-5" />
			<span>Volver {title ? `a ${title}` : ""}</span>
		</button>
	);
}
