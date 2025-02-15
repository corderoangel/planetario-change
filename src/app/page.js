"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
	//hooks para manejar la URL con next.js
	const searchParams = useSearchParams();
	const router = useRouter();

	const [planets, setPlanets] = useState([]);
	const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "asc");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const [searchPlanet, setSearchPlanet] = useState(searchParams.get("search") || "");

	const updateURL = (search, sort) => {
		const params = new URLSearchParams();
		if (search) params.set("search", search);
		if (sort) params.set("sort", sort);

		router.push(`/?${params.toString()}`, { scroll: false });
	};

	const handleSortChange = (event) => {
		const value = event.target.value;
		setSortOrder(value);
		updateURL(value, sortOrder);
	};
	const handleSearchChange = (event) => {
		const value = event.target.value;
		setSearchPlanet(value);
		setCurrentPage(1); //reiniciar página cuando se busque
		updateURL(value, sortOrder);
	};

	useEffect(() => {
		const fetchPlanets = async () => {
			try {
				const res = await fetch("https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,eq,true");
				const data = await res.json();
				setPlanets(data.bodies || []);
			} catch (error) {
				console.error("Error al obtener planetas", error);
			}
		};
		fetchPlanets();
	}, []);

	const filteredPlanets = planets.filter((planet) => planet.englishName.toLowerCase().includes(searchPlanet.toLocaleLowerCase()));

	const sortedPlanets = filteredPlanets.sort((a, b) => {
		if (sortOrder === "asc") {
			return a.englishName.localeCompare(b.englishName);
		} else {
			return b.englishName.localeCompare(a.englishName);
		}
	});

	const totalPage = Math.ceil(sortedPlanets.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentPlanets = sortedPlanets.slice(startIndex, startIndex + itemsPerPage);

	const nextPage = () => {
		if (currentPage < totalPage) setCurrentPage(currentPage + 1);
	};
	const prevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
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
				{currentPlanets.length > 0 ? (
					currentPlanets.map((e) => (
						<li
							key={e.id}
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
				<button onClick={nextPage} disabled={currentPage === totalPage} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
					Siguiente
				</button>
			</div>
		</div>
	);
}
