"use client";

import { useSearchParams, useRouter } from "next/navigation";
import usePlanetStore from "../store/planetStore";
import { useEffect } from "react";

/**
 * Componente de barra de búsqueda para filtrar y ordenar planetas.
 *
 * Este componente permite al usuario buscar planetas por nombre y seleccionar un orden de clasificación.
 * Los parámetros de búsqueda y orden se sincronizan con la URL y el estado global de Zustand.
 */
const SearchBarContent = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const searchPlanet = usePlanetStore((state) => state.searchPlanet);
	const setSearchPlanet = usePlanetStore((state) => state.setSearchPlanet);
	const sortOrder = usePlanetStore((state) => state.sortOrder);
	const setSortOrder = usePlanetStore((state) => state.setSortOrder);

	// Sincroniza los valores de la URL con el estado global al montar el componente
	useEffect(() => {
		const searchQuery = searchParams.get("search") || "";
		const sortQuery = searchParams.get("sort") || "asc";

		setSearchPlanet(searchQuery);
		setSortOrder(sortQuery);
	}, []);

	/**
	 * Actualiza los parámetros de búsqueda en la URL sin recargar la página.
	 * @param {string} key - Clave del parámetro a actualizar.
	 * @param {string} value - Valor del parámetro a establecer.
	 */
	const updateURL = (key, value) => {
		const params = new URLSearchParams(searchParams);
		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}
		router.push(`?${params.toString()}`, { scroll: false });
	};

	/**
	 * Maneja los cambios en el campo de búsqueda.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - Evento del input.
	 */
	const handleSearchChange = (e) => {
		setSearchPlanet(e.target.value);
		updateURL("search", e.target.value);
	};

	/**
	 * Maneja los cambios en la selección de ordenamiento.
	 * @param {React.ChangeEvent<HTMLSelectElement>} e - Evento del select.
	 */
	const handleSortChange = (e) => {
		setSortOrder(e.target.value);
		updateURL("sort", e.target.value);
	};

	return (
		<div className="flex flex-col sm:flex-row gap-4 mb-4">
			<input type="text" placeholder="Buscar planeta" value={searchPlanet} onChange={handleSearchChange} className="w-full p-2 border rounded-md" />
			<select value={sortOrder} onChange={handleSortChange} className="w-full p-2 border rounded-md">
				<option value="asc">Orden Ascendente (A-Z)</option>
				<option value="desc">Orden Descendente (Z-A)</option>
			</select>
		</div>
	);
};

export default SearchBarContent;
