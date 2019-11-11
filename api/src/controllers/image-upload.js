
import uuid from 'node-uuid'
import { s3 } from '../aws'
import { badRequest, success } from "../response"

export const uploadImage = (req, res) => {

  const key = uuid() + req.file.originalname;
  const { AWS_BUCKET } = process.env

  const params = {
    Bucket: AWS_BUCKET,
    Body: req.file.buffer,
    Key: key
  };

  const uploadPromise = s3.upload(params).promise();

  uploadPromise.then((data) => {
    success(res, { fileName: key, uploaded: true, url: data.Location });
  }).catch(err => {
    badRequest(res)
  });

}
