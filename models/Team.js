const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    teamName: String,
    coachName: String,
    createdAt: {type: Date, default: Date.Now},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}

});

mongoose.model('Team', teamSchema);