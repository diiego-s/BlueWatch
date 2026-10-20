// Database connection (db.js)
const pool = require('../../db');
// Queries for the reports table
const queries = require('./report_queries');
// Volunteer and mission queries: used to check they exist before creating a report
const volqueries = require('../volunteers/volunteer_queries');
const misqueries = require('../missions/mission_queries');

//EXAMPLE 1
// GET /reports/:id
// Return the report with the id given in the URL
const getReportbyId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getReportbyId, [id], (error, result) => {
        // Database error -> 500
        if(error) 
            return res.status(500).json({ error: "Internal error of the database" });
        // No report with that id -> 404
        if (result.rowCount === 0) 
            return res.status(404).json({message: "Report not found"})
        // Report found -> 200 with the JSON
        res.status(200).json(result.rows);
    })
}

//EXAMPLE 3
// POST /reports
// Create a new report, after checking that the given volunteer and mission exist
const postReport = (req, res) => {
    // Extract the fields from the JSON body of the request
    const {id, description, type, volunteerid, missionid} = req.body;
    
    // 1) Check that the volunteer exists
    pool.query(volqueries.getVolunteerbyId, [volunteerid], (errorV, resultV) => {
        if (errorV) 
            return res.status(500).json({ error: "Internal error of the database" });
        if(resultV.rowCount === 0) 
            return res.status(404).json({error: "Volunteer not found"});

        // 2) Check that the mission exists
        pool.query(misqueries.getMissionbyId, [missionid], (errorM, resultM) => {
            if (errorM) 
                return res.status(500).json({ error: "Internal error of the database" });
            if(resultM.rowCount === 0) 
                return res.status(404).json({error: "Mission not found"});

            // 3) Both exist: insert the report
            pool.query(queries.postReport, [id, description, type, volunteerid, missionid], (errorR, resultR) => {
                if(errorR) 
                    return res.status(500).json({ error: "Internal error of the database" });
                // No row inserted -> 400 Bad Request
                if(resultR.rowCount === 0) 
                    return res.status(400).json({error: "error creating report"});
                // 201 Created
                else return res.status(201).json({message: "Report created!"});
            })
        })
    })
}

// Simpler alternative version, left commented out: it inserts the report directly
// without checking the volunteer and the mission first (if they don't exist, it is the
// database that rejects it through the foreign keys, and the error is returned to the client)
/*
//EXAMPLE 3 - SIMPLE
const postReport = (req, res) => {
    const {id, description, type, volunteerid, missionid} = req.body;
    
    pool.query(queries.postReport, [id, description, type, volunteerid, missionid], (errorR, resultR) => {
        if(errorR) 
            return res.status(500).json({message: "Error detail: " + errorR.detail});
        if(resultR.rowCount === 0) 
            return res.status(400).json({error: "error creating report"});
        else return res.status(201).json({message: "Report created!"});
    })
}
*/


//EXERCISE 2
// GET /reports/:id/volunteer
// Return all reports written by a volunteer (the id in the URL is the volunteer's id)
const getReportbyVol = (req, res) => {
    const volId = parseInt(req.params.id);
    // First check that the volunteer exists, to tell apart
    // "volunteer does not exist" from "volunteer has no reports"
    pool.query(volqueries.getVolunteerbyId, [volId], (errorV, resultV) => {
        if(errorV)
            return res.status(500).json({error: "Internal Server Error"});
        if(resultV.rowCount === 0)
            return res.status(404).json({message: "Volunteer not found!"});
        // Then look up that volunteer's reports
        pool.query(queries.getReportbyVol, [volId], (errorR, resultR) => {
            if(errorR)
                return res.status(500).json({error: "Internal Server Error"});
            if(resultR.rowCount === 0)
                return res.status(404).json({message: "There aren't reports for this volunteer"});
            return res.status(200).json(resultR.rows);
        })
    })
}

module.exports = {
    getReportbyId,
    postReport,
    getReportbyVol
};
