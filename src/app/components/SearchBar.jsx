// "use client";
// import { useSearchParams, useRouter } from "next/navigation";
// import usePlanetStore from "../store/planetStore";
// import { useEffect } from "react";

// const SearchBar = () => {
// 	const searchParams = useSearchParams();
// 	const router = useRouter();
// 	// Extraemos el estado y funciones de Zustand
// 	const searchPlanet = usePlanetStore((state) => state.searchPlanet);
// 	const setSearchPlanet = usePlanetStore((state) => state.setSearchPlanet);
// 	const sortOrder = usePlanetStore((state) => state.sortOrder);
// 	const setSortOrder = usePlanetStore((state) => state.setSortOrder);

// 	// Leer valores de la URL cuando el componente se monte
// 	useEffect(() => {
// 		const searchQuery = searchParams.get("search") || "";
// 		const sortQuery = searchParams.get("sort") || "asc";

// 		setSearchPlanet(searchQuery);
// 		setSortOrder(sortQuery);
// 	}, []);

// 	// Función para actualizar la URL
// 	const updateURL = (key, value) => {
// 		const params = new URLSearchParams(searchParams);
// 		if (value) {
// 			params.set(key, value);
// 		} else {
// 			params.delete(key);
// 		}
// 		router.push(`?${params.toString()}`, { scroll: false });
// 	};

// 	// Manejar cambios en la búsqueda
// 	const handleSearchChange = (e) => {
// 		setSearchPlanet(e.target.value);
// 		updateURL("search", e.target.value);
// 	};

// 	// Manejar cambios en el ordenamiento
// 	const handleSortChange = (e) => {
// 		setSortOrder(e.target.value);
// 		updateURL("sort", e.target.value);
// 	};

// 	return (
// 		<div className="flex flex-col sm:flex-row gap-4 mb-4">
// 			<input type="text" placeholder="Buscar planeta" value={searchPlanet} onChange={handleSearchChange} className="w-full p-2 border rounded-md" />
// 			<select value={sortOrder} onChange={handleSortChange} className="w-full p-2 border rounded-md">
// 				<option value="asc">Orden Ascendente (A-Z)</option>
// 				<option value="desc">Orden Descendente (Z-A)</option>
// 			</select>
// 		</div>
// 	);
// };

// export default SearchBar;

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
