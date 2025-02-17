"use client";

import { useEffect } from "react";
import usePlanetStore from "./store/planetStore";
import SearchBar from "./components/SearchBar";
import PlanetList from "./components/PlanetList";
import Pagination from "./components/Pagination";
import { useSearchParams } from "next/navigation";

export default function HomeContent() {
	const { fetchPlanets } = usePlanetStore();
	const setSearchPlanet = usePlanetStore((state) => state.setSearchPlanet);
	const setSortOrder = usePlanetStore((state) => state.setSortOrder);
	const searchParams = useSearchParams();

	useEffect(() => {
		fetchPlanets();
		const searchQuery = searchParams.get("search") || "";
		const sortQuery = searchParams.get("sort") || "asc";

		setSearchPlanet(searchQuery);
		setSortOrder(sortQuery);
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
