"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlanetDetail() {
	const { slug } = useParams();
	const [planet, setPlanet] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!slug) return; // No hacer nada si slug aún no está definido

		const fetchPlanet = async () => {
			try {
				const res = await fetch(`/api/planets`);
				const data = await res.json();

				// Buscar el planeta por su `slug`
				const selectedPlanet = data.find((p) => p.slug === slug);

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
				<h1 className="text-4xl font-bold mb-4">{planet.name}</h1>
				<p>
					<strong>Días en un año terrestre:</strong> {planet.earthDaysAYear}
				</p>
				<p>
					<strong>Horas en un día:</strong> {planet.hoursInDay}
				</p>
				<p>
					<strong>Temperatura (°C):</strong> {planet.tempC}
				</p>
				<p>
					<strong>Número de lunas:</strong> {planet.noOfMoons}
				</p>
				{planet.majorMoons.length > 0 && (
					<p>
						<strong>Lunas principales:</strong> {planet.majorMoons.join(", ")}
					</p>
				)}
			</div>
		</div>
	);
}
