"use client";

import { useState, useEffect } from "react";
import usePlanetStore from "../store/planetStore";
import { shallow } from "zustand/shallow";

const Pagination = () => {
	// Extraer valores del estado sin usar shallow
	const currentPage = usePlanetStore((state) => state.currentPage);
	const totalPage = usePlanetStore((state) => state.totalPage);

	// Extraer funciones de navegación (llamadas separadas para evitar errores en Next.js)
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
			<span className="font-semibold">
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
