"use client";

import { useRouter } from "next/navigation";
import usePlanetStore from "../store/planetStore";
import { shallow } from "zustand/shallow";

/**
 * Componente PlanetList
 *
 * Este componente muestra una lista de planetas obtenidos desde el estado global de Zustand.
 * Permite navegar a la página de detalles de un planeta al hacer clic en él.
 *
 * @returns {JSX.Element} Lista de planetas renderizados.
 */
const PlanetList = () => {
	const router = useRouter();

	// Obtener la lista de planetas filtrados desde el store de Zustand
	// Se usa `shallow` para evitar renders innecesarios cuando el estado cambia
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
