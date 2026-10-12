const pool = require('../../db');
const queries = require('./report_queries');

const getReportbyId = (req, res) => {
    const id = parseInt(req.params.id);
    console.log("Requested ID:", id);
    pool.query(queries.getReportbyId, [id], (error, result) => {
        if(error) throw error;
        console.log("DB Rows found:", result.rows);
        res.status(200).json(result.rows);
    })
}

module.exports = {
    getReportbyId
};