import express from 'express';

const connection = require('../conf');

const router = express.Router();

// Get all sales
router.get('/sales', (req, res) => {
  connection.query('select * from sales;', (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Add new sales
router.post('/sales', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO sales SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Modify sales
router.put('/sales/:id', (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connection.query('UPDATE sales SET ? WHERE id = ?', [formData, id], (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Delete sales
router.delete('/sales/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM sales WHERE id=${id}`, (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

export default router;
