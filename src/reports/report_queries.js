const getReportbyId = "SELECT * FROM reports WHERE id = $1";
const postReport = "INSERT INTO reports (id, type, description, volunteerid, missionid) VALUES ($1, $2, $3, $4, $5)";
const getReportbyVol = "SELECT * FROM reports WHERE volunteerid = $1";

module.exports = {
    getReportbyId,
    postReport,
    getReportbyVol
};