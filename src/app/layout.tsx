import AdSense from '@/third-parties/AdSense';
import { GoogleAnalytics } from '@next/third-parties/google'
import { GA_MEASUREMENT_ID } from './gtag';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth/auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '닉네임.AI - 애니 닉네임 생성기',
  description: '인공지능을 통해 내 게임 캐릭터에 딱 어울리는 고유하고 창의적인 닉네임을 생성해보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-brand-neutral-100 text-brand-neutral-900 transition-colors duration-200`}
      >
    <AdSense />
  {/* Google Analytics */}
  <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        <Providers>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
