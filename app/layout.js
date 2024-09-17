import { Inter } from "next/font/google";
import "./globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";
import { SessionProvider } from "next-auth/react";
import { dbConnect } from "../lib/mongo";

const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MealPrepping",
  description: "By Quang",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <SessionProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} className={inter.className}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
