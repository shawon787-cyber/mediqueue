import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "@/components/ThemeProvider";
import DarkBackground from "@/components/DarkBackground";

export const metadata = {
  title: "MediQueue",
  description: "Tutor Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="relative z-10 flex-grow w-full">
              {children}
              <ToastContainer position="top-right" style={{ zIndex: 9999 }} />
            </main>
            <Footer />
            <DarkBackground />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
