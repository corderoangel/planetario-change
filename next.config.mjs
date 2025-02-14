/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/planets",
				destination: "https://plan3ts.onrender.com/all",
			},
		];
	},
};

export default nextConfig;
