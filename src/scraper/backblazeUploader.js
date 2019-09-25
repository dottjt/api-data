const B2 = require('backblaze-b2');

const b2 = new B2({
  applicationKeyId: process.env.BACKBLAZE_B2_KEY_ID, // or accountId: 'accountId'
  applicationKey: process.env.BACKBLAZE_B2_KEY, // or masterApplicationKey
});

const getBucket = async () => {
  try {
    await b2.authorize(); // must authorize first
    let response = await b2.getBucket({ bucketName: 'my-bucket' });
    console.log(response.data);
  } catch (err) {
    console.log('Error getting bucket:', err);
  }
}

const uploadImage = () => {

};

module.exports = {
  getBucket,
  uploadImage,
}
