const express = require('express');
const Sequelize = require('sequelize');
const models = require('../models');

const router = express.Router();

router.post('/reviews', (req, res) => {
  models.review.create(req.body)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      if (err instanceof Sequelize.ForeignKeyConstraintError) {
        return res.status(404).json(err);
      }
      return res.status(500).json(err);
    });
});

module.exports = router;
