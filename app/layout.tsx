import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import { Toaster } from './components/toast/Toaster';
import './globals.css';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang='en'>
      <body className={font.className}>
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser}/>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
