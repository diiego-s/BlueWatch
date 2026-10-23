// pool: connection to the PostgreSQL database (defined in db.js in the project root)
const pool = require('../../db');
// SQL queries for the missions table
const queries = require('./mission_queries');
// ----------------------------------------------------------------------------------------------------------------------
// ---------------- EXERCISES -------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------


//EXERCISE 1
// GET /missions/list
// Return all missions
const getMissionList = (req, res) => {
    pool.query(queries.getMissionList, (error, result) => {
        // Empty table -> 404
        // Database error -> 500
        if(error) 
            return res.status(500).json({ error: "Internal error of the database" });
        // Full list as JSON
        res.status(200).json(result.rows);
    });
}

//EXERCISE 3
// POST /missions
// Create a new mission with the data received in the body
const postMission = (req, res) => {
    // Extract the fields from the JSON body of the request
    const {idmission, title, location, status} = req.body;
    // First check that no mission with the same id already exists
    pool.query(queries.getMissionbyId, [idmission], (error1, result1) => {
        if(error1) 
            return res.status(500).json({error: "Internal Server Error"});
        // Id already taken -> 409 Conflict
        if(result1.rowCount > 0) 
            return res.status(409).json({message: "Mission with same id already exists"});
        // The id is free: insert the new mission
        pool.query(queries.postMission, [idmission, title, location, status], (error2, result2) => {
            if(error2) 
                return res.status(500).json({error: "Internal Server Error"});
            // 201 Created: resource successfully created
            res.status(201).json({message: "Mission created!"});
        })
    })
};

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

// GET /missions/:id
// Return the mission with the id given in the URL
const getMissionbyId = (req, res) => {
    // URL parameters are strings: convert to an integer
    const id = parseInt(req.params.id);

    // Run the query passing the id as the value of $1; the callback receives the error and the result
    pool.query(queries.getMissionbyId, [id], (error, result) => {
        // No row found -> 404 Not Found
        if(result.rowCount === 0) 
            return res.status(404).json({message: "Mission not found"})
        // Database error -> 500 Internal Server Error
        if(error) 
            return res.status(500).json({ error: "Internal error of the database" });
        // All good -> 200 OK with the rows found, as JSON
        res.status(200).json(result.rows);
    });
}

// Export the functions so they can be used in the routes file
module.exports = {
    getMissionbyId,
    getMissionList,
    postMission
};
