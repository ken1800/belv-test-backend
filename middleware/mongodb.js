import mongoose from 'mongoose';

import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
});

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const connectDB = (handler) => async (req, res) => {
  await runMiddleware(req, res, cors);

  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.mongodburl);
  return handler(req, res);
};

export default connectDB;
