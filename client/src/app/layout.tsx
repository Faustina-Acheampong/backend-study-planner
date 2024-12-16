import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google';
import "./globals.css";
import ClientLayout from "./ClientLayout";

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Study Planner",
  description: "Backend course final group assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={dmSans.className}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};
