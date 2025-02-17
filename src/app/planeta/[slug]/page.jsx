"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlanetDetail() {
	const { slug } = useParams();
	console.log("Slug recibido:", slug);
	const [planet, setPlanet] = useState(null);
	const [loading, setLoading] = useState(true);

	console.log(planet);

	useEffect(() => {
		if (!slug) return; // No hacer nada si slug aún no está definido

		const fetchPlanet = async () => {
			try {
				const res = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,eq,true`);
				const data = await res.json();

				const selectedPlanet = data.bodies.find((p) => p.englishName === slug);

				if (selectedPlanet) {
					setPlanet(selectedPlanet);
				} else {
					console.error("Planeta no encontrado");
				}
			} catch (error) {
				console.error("Error al obtener el planeta:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPlanet();
	}, [slug]);

	if (loading) return <p>Cargando detalles...</p>;
	if (!planet) return <p>No se encontró el planeta.</p>;

	return (
		<div className="p-6">
			{/* Video de fondo */}
			<video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
				<source src="/videos/space.mp4" type="video/mp4" />
			</video>
			<h1 className="text-3xl font-bold text-center mb-4">{planet.name}</h1>
			{/* Contenido */}
			<div className="relative z-10 bg-black bg-opacity-50 p-8 rounded-lg text-white max-w-lg mx-auto text-center">
				<h1 className="text-4xl font-bold mb-4">{planet.englishName}</h1>
				<p>
					<strong>Masa:</strong> {planet.mass ? `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg` : "Desconocida"}
				</p>
				<p>
					<strong>Volumen:</strong> {planet.vol ? `${planet.vol.volValue} × 10^${planet.vol.volExponent} km³` : "Desconocido"}
				</p>
				<p>
					<strong>Densidad media:</strong> {planet.density ? `${planet.density} g/cm³` : "Desconocida"}
				</p>
				<p>
					<strong>Gravedad en la superficie:</strong> {planet.gravity ? `${planet.gravity} m/s²` : "Desconocida"}
				</p>
				<p>
					<strong>Temperatura media:</strong> {planet.avgTemp ? `${planet.avgTemp} K` : "Desconocida"}
				</p>
			</div>
		</div>
	);
}
