import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { getPosts } from "@/lib/hashnode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aerawat Engineering - Technology and Programming Blog",
  description: "Discover cutting-edge technology articles, programming tutorials, and engineering insights.",
  openGraph: {
    title: "Aerawat Engineering - Technology and Programming Blog",
    description: "Discover cutting-edge technology articles, programming tutorials, and engineering insights.",
    url: "https://aerawat.com", // Replace with actual domain
    siteName: "Aerawat Engineering",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerawat Engineering - Technology and Programming Blog",
    description: "Discover cutting-edge technology articles, programming tutorials, and engineering insights.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getPosts();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <ReadingProgressBar />
          <Navbar posts={posts} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
