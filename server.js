const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});