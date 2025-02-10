import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kaboodle Events',
  description: 'Add and view events',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center min-h-screen`}
      >
        <nav className="flex items-center justify-center align-center p-4 space-x-8 bg-violet-400/80 fixed w-screen">
          <Link href="/" className="font-semibold uppercase">
            Create event
          </Link>
          <Link href="/events" className="font-semibold uppercase">
            See all events
          </Link>
        </nav>
        <main className="flex flex-col items-center mt-24 w-1/2">
          {children}
        </main>
      </body>
    </html>
  );
}
