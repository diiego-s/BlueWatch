const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/hello', (req, res) => {
    res.status(200).json({message: "hello, server attivatooo!"});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));