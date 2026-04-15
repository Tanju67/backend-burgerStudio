import mongoose, { Document, Model } from "mongoose";

export interface IMenu extends Document {
  title: string;
  image: string;
}

const menuSchema = new mongoose.Schema<IMenu>({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    maxlength: [100, "title must be less than 100 characters"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image"],
  },
});

const Menu: Model<IMenu> = mongoose.model<IMenu>("Menu", menuSchema);

export default Menu;
