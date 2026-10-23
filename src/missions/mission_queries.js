// SQL queries for the missions table.
// $1, $2, ... are placeholders: the values are passed separately to pool.query(),
// so no string concatenation is needed (this prevents SQL injection).

// Find a mission by its id
const getMissionbyId = "SELECT * FROM missions WHERE idmission = $1";
// Return all missions
const getMissionList = "SELECT * FROM missions";
// Insert a new mission
const postMission = "INSERT INTO missions (idmission, title, location, status) VALUES ($1, $2, $3, $4)";

module.exports = {
    getMissionbyId,
    getMissionList,
    postMission
};
