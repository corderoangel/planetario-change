"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
	//hooks para manejar la URL con next.js
	const searchParams = useSearchParams();
	const router = useRouter();

	//agregar estado
	const [planets, setPlanets] = useState([]);
	//estado para buscar planeta
	const [searchPlanet, setSearchPlanet] = useState(searchParams.get("search") || "");
	//estado para paginar y máximo de elementos a listar
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	//estado para ordenar
	const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "asc");

	//actualizar parametros en la URL
	const updateURL = (search, sort) => {
		const params = new URLSearchParams();
		if (search) params.set("search", search);
		if (sort) params.set("sort", sort);

		router.push(`/?${params.toString()}`, { scroll: false });
	};

	//función de busqueda
	const handleSearchChange = (event) => {
		const value = event.target.value;
		setSearchPlanet(value);
		setCurrentPage(1); //reiniciar página cuando se busque
		updateURL(value, sortOrder);
	};

	//función de ordenamiento
	const handleSortChange = (event) => {
		const value = event.target.value;
		setSortOrder(value);
		updateURL(value, sortOrder);
	};

	//agregar efecto (incluir manejo de errores)
	useEffect(() => {
		const fetchPlanets = async () => {
			try {
				//se hizo configuración de CORS
				const res = await fetch("/api/planets");
				const data = await res.json();
				setPlanets(data || []);
			} catch (error) {
				console.error("Error al obtener planetas", error);
			}
		};
		fetchPlanets();
	}, []);

	//filtrar planetas
	const filteredPlanets = planets.filter((planet) => planet.name.toLowerCase().includes(searchPlanet.toLocaleLowerCase()));

	//ordenar planetas
	const sortedPlanets = filteredPlanets.sort((a, b) => {
		if (sortOrder === "asc") {
			return a.name.localeCompare(b.name);
		} else {
			return b.name.localeCompare(a.name);
		}
	});

	//calcular total de páginas
	const totalPage = Math.ceil(sortedPlanets.length / itemsPerPage);

	//calcular planetas a mostrar en la página actual
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentPlanets = sortedPlanets.slice(startIndex, startIndex + itemsPerPage);

	//funciones para paginar
	const nextPage = () => {
		if (currentPage < totalPage) setCurrentPage(currentPage + 1);
	};
	const prevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	//actualizamos para agregar select de ordenamiento
	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold text-center mb-6">Planetas del sistema solar</h1>
			<input type="text" placeholder="Buscar planeta" value={searchPlanet} onChange={handleSearchChange} className="w-full p-2 border rounded-md mb-4" />
			<select value={sortOrder} onChange={handleSortChange} className="w-full p-2 border rounded-md mb-4">
				<option value="asc">Orden Ascendente (A-Z)</option>
				<option value="desc">Orden Descendente (Z-A)</option>
			</select>
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{currentPlanets.length > 0 ? (
					currentPlanets.map((e) => (
						<li key={e._id} onClick={() => router.push(`/planeta/${e.slug}`)} className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
							<p className="text-lg font-semibold">{e.name}</p>
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
				<button onClick={nextPage} disabled={currentPage === totalPage} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
					Siguiente
				</button>
			</div>
		</div>
	);
}
