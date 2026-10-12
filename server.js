const express = require('express');

const app = express();
const port = 3000;

const reportRoutes = require('./src/reports/report_routes.js');

app.use(express.json());
app.use('/reports', reportRoutes);

app.get('/hello', (req, res) => {
    res.status(200).json({message: "hello, server activated!"});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));