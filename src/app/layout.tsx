import type { Metadata } from "next";
import { 
  Poppins, 
  Inter, 
  Roboto, 
  Nunito, 
  Open_Sans, 
  Lato, 
  Merriweather, 
  Lexend 
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EduPal — Learn • Grow • Achieve",
  description: "AI-powered CBC curriculum learning platform for secondary school students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${poppins.variable} 
        ${inter.variable} 
        ${roboto.variable} 
        ${nunito.variable} 
        ${openSans.variable} 
        ${lato.variable} 
        ${merriweather.variable} 
        ${lexend.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col bg-background text-text-default">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
