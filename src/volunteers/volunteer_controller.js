const pool = require('../../db');
const queries = require('./volunteer_queries');
const mission_queries = require("../missions/mission_queries")

const getVolunteerbyId = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getVolunteerbyId, [id], (error, result) => {
        if(result.rowCount === 0) 
            return res.status(404).json({message: "Volunteer not found"})
        if(error) 
            return res.status(500).json({error: "Internal server error"});
        return res.status(200).json(result.rows);
    })
}

//EXAMPLE 2
const postVolunteer = (req, res) => {
    const {id, name, surname} = req.body;
    pool.query(queries.getVolunteerbyId, [id], (errorC, resultC) => {
        if(resultC.rowCount > 0) 
            return res.status(409).json({message: "Volunteer already exists"});
        if(errorC) 
            return res.status(500).json({error: "Internal server error"});
    
        pool.query(queries.postVolunteer, [id, name, surname], (error, result) => {
            if(error) 
                return res.status(500).json({error: "Internal server error"});
            res.status(201).json({message: "Volunteer created!"});
        })
    })
}

//EXAMPLE 4
const putVolunteer = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, surname} = req.body;

    pool.query(queries.putVolunteer, [name, surname, id], (error, result) => {
        if (error)
            return res.status(500).json({ error: "internal server error" });
        if (result.rowCount === 0)
            return res.status(404).json({ error: "Volunteer not found" });
        return res.status(200).json(result.rows[0]);
    });
};

//FinalAssignement
const getVolunteerbyMission = (req,res) => {
    const mission_id = parseInt(req.params.id);
    pool.query(mission_queries.getMissionbyId, [mission_id], (errorM, resultM) => {
        if(errorM)
            return res.status(500).json({error: "Internal Server Error"});
        if(resultM.rowCount === 0)
            return res.status(404).json({message: "Mission not found"});
        pool.query(queries.getVolunteerbyMission, [mission_id], (errorV, resultV) => {
            if(errorV)
                return res.status(500).json({error: "Internal Server Error"});
            if(resultV.rowCount === 0) 
                return res.status(404).json({message: "No Volunteer found for that mission"});
            else 
                return res.status(200).json(resultV.rows);
        })
    })
}

module.exports = {
    getVolunteerbyId,
    postVolunteer,
    putVolunteer,
    getVolunteerbyMission
}