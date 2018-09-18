const express = require('express');

const router = express.Router();

/* GET home page. */
router.post('/reviews', (req, res, next) => {
  res.status(200).json({ test: 'success' });
});

module.exports = router;
