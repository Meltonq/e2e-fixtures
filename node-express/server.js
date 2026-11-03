const express = require('express');
const ms = require('ms');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.type('text/plain').send('e2e:node-express:v3-broken');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}, started in ${ms(Math.round(process.uptime() * 1000))}`);
});
