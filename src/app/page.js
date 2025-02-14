"use client";

import { useState, useEffect } from "react";

export default function Home() {
	//agregar estado
	const [planets, setPlanets] = useState([]);

	//agregar efecto (incluir manejo de errores)
	useEffect(() => {
		const fetchPlanets = async () => {
			try {
				const res = await fetch("/api/planets");
				const data = await res.json();
				setPlanets(data || []);
			} catch (error) {
				console.error("Error al obtener planetas", error);
			}
		};
		fetchPlanets();
	}, []);

	//retornar solo en caso de que haya resultados (verificar que haya resultados )
	return (
		<div>
			<h1>Resultados</h1>
			<ul>{planets.length > 0 ? planets.map((e) => <li key={e.name}>{e.name}</li>) : <p>Cargando planetas...</p>}</ul>
		</div>
	);
}
