import { Hono } from "hono";

const app = new Hono();

app.get("/get", (c) => c.json({ message: "Hello Deno!" }));
app.post("/post", (c) => c.req.json().then((json) => c.json(json)));

Deno.serve({ port: 1993 }, app.fetch);
app.fire();
