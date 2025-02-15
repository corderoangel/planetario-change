import { create } from "zustand";

const usePlanetStore = create((set, get) => ({
	planets: [],
	searchPlanet: "",
	sortOrder: "asc",
	currentPage: 1,
	itemsPerPage: 5,
	totalPage: 1, // Nuevo estado total de páginas

	// Fetch de la API
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
	// Actualizar búsqueda
	setSearchPlanet: (search) => {
		set({ searchPlanet: search, currentPage: 1 });
		get().updateTotalPage();
	},

	// Cambiar orden
	setSortOrder: (order) => {
		set({ sortOrder: order });
	},

	//paginación
	nextPage: () => {
		set((state) => {
			if (state.currentPage < state.totalPage) {
				return { currentPage: state.currentPage + 1 };
			}
			return {}; // No cambia el estado si no es necesario
		});
	},
	prevPage: () => {
		set((state) => {
			if (state.currentPage > 1) {
				return { currentPage: state.currentPage - 1 };
			}
			return {}; // No cambia el estado si no es necesario
		});
	},

	//actualizamos el total de las páginas
	updateTotalPage: () => {
		set((state) => {
			const filtered = state.planets.filter((planet) => planet.englishName.toLowerCase().includes(state.searchPlanet.toLowerCase()));
			return { totalPage: Math.max(1, Math.ceil(filtered.length / state.itemsPerPage)) }; // Evita que totalPage sea 0
		});
	},

	// Obtener planetas filtrados y ordenados
	getFilteredPlanets: () => {
		const { planets, searchPlanet, sortOrder, currentPage, itemsPerPage } = get();

		let filtered = planets.filter((planet) => planet.englishName.toLowerCase().includes(searchPlanet.toLowerCase()));

		let sorted = filtered.sort((a, b) => (sortOrder === "asc" ? a.englishName.localeCompare(b.englishName) : b.englishName.localeCompare(a.englishName)));

		const startIndex = (currentPage - 1) * itemsPerPage;
		// get().updateTotalPage();
		return sorted.slice(startIndex, startIndex + itemsPerPage);
	},
}));

export default usePlanetStore;
