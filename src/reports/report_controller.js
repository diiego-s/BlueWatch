const pool = require('../../db');
const queries = require('./report_queries');

//EXAMPLE 2
const getReportbyId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getReportbyId, [id], (error, result) => {
        if (result.rowCount === 0) res.status(404).json({message: "Report not found"})
        if(error) res.status(500).json({ error: "Internal error of the database" });
        res.status(200).json(result.rows);
    })
}

//EXAMPLE 3
const postReport = (req, res) => {
    const {id, description, type, volunteerid, missionid} = req.body;
    pool.query(queries.postReport, [id, description, type, volunteerid, missionid], (error, result) => {
        if(error) res.status(500).json({ error: "Internal error of the database" });
        if(result.rowCount === 0) res.status(400).json({error: "error creating report"});
        else res.status(201).json(result.rows[0]);
    })
}

module.exports = {
    getReportbyId,
    postReport
};