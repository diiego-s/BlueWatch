const getVolunteerbyId = "SELECT * FROM volunteers WHERE id = $1";
const postVolunteer = "INSERT INTO volunteers (id, name, surname) VALUES ($1, $2, $3)"

module.exports = {
    getVolunteerbyId,
    postVolunteer
}