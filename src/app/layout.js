import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "@/components/ThemeProvider";
import DarkBackground from "@/components/DarkBackground";
import InitialLoader from "@/components/InitialLoader";

export const metadata = {
  title: {
    default: "MediQuee",
    template: "MediQuee - %s",
  },
  description: "Tutor Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitialLoader />
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="relative z-10 flex-grow w-full">
              {children}
              <div className="fixed top-4 right-4 z-9999">
                <ToastContainer position="top-right" />
              </div>
              
            </main>
            <Footer />
            <DarkBackground />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
