const pool = require('../../db');
const queries = require('./volunteer_queries');

const postVolunteer = (req, res) => {
    const {id, name, surname} = req.body;
    pool.query(queries.postVolunteer, [id, name, surname], (error, result) => {
        if(error) res.status(500).json({error: "internal server error"});
        res.status(201).json({message: "volunteer created!"});
    })
}

module.exports = {
    postVolunteer
}