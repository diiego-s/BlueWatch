const getVolunteerbyId = "SELECT * FROM volunteers WHERE id = $1";
const postVolunteer = "INSERT INTO volunteers (id, name, surname) VALUES ($1, $2, $3)"
const putVolunteer = "UPDATE volunteers SET name = $1, surname = $2 WHERE id = $3 RETURNING *";
const getVolunteerbyMission = "select * from volunteers join reports on reports.volunteerid = volunteers.id where reports.missionid = $1;";

module.exports = {
    getVolunteerbyId,
    postVolunteer,
    putVolunteer,
    getVolunteerbyMission
}