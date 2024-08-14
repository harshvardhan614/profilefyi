
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const TestNav = () => {
    const { userId } = auth();
    return (
        <header className="bg-white shadow-md py-2">
            <div className="flex items-center w-full max-w-7xl justify-between px-4 py-2 text-md mx-auto z-50">
                {/* logo */}
                <Link href="/" className="cursor-pointer">
                    <Image src="/profileLogo.svg" alt=" logo" className="w-[100px] sm:w-[120px] rounded-full" width={70} height={70} />
                </Link>
                <ul className="flex items-center gap-4">
                    <div>
                        <Link href="/">
                            <li>Home</li>
                        </Link>
                    </div>
                    <div>
                        <Link href="/product">
                            <li>Product</li>
                        </Link>
                    </div>
                    <div>
                        <Link href="/cart">
                            <li>Cart</li>
                        </Link>
                    </div>
                    <div className="flex gap-6 items-center">
                        {!userId ? (
                            <>
                                <Link href="/sign-in">
                                    <li>Login</li>
                                </Link>
                                <Link href="/sign-up">
                                    <li>Sign Up</li>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/profile">
                                    <li>Profile</li>
                                </Link>
                                <li className="flex items-center">
                                    <UserButton />
                                </li>
                            </>
                        )}
                    </div>
                </ul>
            </div>
        </header>
    );
};

export default TestNav;