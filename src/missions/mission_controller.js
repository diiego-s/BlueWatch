const pool = require('../../db');
const queries = require('./mission_queries');

const getMissionbyId = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getMissionbyId, [id], (error, result) => {
        if(error) 
            res.status(500).json({ error: "Internal error of the database" });
        res.status(200).json(result.rows);
    });
}

//EXERCISE 1
const getMissionList = (req, res) => {
    pool.query(queries.getMissionList, (error, result) => {
        if(error) 
            res.status(500).json({ error: "Internal error of the database" });
        res.status(200).json(result.rows);
    });
}

module.exports = {
    getMissionbyId,
    getMissionList
};