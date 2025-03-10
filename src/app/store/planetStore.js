import { create } from "zustand";

/**
 * Zustand store para la gestión del estado de los planetas.
 * Incluye funcionalidades para la búsqueda, ordenamiento, paginación
 * y obtención de datos desde una API pública.
 */
const usePlanetStore = create((set, get) => ({
	planets: [],
	searchPlanet: "",
	sortOrder: "asc",
	currentPage: 1,
	itemsPerPage: 5,
	totalPage: 1, // Nuevo estado total de páginas

	/**
	 * Obtiene los planetas desde la API pública.
	 * Almacena los datos en el estado y actualiza el número total de páginas.
	 */
	fetchPlanets: async () => {
		try {
			const res = await fetch("https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,eq,true");
			const data = await res.json();
			set({ planets: data.bodies || [] }, false, "fetchPlanets"); //Guarda los planetas en el estado
			get().updateTotalPage(); // Actualiza el total de páginas después de cargar
		} catch (error) {
			console.error("Error al obtener planetas", error);
		}
	},

	/**
	 * Actualiza el término de búsqueda y reinicia la paginación.
	 * @param {string} search - Término de búsqueda ingresado.
	 */
	setSearchPlanet: (search) => {
		set({ searchPlanet: search, currentPage: 1 });
		get().updateTotalPage();
	},

	/**
	 * Cambia el orden de los planetas.
	 * @param {"asc" | "desc"} order - Orden de clasificación (ascendente o descendente).
	 */
	setSortOrder: (order) => {
		set({ sortOrder: order });
	},

	/**
	 * Avanza a la siguiente página si no está en la última.
	 */
	nextPage: () => {
		set((state) => {
			if (state.currentPage < state.totalPage) {
				return { currentPage: state.currentPage + 1 };
			}
			return {}; // No cambia el estado si no es necesario
		});
	},

	/**
	 * Retrocede a la página anterior si no está en la primera.
	 */
	prevPage: () => {
		set((state) => {
			if (state.currentPage > 1) {
				return { currentPage: state.currentPage - 1 };
			}
			return {}; // No cambia el estado si no es necesario
		});
	},

	/**
	 * Calcula y actualiza el número total de páginas basado en los filtros aplicados.
	 */
	updateTotalPage: () => {
		set((state) => {
			const filtered = state.planets.filter((planet) => planet.englishName.toLowerCase().includes(state.searchPlanet.toLowerCase()));
			return { totalPage: Math.max(1, Math.ceil(filtered.length / state.itemsPerPage)) }; // Evita que totalPage sea 0
		});
	},

	/**
	 * Filtra, ordena y pagina los planetas según los criterios actuales en el estado.
	 * @returns {Array} Lista de planetas filtrados y ordenados.
	 */
	getFilteredPlanets: () => {
		const { planets, searchPlanet, sortOrder, currentPage, itemsPerPage } = get();
		let filtered = planets.filter((planet) => planet.englishName.toLowerCase().includes(searchPlanet.toLowerCase()));
		let sorted = filtered.sort((a, b) => (sortOrder === "asc" ? a.englishName.localeCompare(b.englishName) : b.englishName.localeCompare(a.englishName)));
		const startIndex = (currentPage - 1) * itemsPerPage;
		return sorted.slice(startIndex, startIndex + itemsPerPage);
	},
}));

export default usePlanetStore;
