import connectDB from '../../middleware/mongodb';
import UserModel from '../../models/user';
const bcrypt = require('bcrypt');

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, password } = req.body;

    if (name && email && password) {
      const hashesPasword = bcrypt.hashSync(password, salt);

      try {
        const User = new UserModel({
          name,
          email,
          password: hashesPasword,
        });

        const newUser = await User.save();

        return res.status(200).send(newUser);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send('data_incomplete');
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
