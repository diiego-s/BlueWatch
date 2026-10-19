const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const reportRoutes = require('./src/reports/report_routes.js');
app.use('/reports', reportRoutes);

const missionRoutes = require('./src/missions/mission_routes.js');
app.use('/missions', missionRoutes);

const volunteerRoutes = require('./src/volunteers/volunteer_routes.js');
app.use('/volunteers', volunteerRoutes);

//EXAMPLE 0
app.get('/hello', (req, res) => {
    res.status(200).json({message: "Hello, server activated!"});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));