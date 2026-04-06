import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastStoreProvider } from "@/components/ui/use-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "publi",
  description: "Gestión unificada de redes sociales para Community Managers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} scroll-smooth`}>
      <body className="antialiased font-sans">
        <ToastStoreProvider>
          {children}
          <Toaster />
        </ToastStoreProvider>
      </body>
    </html>
  );
}
