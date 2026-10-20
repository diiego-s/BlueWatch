// SQL queries for the reports table ($1, $2, ... are placeholders for the values)

// Find a report by its id
const getReportbyId = "SELECT * FROM reports WHERE id = $1";
// Insert a new report (the order of the placeholders must match the order of the values passed)
const postReport = "INSERT INTO reports (id, type, description, volunteerid, missionid) VALUES ($1, $2, $3, $4, $5)";
// Return all reports written by a given volunteer
const getReportbyVol = "SELECT * FROM reports WHERE volunteerid = $1";

module.exports = {
    getReportbyId,
    postReport,
    getReportbyVol
};
