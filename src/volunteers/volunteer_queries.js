// SQL queries for the volunteers table ($1, $2, ... are placeholders for the values)

// Find a volunteer by its id
const getVolunteerbyId = "SELECT * FROM volunteers WHERE idvolunteer = $1";
// Insert a new volunteer
const postVolunteer = "INSERT INTO volunteers (idvolunteer, name, surname) VALUES ($1, $2, $3)"
// Update a volunteer's name and surname; RETURNING * gives back the already-updated row
const putVolunteer = "UPDATE volunteers SET name = $1, surname = $2 WHERE idvolunteer = $3 RETURNING *";
// Find the volunteers who wrote reports about a given mission:
// the JOIN links each volunteer to their reports (reports.volunteerid = volunteers.id)
// and the WHERE keeps only those related to the given mission
const getVolunteerbyMission = "SELECT * FROM volunteers JOIN reports ON reports.volunteerid = volunteers.idvolunteer WHERE reports.missionid = $1;";

module.exports = {
    getVolunteerbyId,
    postVolunteer,
    putVolunteer,
    getVolunteerbyMission
}
