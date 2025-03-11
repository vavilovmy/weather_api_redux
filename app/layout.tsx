import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "github vavilovmy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="ru">
      <body className={`${inter.variable} white`}>
        <div className="container">
       
        {children}
        
        </div>
      </body>
    </html>
  );
}
