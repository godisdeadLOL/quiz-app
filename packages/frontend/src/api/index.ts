import { client } from "../../generated/api/client.gen.ts";

client.setConfig({
	baseUrl: "http://127.0.0.1:3000",
});

export * from "../../generated/api/sdk.gen.ts";
