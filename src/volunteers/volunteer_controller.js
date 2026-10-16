const pool = require('../../db');
const queries = require('./volunteer_queries');

const getVolunteerbyId = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getVolunteerbyId, [id], (error, result) => {
        if(result.rowCount === 0) 
            res.status(404).json({message: "Volunteer not found"})
        if(error) 
            res.status(500).json({error: "internal server error"});
        res.status(200).json(result.rows);
    })
}

//EXAMPLE 2
const postVolunteer = (req, res) => {
    const {id, name, surname} = req.body;
    pool.query(queries.getVolunteerbyId, [id], (errorC, resultC) => {
        if(resultC.rowCount > 0) 
            res.status(409).json({message: "Volunteer already exists"});
        if(errorC) 
            res.status(500).json({error: "internal server error"});
    
        pool.query(queries.postVolunteer, [id, name, surname], (error, result) => {
            if(error) 
                res.status(500).json({error: "internal server error"});
            res.status(201).json({message: "volunteer created!"});
        })
    })
}

module.exports = {
    getVolunteerbyId,
    postVolunteer
}