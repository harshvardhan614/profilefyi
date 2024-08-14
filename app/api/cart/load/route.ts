// File: app/api/cart/load/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/db';
import { auth } from "@clerk/nextjs/server";
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: String,
  cart: []
});

const Cart = mongoose.model('Cart', cartSchema);

export async function GET(req: NextRequest) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }


    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
        return NextResponse.json({ cart: [] }, { status: 404 });
    }

    return NextResponse.json({ cart: userCart.cart });
}
