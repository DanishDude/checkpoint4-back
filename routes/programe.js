import express from 'express';

const connection = require('../conf');

const router = express.Router();

// Get all programes
router.get('/programe', (req, res) => {
  connection.query('select * from programe;', (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Add new programe
router.post('/programe', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO programe SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Modify programe
router.put('/programe/:id', (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connection.query('UPDATE programe SET ? WHERE id = ?', [formData, id], (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Delete programe
router.delete('/programe/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM programe WHERE id=${id}`, (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

export default router;

