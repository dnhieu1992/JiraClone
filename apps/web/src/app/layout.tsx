import '../styles/colors.css';
import '../components/layout/sidebar/sidebar.scss';
import './globals.css';
import type { Metadata } from 'next';
import MuiThemeProvider from '../theme/MuiThemeProvider';

export const metadata: Metadata = {
  title: 'Jira Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg text">
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </body>
    </html>
  );
}
