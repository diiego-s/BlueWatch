const getMissionbyId = "SELECT * FROM missions WHERE id = $1";
const getMissionList = "SELECT * FROM missions";
const postMission = "INSERT INTO missions (id, title, location, status) VALUES ($1, $2, $3, $4)";

module.exports = {
    getMissionbyId,
    getMissionList,
    postMission
};