const port = Number(process.env.PORT || 8080);

Bun.serve({
    port,
    hostname: '0.0.0.0',
    fetch() {
        return new Response('e2e:bun:v1', { headers: { 'content-type': 'text/plain' } });
    },
});

console.log(`listening on ${port}`);
