import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { TokenAuthProvider } from './components/TokenAuthProvider'
import { FirebaseAuthProvider } from './components/FirebaseAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mage Duel Admin Panel',
  description: 'Administration panel for Mage Duel blockchain game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <FirebaseAuthProvider>
            <TokenAuthProvider>
              <main className="min-h-screen bg-background">
                {children}
              </main>
            </TokenAuthProvider>
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}