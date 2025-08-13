export default function CardSkeleton({ cantidad = 8 }: { cantidad?: number }) {
	return (
		<div className="w-full max-w-7xl mx-auto">
			<div className="animate-pulse space-y-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{[...Array(cantidad)].map((_, i) => (
						<div
							key={i}
							className="bg-zinc-200 dark:bg-zinc-800 rounded-lg h-[400px]"
						/>
					))}
				</div>
			</div>
		</div>
	);
}
