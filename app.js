const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


// setup db
const databaseConfig = require('./database/db');

mongoose.Promise = global.Promise;
mongoose
  .connect(databaseConfig.db, { useNewUrlParser: true })
  .then(() => console.warn('DB connected'))
  .catch(err => 'DB connection error: ' + err);


// setup express port
const todoRoute = require('./routes/todo.route');

const app = express();

const errorHandler = function(err, req, res, next) {
  if (res.headersSent) { return next(err); }
  res.status(500);
  res.render('error', { error: err });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/meanstack-material-test')));
app.use('/api', todoRoute);
app.use(errorHandler);


// create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.warn(`Connected to ${port} port`));


