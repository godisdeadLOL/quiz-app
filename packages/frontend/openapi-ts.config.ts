import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input: "../../openapi.json",
	output: "./generated/api",
	plugins: [
		{
			name: "@hey-api/sdk",
			asClass: true,
		},
	],
});
