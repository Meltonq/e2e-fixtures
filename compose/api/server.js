const express = require('express');
const { Client } = require('pg');
const { createClient } = require('redis');

const app = express();
const port = process.env.PORT || 8000;

const check = async (name, run) => {
    try {
        await run();
        return `${name}=ok`;
    } catch (error) {
        return `${name}=fail (${error.message})`;
    }
};

app.get('/', async (req, res) => {
    const db = await check('db', async () => {
        const client = new Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 3000 });
        await client.connect();
        await client.query('SELECT 1');
        await client.end();
    });

    const cache = await check('cache', async () => {
        const client = createClient({ url: process.env.REDIS_URL, socket: { connectTimeout: 3000, reconnectStrategy: false } });
        client.on('error', () => {});
        await client.connect();
        await client.ping();
        await client.quit();
    });

    res.type('text/plain').send(`e2e:compose:v1 api ${db} ${cache}`);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
});
