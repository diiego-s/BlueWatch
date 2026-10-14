const pool = require('../../db');
const queries = require('./report_queries');
const volqueries = require('../volunteers/volunteer_queries');
const misqueries = require('../missions/mission_queries');

//EXAMPLE 1
const getReportbyId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getReportbyId, [id], (error, result) => {
        if (result.rowCount === 0) 
            res.status(404).json({message: "Report not found"})
        if(error) 
            res.status(500).json({ error: "Internal error of the database" });
        res.status(200).json(result.rows);
    })
}

//EXAMPLE 3
const postReport = (req, res) => {
    const {id, description, type, volunteerid, missionid} = req.body;
    
    pool.query(volqueries.getVolunteerbyId, [volunteerid], (errorV, resultV) => {
        if (errorV) 
            return res.status(500).json({ error: "Internal error of the database" });
        if(resultV.rowCount === 0) 
            return res.status(404).json({error: "Volunteer not found"});

        pool.query(misqueries.getMissionbyId, [missionid], (errorM, resultM) => {
            if (errorM) 
                return res.status(500).json({ error: "Internal error of the database" });
            if(resultM.rowCount === 0) 
                return res.status(404).json({error: "Mission not found"});

            pool.query(queries.postReport, [id, description, type, volunteerid, missionid], (errorR, resultR) => {
                if(errorR) 
                    return res.status(500).json({ error: "Internal error of the database" });
                if(resultR.rowCount === 0) 
                    return res.status(400).json({error: "error creating report"});
                else return res.status(201).json(resultR.rows[0]);
            })
        })
    })
}

module.exports = {
    getReportbyId,
    postReport
};