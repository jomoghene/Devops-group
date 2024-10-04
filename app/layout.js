// 'use client';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import Home from './page';
// const inter = Inter({ subsets: ['latin'] });
// import 'leaflet/dist/leaflet.css';
// import '../styles/globals.css';
import Navbar from '../components/Navbar/Navbar';
// import Footer from '../components/Navbar/Footer';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('../components/Navbar/Footer'), {
  ssr: false, // Disable SSR for this component
});

export const metadata = {
  title: 'Poli Online Shop',
  description: 'An Online Shop Made with NextJS',
  // viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='Inter'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='icon'
          href='/icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
        <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
          crossOrigin=''
        />
        <script
          src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
          crossOrigin=''
        ></script>
        {/* <meta name='viewport' content='width=device-width, initial-scale=1.0' /> */}
      </head>
      <body>
        <Providers>
          <div>
            <header>
              <Navbar></Navbar>
            </header>
            <main className='bg-gray-100'>{children}</main>
            <footer>
              <Footer></Footer>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
