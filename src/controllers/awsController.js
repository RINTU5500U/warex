const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: 'AKIA6ODU6FHPDANNE46Q',
    secretAccessKey: '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',
    region: 'ap-south-1'
})

const s3 = new AWS.S3();

const uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        const uploadParams = {
            Bucket: `warex-project`,
            Key: file.originalname,
            Body: file.buffer
        };
        s3.upload(uploadParams, function (err, data) {
            if (err) return reject({ error: err });
            return resolve(data.Location);
        });
    });
};

module.exports = { uploadFile }
