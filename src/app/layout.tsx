import type { Metadata } from "next";
import { Inter, Volkhov, Poppins } from "next/font/google"; // Import new fonts
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Configure fonts
const inter = Inter({ subsets: ["latin"] });
const volkhov = Volkhov({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-volkhov'
});
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "TripPlanner - Planeje sua próxima aventura",
  description: "Planejamento de viagens premium e simplificado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${volkhov.variable} ${poppins.variable}`}>
        <div className="layout-wrapper">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
