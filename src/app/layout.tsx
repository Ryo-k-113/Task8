
import type { Metadata } from 'next';
import "./globals.css";
import { Header } from "./_components/Header";

export const metadata: Metadata = {
  title: '8章:Next.js基礎',
  description: 'ReactアプリをTypeScriptへ置き換える'
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

