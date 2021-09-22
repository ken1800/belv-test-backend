import connectDB from '../../middleware/mongodb';
import Category from '../../models/productCategory';
import Product from '../../models/products';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const categories = await Category.find({}).populate({
        path: 'products',
        model: Product,
      });
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
