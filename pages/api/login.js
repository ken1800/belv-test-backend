import connectDB from '../../middleware/mongodb';
import UserModel from '../../models/user';
const bcrypt = require('bcrypt');

import jwt from 'jsonwebtoken';

const SECRET = 'JDKSJDKSJDKSJDK';

export const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await UserModel.findOne({
          email,
        });

        if (user) {
          const passWordMatch = bcrypt.compareSync(password, user?.password);

          if (passWordMatch) {
            const encodeToken = jwt.sign({ user }, SECRET, {
              expiresIn: '1day',
            });
            res.status(200).send({
              token: encodeToken,
            });
          } else {
            res.status(422).send({
              authError: 'Wrong Password',
            });
          }
        } else {
          res.status(422).send({
            authError: 'User Not Found',
          });
        }
      } catch (error) {
        res.status(422).send({
          authError: 'User Not Found',
        });
      }
    }
  }
};

export default connectDB(handler);
