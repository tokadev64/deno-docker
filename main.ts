import { Hono } from 'hono';

const app = new Hono();

app.get('/get', (c) => c.json({ message: 'Hello Deno!' }));
app.post('/post', (c) => c.req.json().then((json) => c.json(json)));

app.post('/wgrib2', async (c) => {
	const json = await c.req.json();

	const command = new Deno.Command('wgrib2', {
		args: [json.option, json.url].filter(Boolean)
	});
	const { success, code, stdout, stderr } = await command.outputSync();
	console.assert(success);

	return (code === 0)
		? c.text(new TextDecoder().decode(stdout))
		: c.text(new TextDecoder().decode(stderr));
});

Deno.serve({ port: 1993 }, app.fetch);
app.fire();
