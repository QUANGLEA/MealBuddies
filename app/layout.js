import { Inter } from "next/font/google";
import "./globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";

import { dbConnect } from "../lib/mongo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MealPrepping",
  description: "By Quang",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
