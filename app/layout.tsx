import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading,
} from '@clerk/nextjs'
import {neobrutalism } from '@clerk/themes'
import Loader from "@/components/Loader";
import TestNav from "@/components/TestNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Shopping App",
  description: "Build an e-commerce shopping cart application using NextJS or SvelteKit. The application will feature a product listing page showcasing various products with details and an 'Add to Cart' functionality. Additionally, a dedicated cart page will allow users to manage items, including quantity adjustments, removal, and total price calculations with potential discounts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: [neobrutalism],
    }}>
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            <ClerkLoading>
              <Loader />
            </ClerkLoading>
            <ClerkLoaded>
              {/* <Navbar /> */}
              <TestNav/>
              {children}
            </ClerkLoaded>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
