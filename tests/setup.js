//setTimeout
jest.setTimeout('600000')

require('../models/User')
//creating a general setup for jest, this must run any test suite
const mongoose = require('mongoose');
const keys = require('../config/keys');

//setting up a universal connect db from jest test functions

//converting regular mongoose promise to using global node Promise setup
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, { useMongoClient: true });