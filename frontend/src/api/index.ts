import { client } from "../../generated/api/client.gen.ts";

client.setConfig({
	baseUrl: "http://127.0.0.1:8000",
});

export * from "../../generated/api/sdk.gen.ts";
