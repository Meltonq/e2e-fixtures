const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.type('text/plain').send('e2e:node-express:v1');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
});
