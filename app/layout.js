import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import AuthProvider  from "../components/AuthProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feelmed | فیل مد",
  description: "Health and Entertaiment",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main >
          {children}
        </main>
        <Footer/>
        <ToastContainer/>
        </body>
    </html>
    </AuthProvider>
  );
}
