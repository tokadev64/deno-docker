import $ from "@david/dax";
import { Hono } from 'hono';

const app = new Hono();
$.setPrintCommand(true);

app.get('/get', (c) => c.json({ message: 'Hello Deno!' }));
app.post('/post', (c) => c.req.json().then((json) => c.json(json)));

app.post('/wgrib2', async (c) => {
	const json = await c.req.json();
	const path = [json.dir, json.filepath].join('');
	const args = [json.option, path].filter(Boolean).join(' ');
	const result = await $.raw`wgrib2 ${args}`.text();
	return c.text(result);
});

Deno.serve({ port: 1993 }, app.fetch);
app.fire();
