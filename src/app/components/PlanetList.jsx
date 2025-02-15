"use client";

import { useRouter } from "next/navigation";
import usePlanetStore from "../store/planetStore";
import { shallow } from "zustand/shallow";

const PlanetList = () => {
	const router = useRouter();
	const planets = usePlanetStore((state) => state.getFilteredPlanets, shallow)();

	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{planets.length > 0 ? (
				planets.map((planet) => (
					<li
						key={planet.id}
						onClick={() => router.push(`/planeta/${planet.englishName}`)}
						className="p-4 bg-gray-100 rounded-lg shadow-md text-center border-4 hover:border-sky-500 cursor-pointer">
						<p className="text-lg font-semibold">{planet.englishName}</p>
					</li>
				))
			) : (
				<p className="col-span-full text-center text-gray-500">No se encontraron planetas</p>
			)}
		</ul>
	);
};

export default PlanetList;
