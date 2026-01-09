import type { Metadata } from 'next';
import Script from 'next/script';
import ThemeRegistry from '../design-system/ThemeRegistry';
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="mui-color-scheme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var attribute = 'class';
                var colorSchemeStorageKey = 'mui-color-scheme';
                var defaultMode = 'system';
                var mode = defaultMode;
                try {
                  mode = localStorage.getItem(colorSchemeStorageKey) || defaultMode;
                } catch (e) {}
                var resolvedMode = mode;
                if (mode === 'system') {
                  resolvedMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                if (resolvedMode === 'dark') {
                  document.documentElement.setAttribute(attribute, 'dark');
                } else {
                  document.documentElement.setAttribute(attribute, 'light');
                }
              })();
            `,
          }}
        />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
