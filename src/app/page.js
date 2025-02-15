"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import usePlanetStore from "./store/planetStore"; // Importamos el store

export default function Home() {
	const { fetchPlanets, getFilteredPlanets, searchPlanet, setSearchPlanet, sortOrder, setSortOrder, currentPage, nextPage, prevPage, totalPage } = usePlanetStore();
	const planets = getFilteredPlanets(); // Planetas filtrados
	const router = useRouter();
	const searchParams = useSearchParams();

	// Cargar planetas al montar el componente
	useEffect(() => {
		fetchPlanets();
	}, []);

	// Actualizar URL al cambiar búsqueda u orden
	const updateURL = (search, sort) => {
		const params = new URLSearchParams();
		if (search) params.set("search", search);
		if (sort) params.set("sort", sort);
		router.push(`/?${params.toString()}`, { scroll: false });
	};

	const handleSearchChange = (event) => {
		const value = event.target.value;
		setSearchPlanet(value);
		updateURL(value, sortOrder);
	};

	const handleSortChange = (event) => {
		const value = event.target.value;
		setSortOrder(value);
		updateURL(searchPlanet, value);
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold text-center mb-6">Planetas del sistema solar</h1>

			<input type="text" placeholder="Buscar planeta" value={searchPlanet} onChange={handleSearchChange} className="w-full p-2 border rounded-md mb-4" />

			<select value={sortOrder} onChange={handleSortChange} className="w-full p-2 border rounded-md mb-4">
				<option value="asc">Orden Ascendente (A-Z)</option>
				<option value="desc">Orden Descendente (Z-A)</option>
			</select>

			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
				{planets.length > 0 ? (
					planets.map((e) => (
						<li
							key={e.englishName}
							onClick={() => router.push(`/planeta/${e.englishName}`)}
							className="p-4 bg-gray-100 rounded-lg shadow-md text-center border-4 hover:border-sky-500 cursor-pointer">
							<p className="text-lg font-semibold">{e.englishName}</p>
						</li>
					))
				) : (
					<p className="col-span-full text-center text-gray-500">No se encontraron planetas</p>
				)}
			</ul>

			<div className="flex justify-center items-center mt-4 space-x-4">
				<button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
					Anterior
				</button>
				<span className="text-lg font-medium">
					Página {currentPage} de {totalPage}
				</span>
				<button onClick={nextPage} disabled={currentPage >= totalPage} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
					Siguiente
				</button>
			</div>
		</div>
	);
}
