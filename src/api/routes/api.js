const express = require('express');
const Sequelize = require('sequelize');
const Kue = require('kue');

const models = require('../models');
const redisConfig = require('../../config/redis');

const router = express.Router();

const queue = Kue.createQueue({ redis: redisConfig });

router.post('/reviews', (req, res) => {
  models.review.create(req.body)
    .then((review) => {
      queue.create('review', review)
        .save((err) => {
          if (err) return console.error(err);// TODO add logger
          console.info('Job created')
        });
      res.status(200).json({
        success: true,
        reviewID: review.reviewID,
      });
    })
    .catch((err) => {
      if (err instanceof Sequelize.ForeignKeyConstraintError) {
        return res.status(404).json(err);
      }
      return res.status(500).json(err);
    });
});

module.exports = router;
