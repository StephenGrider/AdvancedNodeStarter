const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const EXTENSIONS = {
  'image/gif': 'gif',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.${EXTENSIONS[req.query.type]}`;

    const url = s3.getSignedUrl('putObject', {
      Bucket: keys.s3Bucket,
      Key: key,
      ContentType: req.query.type
    });

    res.send({ key, url });
  });
};
