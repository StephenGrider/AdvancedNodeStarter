const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const cleanHash = require('../middlewares/cleanHash');

const Team = mongoose.model('Team');

module.exports = app => {
    app.get('/api/teams', requireLogin, async (req, res) => {
        const teams = await Team
            .find({_user: req.user.id})
            .cache({key: req.user.id});
        console.log('/api/teams route');
        res.send(teams);    

    })
};