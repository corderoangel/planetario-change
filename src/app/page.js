"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import usePlanetStore from "./store/planetStore"; // Importamos el store
import SearchBar from "./components/SearchBar";
import PlanetList from "./components/PlanetList";
import Pagination from "./components/Pagination";

export default function Home() {
	const { fetchPlanets, getFilteredPlanets } = usePlanetStore();
	// const planets = getFilteredPlanets(); // Planetas filtrados
	const router = useRouter();
	// const searchParams = useSearchParams();

	// Cargar planetas al montar el componente
	useEffect(() => {
		fetchPlanets();
	}, []);

	return (
		<div
			className="min-h-screen bg-cover bg-center bg-fixed p-6"
			style={{
				backgroundImage: "url('/images/background.jpg')",
			}}>
			<h1 className="text-3xl font-bold text-center mb-6 text-white">Planetas del sistema solar</h1>
			<SearchBar />
			<PlanetList />
			<Pagination />
		</div>
	);
}
