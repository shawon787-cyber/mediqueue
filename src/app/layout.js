import "./globals.css";
import Navbar from "@/componenets/Navbar";
import Footer from "@/componenets/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "MediQueue",
  description: "Tutor Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow w-full">
          {children}
          <ToastContainer position="top-right" />
        </main>
        <Footer />
      </body>
    </html>
  );
}