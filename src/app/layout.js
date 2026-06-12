import Script from "next/script";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/AuthProvider";
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
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    var mq = window.matchMedia('(prefers-color-scheme: dark)');
                    theme = mq.matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <InitialLoader />
        <AuthProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="relative z-10 flex-grow w-full">
                {children}
                <div className="fixed top-4 right-4 z-9999">
                  <ToastContainer position="bottom-right" />
                </div>
                
              </main>
              <Footer />
              <DarkBackground />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
