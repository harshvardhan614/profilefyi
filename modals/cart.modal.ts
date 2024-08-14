import { Schema, model, models } from 'mongoose';

const CartItemSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  cart: [CartItemSchema], 
});

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;
