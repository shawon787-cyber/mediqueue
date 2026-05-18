import "./globals.css";
import Navbar from "@/componenets/Navbar";
import Footer from "@/componenets/Footer";

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
        </main>
        <Footer />
      </body>
    </html>
  );
}