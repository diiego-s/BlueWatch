const express = require('express');

const app = express();
const port = 3000;

const pool = require('./db.js');

const reportRoutes = require('./src/reports/report_routes.js');
const missionRoutes = require('./src/missions/mission_routes.js');

app.use(express.json());
app.use('/reports', reportRoutes);
app.use('/missions', missionRoutes);

app.get('/hello', (req, res) => {
    res.status(200).json({message: "hello, server activated!"});
});

/*// Endpoint di test per recuperare le missioni
app.get('/missions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.missions');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore durante la query al database' });
  }
});*/



app.listen(port, () => console.log(`app listening on port ${port}!`));