"use client";

import { useState, useEffect } from "react";

export default function Home() {
	//agregar estado
	const [planets, setPlanets] = useState([]);
	//estado para buscar planeta
	const [searchPlanet, setSearchPlanet] = useState("");

	//función de busqueda
	const handleSearchChange = (event) => {
		setSearchPlanet(event.target.value);
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

	//actualizamos el retorno para que sea por filtro
	return (
		<div>
			<h1>Resultados</h1>
			<input type="text" placeholder="Buscar planeta" value={searchPlanet} onChange={handleSearchChange} />
			<ul>{filteredPlanets.length > 0 ? filteredPlanets.map((e, index) => <li key={index}>{e.name}</li>) : <p>No se encontraron planetas</p>}</ul>
		</div>
	);
}
