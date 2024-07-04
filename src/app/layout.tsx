import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/Toast";
import { ThemeContextProvider } from "@/components/contexts/ThemeContext";
import { AuthContextProvider } from "@/components/contexts/AuthContext";
import Footer from "@/views/HomeView/elements/Footer";

const pjs = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blink",
  description: "Shorten your link.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <ThemeContextProvider>
          <body className={pjs.className}>
            {children}
          </body>
          <Toaster/>
        </ThemeContextProvider>
      </AuthContextProvider>
    </html>
  );
}
