import mongoose, { Document, Model, Types } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  image?: string;
  menu: Types.ObjectId;
}

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    maxlength: [100, "title must be less than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
  },
  image: {
    type: String,
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: [true, "Please provide a menu"],
  },
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema,
);

export default Product;
