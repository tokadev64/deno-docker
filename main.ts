import $ from "@david/dax";
import { Hono } from "hono";

const app = new Hono();
$.setPrintCommand(true);

app.get("/get", (c) => c.json({ message: "Hello Deno!" }));
app.post("/post", (c) => c.req.json().then((json) => c.json(json)));

app.post("/wgrib2", async (c) => {
	const post = await c.req.json();
	console.info('/wgrib2 post', post);
	const result = await $`wgrib2 | grep ''`.text();
	return c.text(result);
});

Deno.serve({ port: 1993 }, app.fetch);
app.fire();
