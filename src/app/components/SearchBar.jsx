"use client";

import { Suspense } from "react";
import SearchBarContent from "./SearchBarContent"; // Mueve el contenido a un nuevo archivo

export default function SearchBar() {
	return (
		<Suspense fallback={<p>Cargando barra de búsqueda...</p>}>
			<SearchBarContent />
		</Suspense>
	);
}
