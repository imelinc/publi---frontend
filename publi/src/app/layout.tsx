import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
