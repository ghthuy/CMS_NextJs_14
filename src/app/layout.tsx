import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/antd.registry';
import Header from '@/components/header';
import AppProvider from './app-provider';
import '@/styles/global.scss';
import 'normalize.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CMS NextJs 14',
  description: 'CMS NextJs 14',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
