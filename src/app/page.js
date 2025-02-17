// "use client";

// import { useEffect } from "react";
// import usePlanetStore from "./store/planetStore"; // Importamos el store
// import SearchBar from "./components/SearchBar";
// import PlanetList from "./components/PlanetList";
// import Pagination from "./components/Pagination";
// import { useSearchParams } from "next/navigation";

// export default function Home() {
// 	const { fetchPlanets } = usePlanetStore();
// 	const setSearchPlanet = usePlanetStore((state) => state.setSearchPlanet);
// 	const setSortOrder = usePlanetStore((state) => state.setSortOrder);

// 	const searchParams = useSearchParams();

// 	// Cargar planetas y sincronizar Zustand con la URL al montar el componente
// 	useEffect(() => {
// 		fetchPlanets();

// 		const searchQuery = searchParams.get("search") || "";
// 		const sortQuery = searchParams.get("sort") || "asc";

// 		setSearchPlanet(searchQuery);
// 		setSortOrder(sortQuery);
// 	}, []);
// 	return (
// 		<div
// 			className="min-h-screen bg-cover bg-center bg-fixed p-6"
// 			style={{
// 				backgroundImage: "url('/images/background.jpg')",
// 			}}>
// 			<h1 className="text-3xl font-bold text-center mb-6 text-white">Planetas del sistema solar</h1>
// 			<SearchBar />
// 			<PlanetList />
// 			<Pagination />
// 		</div>
// 	);
// }

"use client";

import { Suspense } from "react";
import HomeContent from "./HomeContent"; // Mueve el contenido a un nuevo archivo

export default function Home() {
	return (
		<Suspense fallback={<p>Cargando...</p>}>
			<HomeContent />
		</Suspense>
	);
}
