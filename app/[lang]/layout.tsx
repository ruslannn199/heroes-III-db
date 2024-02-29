import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { cn } from '@/shared/lib';
import type { NextComponentType, NextPageContext } from 'next';
import { i18n } from '@/shared/locale/i18n-config';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Heroes III Database',
  description: 'База данных об игре Heroes III',
};

export const generateStaticParams = async () =>
  i18n.locales.map((locale) => ({ lang: locale }));

interface Props {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

const RootLayout: NextComponentType<NextPageContext, {}, Props> = ({
  children,
  params: { lang },
}: Props) => {
  return (
    <html lang={lang}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
