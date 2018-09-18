const kue = require('kue');
const redisConfig = require('../config/redis');

const queue = kue.createQueue({ redis: redisConfig });

function processReview(review, done) {
  console.log(`Sending email to ${review.email} about their review has been ${review.status}`);
  done();
}

queue.on('error', err => console.log('Oops... ', err))
  .process('notification', (message, done) => processReview(message.data, done));
