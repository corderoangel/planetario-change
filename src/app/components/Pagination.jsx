"use client";

import usePlanetStore from "../store/planetStore";

/**
 * Componente de paginación para la lista de planetas.
 * Permite navegar entre páginas de resultados utilizando el estado global de Zustand.
 */
const Pagination = () => {
	// Obtiene el número de página actual y el total de páginas desde el estado global
	const currentPage = usePlanetStore((state) => state.currentPage);
	const totalPage = usePlanetStore((state) => state.totalPage);

	// Obtiene las funciones para avanzar y retroceder páginas
	const nextPage = usePlanetStore((state) => state.nextPage);
	const prevPage = usePlanetStore((state) => state.prevPage);

	return (
		<div className="flex justify-center items-center space-x-4 mt-6">
			<button
				onClick={prevPage}
				disabled={currentPage === 1}
				className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
				Anterior
			</button>
			<span className="font-semibold text-white">
				Página {currentPage} de {totalPage}
			</span>
			<button
				onClick={nextPage}
				disabled={currentPage >= totalPage}
				className={`px-4 py-2 rounded-lg ${currentPage >= totalPage ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
				Siguiente
			</button>
		</div>
	);
};

export default Pagination;
