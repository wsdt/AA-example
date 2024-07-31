import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import Providers from "wavect/app/Providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Biconomy AA",
    description: "Account Abstraction minimal example",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <Providers>
                {children}
            </Providers>
        </body>
        </html>
    );
}
