const pool = require('../../db');
const queries = require('./mission_queries');

const getMissionbyId = (req, res) => {
    const id = parseInt(req.params.id);


    pool.query(queries.getMissionbyId, [id], (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    })
}

module.exports = {
    getMissionbyId
};