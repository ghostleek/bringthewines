import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './api/providers'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Bring the Wines',
  description: 'Alpha version',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
       {/* centre the div and set max width */}
      <div className="max-w-3xl mx-auto p-4">
      <Navbar />
      <div className="mt-4">{children}</div>
      </div>
      </NextAuthProvider>
      </body>
    </html>
  )
}
