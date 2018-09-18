const kue = require('kue');
const redisConfig = require('../config/redis');
const badWords = require('./badWords');
const dbModels = require('../models');

const badWordsFilter = new RegExp(`\\b(${badWords.join('|')})\\b`, 'gi');

const queue = kue.createQueue({ redis: redisConfig });


function containsBadWords(message) {
  return message.search(badWordsFilter) > -1;
}

function processReview(review, done) {
  let status = 'published';
  if (containsBadWords(review.review)) {
    status = 'archived';
  }
  dbModels.review.update({ status }, { where: { reviewID: review.reviewID } })
    .then(() => {
      queue.create('notification', {
        email: review.email,
        status,
      })
        .save((err) => {
          if (err) console.error(err);// TODO add logger
          done();
        });
    });
}

queue.on('error', err => console.log('Oops... ', err))
  .process('review', (review, done) => processReview(review.data, done));
