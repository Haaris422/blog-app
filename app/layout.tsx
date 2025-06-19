import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import { Girassol } from "next/font/google";
import localFont from "next/font/local";
import { createClient } from "@/lib/supabase/server";


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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },error
  } = await supabase.auth.getUser();
    let profile = null;

  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    profile = data;
  }

  return (
    <html lang="en">
      <body
      className={`relative ${girassol.variable} ${typewriter.variable} antialiased`}
      >
        <Navbar user={profile}/>
        {children}
      </body>
    </html>
  );
}
