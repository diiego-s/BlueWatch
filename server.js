const express = require('express');

const app = express();
const port = 3000;

const reportRoutes = require('./src/reports/report_routes.js');
const missionRoutes = require('./src/missions/mission_routes.js');
const volunteerRoutes = require('./src/volunteers/volunteer_routes.js')

app.use(express.json());

app.use('/reports', reportRoutes);
app.use('/missions', missionRoutes);
app.use('/volunteers', volunteerRoutes);

//EXAMPLE 0
app.get('/hello', (req, res) => {
    res.status(200).json({message: "Hello, server activated!"});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));