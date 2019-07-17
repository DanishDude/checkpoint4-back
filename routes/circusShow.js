import express from 'express';

const connection = require('../conf');

const router = express.Router();

// Get all circus shows.
router.get('/circus-show', (req, res) => {
  connection.query('SELECT * FROM circus_show;', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Get all circus shows with location.
router.get('/circus-show-full', (req, res) => {
  connection.query(`
  SELECT circus_show.id as id,
  city.name as city,
  date,
  capacity,
  price,
  city.venue as venue
  FROM circus_show
  JOIN city
  ON city.id = city_id;
  `, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// Add new circus show
router.post('/circus-show', (req, res) => {
  const formData = req.body;
  console.log(formData);
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

// Get all upcoming shows - NEEDS FIXING!
router.get('/upcoming-circus-show', (req, res) => {
  let today = new Date();
  console.log(today.toString().split('').splice(0, 10).join(''));
  const currentTime = new Date();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  today = `${year}/${month}/${day}`;
  console.log(today.toString());
  connection.query(`select * from circus_show
  WHERE date >= ${today.toString()};
  `, (err, results) => {
    if (err) {
      res.status(500).send('Ah Snap :-/');
    } else {
      res.json(results);
    }
  });
});

// 2019-07-17T07:37:15.671Z

export default router;
