"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**Tuve que crear un layout para Usar Tanstack Query y así evitar que todas las vistas
 * que no sean de series se vuelvan cliente component */

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
