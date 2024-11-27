import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});
const ibmMono = IBM_Plex_Mono({
    subsets: ['latin'],
    variable: '--font-ibm-mono',
    weight: ['100', '200', '300', '400', '500']
});

export const metadata: Metadata = {
    title: 'Terminal Port',
    description: 'My terminal styled portfolio',
    icons: './favicon.ico'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${ibmMono.variable} font-geist-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
