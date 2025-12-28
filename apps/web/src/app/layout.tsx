import type { Metadata } from 'next';
import Providers from '../theme/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jira Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
