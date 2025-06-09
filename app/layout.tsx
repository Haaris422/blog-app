import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import { Girassol } from "next/font/google";
import localFont from "next/font/local";


export const girassol = Girassol({
  subsets: ["latin"],
  variable: "--font-girassol",
  weight: "400",
  display: "swap",
});

export const typewriter = localFont({
  src:'../public/fonts/typewriter.ttf',
  variable: '--font-typewriter'
})

export const metadata: Metadata = {
  title: "Kanoon.com",
  description: "Daily articles on the most relevant news around Indian Legal world. Join our newsletter to stay updated and ready for whatever may come.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={`${girassol.variable} ${typewriter.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
