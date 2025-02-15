/** @type {import('next').NextConfig} */
const nextConfig = {
	// en caso de problemas de CORS
	async rewrites() {
		return [
			{
				source: "/api/planets",
				destination: "https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,eq,true",
			},
		];
	},
};

export default nextConfig;
