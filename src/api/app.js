const express = require('express');
const path = require('path');

const apiRouter = require('./routes/api');
const models = require('./models');

const PORT = +(process.env.PORT || '3000');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

// catch 404
app.use((_, res) => res.sendStatus(404));

models.sequelize.sync().then(function() {
  app.listen(PORT, () => console.info(`API is running on ${PORT} port`));
});

