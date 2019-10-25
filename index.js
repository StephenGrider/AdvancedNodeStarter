const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const chalk = require('chalk')

require('./models/User');
require('./models/Blog');
require('./services/passport');
require('./services/cache')

// database connection
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, function (err, client) {
  if (err) console.log(err);
  console.log(chalk.red('Connection passed'));
})

let db = mongoose.connection;

db.once('open', () => console.log(chalk.green('Connected to database')));

// checks if connection to db is a success
db.on('error', console.error.bind(console, 'Database connection error:'));

mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
