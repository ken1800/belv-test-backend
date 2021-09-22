import connectDB from '../../middleware/mongodb';
import Product from '../../models/products';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { id, ...otherFields } = req.body;

    if (id) {
      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            ...otherFields,
          }
        ).exec();

        return res.status(200).send(updatedProduct);
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
