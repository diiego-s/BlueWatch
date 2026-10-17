const getVolunteerbyId = "SELECT * FROM volunteers WHERE id = $1";
const postVolunteer = "INSERT INTO volunteers (id, name, surname) VALUES ($1, $2, $3)"
const putVolunteer = "UPDATE volunteers SET name = $1, surname = $2 WHERE id = $3 RETURNING *";

module.exports = {
    getVolunteerbyId,
    postVolunteer,
    putVolunteer
}