"use client";

import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function Home() {
	return (
		<Suspense fallback={<p>Cargando...</p>}>
			<HomeContent />
		</Suspense>
	);
}
