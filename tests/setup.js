jest.setTimeout(30000);

const keys = require('../config/keys');

const mongoose = require('mongoose');
require('../models/User');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });
