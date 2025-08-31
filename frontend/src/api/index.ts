import { client } from "../../generated/api/client.gen.ts";

client.setConfig({
	baseUrl: "http://127.0.0.1:8000",
});

client.interceptors.error.use((error) => {
	throw new Error(error.detail)
})

export * from "../../generated/api/sdk.gen.ts";
