const express = require('express');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
// Only here to prove the package with the conflicting peer range was installed.
require('@testing-library/react-hooks/package.json');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const html = renderToStaticMarkup(React.createElement('p', null, `react=${React.version}`));

    res.type('text/plain').send(`e2e:node-peer-deps:v1 ${html}`);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
});
