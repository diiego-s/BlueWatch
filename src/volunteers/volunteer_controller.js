// Database connection (db.js)
const pool = require('../../db');
// Queries for the volunteers table
const queries = require('./volunteer_queries');
// Mission queries: used to check that the mission exists
const mission_queries = require("../missions/mission_queries")

// ----------------------------------------------------------------------------------------------------------------------
// ---------------- EXAMPLES -------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

//EXAMPLE 2
// POST /volunteers
// Create a new volunteer with the data received in the body
const postVolunteer = (req, res) => {
    const {idvolunteer, name, surname} = req.body;
    // First check whether a volunteer with the same id already exists
    pool.query(queries.getVolunteerbyId, [idvolunteer], (errorC, resultC) => {
        // Id already taken -> 409 Conflict
        if(resultC.rowCount > 0) 
            return res.status(409).json({message: "Volunteer already exists"});
        if(errorC) 
            return res.status(500).json({error: "Internal server error"});
    
        // Id is free: insert the volunteer
        pool.query(queries.postVolunteer, [idvolunteer, name, surname], (error, result) => {
            if(error) 
                return res.status(500).json({error: "Internal server error"});
            // 201 Created
            res.status(201).json({message: "Volunteer created!"});
        })
    })
}

//EXAMPLE 4
// PUT /volunteers/:id
// Update the name and surname of the volunteer given in the URL
const putVolunteer = (req, res) => {
    // The id comes from the URL, the new values from the body
    const idvolunteer = parseInt(req.params.id);
    const {name, surname} = req.body;

    pool.query(queries.putVolunteer, [name, surname, idvolunteer], (error, result) => {
        if (error)
            return res.status(500).json({ error: "internal server error" });
        // No row updated: the volunteer does not exist -> 404
        if (result.rowCount === 0)
            return res.status(404).json({ error: "Volunteer not found" });
        // Return the updated volunteer (thanks to RETURNING * in the query)
        return res.status(200).json(result.rows[0]);
    });
};

// ----------------------------------------------------------------------------------------------------------------------
// ---------------- EXERCISES -------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

//FinalAssignment
// GET /volunteers/:id/mission
// Return the volunteers who wrote reports about the mission with that id
// (the id in the URL is the mission's id)
// TODO: uncomment the lines below and replace TODO with the correct answers
const getVolunteerbyMission = (req,res) => {
    /*
    // TODO: extract the mission ID from the request parameters
    const mission_id = parseInt(TODO);
    // First check that the mission exists
    // TODO: check if the mission with the ID extracted exist by using the query from mission_queries.js
    pool.query(mission_queries.TODO, [mission_id], (errorM, resultM) => {
        if(errorM)
            return res.status(500).json({error: "Internal Server Error"});
        if(resultM.rowCount === 0)
            return res.status(404).json({message: "Mission not found"});

        // Then find the volunteers linked to that mission through the reports
        pool.query(queries.getVolunteerbyMission, [mission_id], (errorV, resultV) => {
            if(errorV)
                return res.status(500).json({error: "Internal Server Error"});
            if(resultV.rowCount === 0) 
                return res.status(404).json({message: "No Volunteer found for that mission"});
            else 
                return res.status(200).json(resultV.rows);
        })
    })
    */
}

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

// GET /volunteers/:id
// Return the volunteer with the id given in the URL
const getVolunteerbyId = (req, res) =>{
    const idvolunteer = parseInt(req.params.id);
    pool.query(queries.getVolunteerbyId, [idvolunteer], (error, result) => {
        // No volunteer found -> 404
        if(result.rowCount === 0) 
            return res.status(404).json({message: "Volunteer not found"})
        // Database error -> 500
        if(error)
            return res.status(500).json({error: "Internal server error"});
        return res.status(200).json(result.rows);
    })
}

module.exports = {
    getVolunteerbyId,
    postVolunteer,
    putVolunteer,
    getVolunteerbyMission
}
