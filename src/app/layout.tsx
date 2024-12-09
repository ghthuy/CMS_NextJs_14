import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/antd.registry';
import Header from '@/components/header';
import Aside from '@/components/aside';
import AppProvider from './app-provider';
import '@/styles/global.scss';
import 'normalize.css';
import { cookies } from 'next/headers'

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
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;
  console.log("sessionToken", sessionToken);
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AppProvider>
            {sessionToken && <Header />}
            <main>
              {
                sessionToken && <Aside />
              }
              <section id="content">
                {children}
              </section>
            </main>
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
