const express = require('express');
const { marker } = require('@e2e/shared');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.type('text/plain').send(`${marker('v1')} workspace=apps/web`);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
});
