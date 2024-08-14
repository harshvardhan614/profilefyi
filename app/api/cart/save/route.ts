import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/db';
import { auth } from "@clerk/nextjs/server";
import Cart from '@/modals/cart.modal';


export async function POST(req: NextRequest) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const db = await connect();

    const { cart } = await req.json();

    const updatedCart = await Cart.findOneAndUpdate(
        { userId },
        { cart },
        { new: true, upsert: true }
      );

    return NextResponse.json({ message: 'Cart saved' });
}
