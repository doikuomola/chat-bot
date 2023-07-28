import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI generated chatbot',
  description: 'A ai chatbot app generated with nextjs and open api',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="h-full text-white">{children}</main>
      </body>
    </html>
  );
}
