import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { getPosts, getPublication } from "@/lib/hashnode";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const publication = await getPublication();
  const title = publication?.displayTitle || publication?.title || 'Tech Blog';
  const description = publication?.descriptionSEO || 'Discover cutting-edge technology articles, programming tutorials, and engineering insights.';

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: publication?.url || "https://hashnode.com",
      siteName: title,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [posts, publication] = await Promise.all([
    getPosts(),
    getPublication()
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <ReadingProgressBar />
          <Navbar posts={posts} publication={publication} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer publication={publication} />
        </ThemeProvider>
      </body>
    </html>
  );
}
