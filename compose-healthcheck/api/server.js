const express = require('express');
const { Client } = require('pg');
const { createClient } = require('redis');

const app = express();
const port = process.env.PORT || 8000;

const check = async (name, run) => {
    try {
        await run();
        return { ok: true, text: `${name}=ok` };
    } catch (error) {
        return { ok: false, text: `${name}=fail (${error.message})` };
    }
};

const checkAll = () => Promise.all([
    check('db', async () => {
        const client = new Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 3000 });
        await client.connect();
        await client.query('SELECT 1');
        await client.end();
    }),
    check('cache', async () => {
        const client = createClient({ url: process.env.REDIS_URL, socket: { connectTimeout: 3000, reconnectStrategy: false } });
        client.on('error', () => {});
        await client.connect();
        await client.ping();
        await client.quit();
    }),
]);

// The compose healthcheck: healthy only once both connections work.
app.get('/health', async (req, res) => {
    const results = await checkAll();

    res.status(results.every((result) => result.ok) ? 200 : 503).type('text/plain').send(results.map((result) => result.text).join(' '));
});

app.get('/', async (req, res) => {
    const results = await checkAll();

    res.type('text/plain').send(`e2e:compose-healthcheck:v1 api ${results.map((result) => result.text).join(' ')}`);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
});
