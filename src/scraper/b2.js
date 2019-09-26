const B2 = require('backblaze-b2');
const request = require('request');

// reddit-pokeml bucket id 2cf9e1356fe464b063d40d1a

const b2 = new B2({
  applicationKeyId: process.env.BACKBLAZE_B2_KEY_ID, // or accountId: 'accountId'
  applicationKey: process.env.BACKBLAZE_B2_KEY, // or masterApplicationKey
});

const getBucket = async (b2, bucketName) => {
  try {
    await b2.authorize(); // must authorize first
    let response = await b2.getBucket({ bucketName });
    return response.data;
  } catch (err) {
    console.log('Error getting bucket:', err);
  }
}

const uploadImage = async (b2, fileUrl) => {
  try {
    await b2.authorize();

    const options = {
      url: fileUrl,
      method: "get",
      encoding: null,
    };

    request(options, async function (error, response, body) {
      if (error) {
        console.error('error:', error);
      } else {
        await b2.uploadFile({
          // uploadAuthToken: response.data.authorizationToken,
          fileName: fileUrl,
          data: body,
        });
      }
  });
  } catch (error) {
    throw new Error(`uploadImage - ${error} - will not upload.`);
  }
};

module.exports = {
  b2,
  getBucket,
  uploadImage,
}

