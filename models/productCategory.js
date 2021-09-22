import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

const CategoryModel = mongoose.model('category', CategorySchema);

export default CategoryModel;
