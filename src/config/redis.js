module.exports = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || 'localhost',
};
