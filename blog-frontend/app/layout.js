import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Blog",
  description: "My blog website built with Next.js and Strapi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}