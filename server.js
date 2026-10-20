// Express: web framework used to create the HTTP server and define the routes (the API endpoints)
const express = require('express');

// Create the Express application
const app = express();
// Port the server listens on
const port = 3000;

// Middleware: parses the JSON body of incoming requests
// and makes it available in the code as req.body
app.use(express.json());

// Each resource keeps its routes in a separate file, "mounted" on a prefix:
// the router's paths are appended to the prefix (e.g. '/reports' + '/:id' = '/reports/:id')
const reportRoutes = require('./src/reports/report_routes.js');
app.use('/reports', reportRoutes);

const missionRoutes = require('./src/missions/mission_routes.js');
app.use('/missions', missionRoutes);

const volunteerRoutes = require('./src/volunteers/volunteer_routes.js');
app.use('/volunteers', volunteerRoutes);

//EXAMPLE 0
// Test route: GET /hello is used to check that the server is up and running
app.get('/hello', (req, res) => {
    res.status(200).json({message: "Hello, server activated!"});
});

// Start the server and print a message to the console when it is ready
app.listen(port, () => console.log(`app listening on port ${port}!`));
