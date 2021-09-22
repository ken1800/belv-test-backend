import connectDB from '../../middleware/mongodb';
import CategoryModel from '../../models/productCategory';
import Product from '../../models/products';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, quantity, price, category } = req.body;

    if (name && quantity && price && category) {
      try {
        const product = new Product({
          name,
          quantity,
          price,
          category,
        });
        const newProduct = await product.save();

        // Update the CategoryModel with the data
        if (newProduct) {
          CategoryModel.findByIdAndUpdate(
            {
              _id: category,
            },
            {
              $addToSet: {
                products: newProduct._id,
              },
            }
          ).exec();
        }

        return res.status(200).send(newProduct);
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
