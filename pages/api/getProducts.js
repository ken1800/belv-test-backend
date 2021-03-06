import connectDB from '../../middleware/mongodb';
import CategoryModel from '../../models/productCategory';
import Products from '../../models/products';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const products = await Products.find({})
        .populate({
          path: 'category',
          model: CategoryModel,
        })
        .exec();
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
