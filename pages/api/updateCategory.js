import connectDB from '../../middleware/mongodb';
import Category from '../../models/productCategory';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name } = req.body;
    if (id && name) {
      try {
        const updatedCategory = await Category.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            name: name,
          }
        ).exec();

        return res.status(200).send(updatedCategory);
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
