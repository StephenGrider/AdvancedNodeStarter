const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${uuid()}.${req.query.type.replace('image/', '')}`;

    const url = s3.getSignedUrl('putObject', {
      Bucket: keys.s3Bucket,
      Key: key,
      ACL: 'public-read',
      ContentType: 'multipart/form-data'
    });

    res.send({ key, url });
  });
};
