"use client";

import usePlanetStore from "../store/planetStore";

const SearchBar = () => {
	// Extraemos el estado y funciones de Zustand
	const searchPlanet = usePlanetStore((state) => state.searchPlanet);
	const setSearchPlanet = usePlanetStore((state) => state.setSearchPlanet);
	const sortOrder = usePlanetStore((state) => state.sortOrder);
	const setSortOrder = usePlanetStore((state) => state.setSortOrder);

	return (
		<div className="flex flex-col sm:flex-row gap-4 mb-4">
			<input type="text" placeholder="Buscar planeta" value={searchPlanet} onChange={(e) => setSearchPlanet(e.target.value)} className="w-full p-2 border rounded-md" />
			<select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full p-2 border rounded-md">
				<option value="asc">Orden Ascendente (A-Z)</option>
				<option value="desc">Orden Descendente (Z-A)</option>
			</select>
		</div>
	);
};

export default SearchBar;
