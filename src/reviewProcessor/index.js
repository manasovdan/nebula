const kue = require('kue');
const redisConfig = require('../config/redis');
const badWords = require('./badWords');

const badWordsFilter = new RegExp(`\\b(${badWords.join('|')})\\b`, 'gi');

const queue = kue.createQueue({ redis: redisConfig });


function containsBadWords(message) {
  return message.search(badWordsFilter) > -1;
}

function processReview(review, done) {
  if (containsBadWords(review.review)) {
    return console.info('bad review');
  }
  console.info('passed review');
  return done();
}

queue.on('error', err => console.log('Oops... ', err))
  .process('review', (review, done) => processReview(review.data, done));
