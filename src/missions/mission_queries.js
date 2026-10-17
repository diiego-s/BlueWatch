const getMissionbyId = "SELECT * FROM missions WHERE id = $1";
const getMissionList = "SELECT * FROM missions";

module.exports = {
    getMissionbyId,
    getMissionList
};