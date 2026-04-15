import mongoose, { Document, Model, Types } from "mongoose";

export interface IOrder extends Document {
  status:   "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";
 orderItems: { product: Types.ObjectId;  amount: number, price: number }[];
 customerId: Types.ObjectId;

}

const orderSchema = new mongoose.Schema<IOrder>(
  {
   status: {
    type: String,
    enum: ["preparing", "out_for_delivery", "delivered", "cancelled"],
    default: "preparing",
   },
   orderItems: [
    {
     product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
     },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    }
   ],
   customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
   },
  },
  {
   timestamps: true,
  },
);

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Order;