import express from 'express';

const connection = require('../conf');

const router = express.Router();

// Get all circus shows
router.get('/circus-show', (req, res) => {
  connection.query('select * from circus_show;', (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Add new circus show
router.post('/circus-show', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO circus_show SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Modify circus show
router.put('/circus-show/:id', (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connection.query('UPDATE circus_show SET ? WHERE id = ?', [formData, id], (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Delete Circus Show
router.delete('/circus-show/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM circus_show WHERE id=${id}`, (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

export default router;
