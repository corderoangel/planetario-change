/** @type {import('next').NextConfig} */
const nextConfig = {
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
