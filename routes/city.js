import express from 'express';

const connection = require('../conf');

const router = express.Router();

// Get all cities
router.get('/city', (req, res) => {
  connection.query('select * from city;', (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Add new city
router.post('/city', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO city SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Modify city
router.put('/city/:id', (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connection.query('UPDATE city SET ? WHERE id = ?', [formData, id], (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Delete Circus Show
router.delete('/city/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM city WHERE id=${id}`, (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

export default router;
