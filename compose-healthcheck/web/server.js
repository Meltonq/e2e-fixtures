const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL || 'http://localhost:8000';

// Started only after the api reported healthy, so the api part should say ok at once.
app.get('/', async (req, res) => {
    let api;
    try {
        const response = await fetch(apiUrl, { signal: AbortSignal.timeout(3000) });
        api = (await response.text()).trim();
    } catch (error) {
        api = `unreachable (${error.message})`;
    }

    res.type('text/plain').send(`e2e:compose-healthcheck:v1 web\napi ${apiUrl}: ${api}\n`);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
});
