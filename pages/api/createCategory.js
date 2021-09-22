import connectDB from '../../middleware/mongodb';
import Category from '../../models/productCategory';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (name) {
      try {
        const category = new Category({
          name,
        });
        const newCatgeory = await category.save();
        return res.status(200).send(newCatgeory);
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
