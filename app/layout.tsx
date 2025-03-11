import type { Metadata } from "next";
import { ReactNode } from "react";
import localfont from "next/font/local";
import "./globals.css";

const ibmPlexSans = localfont( {
  src : [
    { path : "./fonts/IBMPlexSans-Regular.ttf", weight: '400', style : 'normal'},
    { path : "./fonts/IBMPlexSans-Medium.ttf", weight: '500', style : 'normal'},
    { path : "./fonts/IBMPlexSans-SemiBold.ttf", weight: '600', style : 'normal'},
    { path : "./fonts/IBMPlexSans-Bold.ttf", weight: '700', style : 'normal'},
  ]
})

const bebasNeue = localfont({
  src: [
    { path : "./fonts/BebasNeue-Regular.ttf", weight: '400', style : 'normal'}
  ],
  variable : "--bebas-neue",
})

export const metadata: Metadata = {
  title: "Bookwise",
  description: "Bookwise is a book borrowing university library management solution",
};

const RootLayout = ({children,}: {children: ReactNode;}) => {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
export default RootLayout;
