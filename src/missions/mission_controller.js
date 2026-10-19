const pool = require('../../db');
const queries = require('./mission_queries');

const getMissionbyId = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getMissionbyId, [id], (error, result) => {
        if(result.rowCount === 0) 
            return res.status(404).json({message: "Mission not found"})
        if(error) 
            return res.status(500).json({ error: "Internal error of the database" });
        res.status(200).json(result.rows);
    });
}

//EXERCISE 1
const getMissionList = (req, res) => {
    pool.query(queries.getMissionList, (error, result) => {
        if(result.rowCount === 0) 
            return res.status(404).json({message: "No mission found"})
        if(error) 
            return res.status(500).json({ error: "Internal error of the database" });
        res.status(200).json(result.rows);
    });
}

//EXERCISE 3
const postMission = (req, res) => {
    const {id, title, location, status} = req.body;
    pool.query(queries.getMissionbyId, [id], (error1, result1) => {
        if(error1) return res.status(500).json({error: "Internal Server Error"});
        if(result1.rowCount > 0) return res.status(409).json({message: "Mission with same id already exists"});
        pool.query(queries.postMission, [id, title, location, status], (error2, result2) => {
        if(error2) return res.status(500).json({error: "Internal Server Error"});
            res.status(201).json({message: "Mission created!"});
        })
    })
};

module.exports = {
    getMissionbyId,
    getMissionList,
    postMission
};