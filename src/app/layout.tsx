import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import QueryProvider from "@/components/queryProvider";
import AuthSessionProvider from "@/components/sessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextDash — Админ-панель",
  description: "Административная панель на Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
         (function() {
             try {
               var theme = localStorage.getItem('theme');
                    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
      })();
    `,
          }}
        />
      </head>
      <body className="h-screen ">
        <QueryProvider>
          <ThemeProvider>
            <AuthSessionProvider>{children}</AuthSessionProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
