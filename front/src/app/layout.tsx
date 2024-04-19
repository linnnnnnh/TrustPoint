import React from "react";

import "./globals.css";
import { Poppins } from "next/font/google";
import Head from "next/head";

const roboto = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Trust Point",
  description: "Trust Point",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Trust Point</title>
        <meta name="description" content="Loyalty card" />
        <meta
          name="keywords"
          content="web, web3, loyalty, blockchain"
        />
        <meta property="og:title" content="Trust Point" />
        <meta property="og:description" content="Loyalty Card" />
        <meta
          property="og:image"
          content="URL de l'image pour le partage social"
        />
        <meta property="og:url" content="URL de votre page" />
      </Head>
     
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
