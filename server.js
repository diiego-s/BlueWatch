const express = require('express');

const app = express();
const port = 3000;

const pool = require('./db.js');

const reportRoutes = require('./src/reports/report_routes.js');
const missionRoutes = require('./src/missions/mission_routes.js');

app.use(express.json());

app.use('/reports', reportRoutes);
app.use('/missions', missionRoutes);

app.get('/hello', (req, res) => {
    res.status(200).json({message: "hello, server activated!"});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));