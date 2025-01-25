import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./(service)/store/Provider";
import Navbar from "./(platform)/_components/Navbar";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kendal Property",
  description: "Kendal Property",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCYiHl9TFomp9Xl7aLNktl6X4vWfEohmlk&libraries=places`}
          async
          defer
        ></script>
      </head>
      <body className={`antialiased ${poppins.className}`}>
        <Navbar />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
