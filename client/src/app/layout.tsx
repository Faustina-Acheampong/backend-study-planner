import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google';
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import Menu from "@/components/menu/Menu";
import Nav from "@/components/nav/Nav";

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
        <StoreProvider>
          <div
            className="grid grid-cols-1 md:grid-cols-8 xl:grid-cols-12 w-full gap-6 p-6"
          >
            <div
              className="col-span-1 md:col-span-3 xl:col-span-2"
            >
              <Menu />
            </div>
            <div
              className="col-span-1 md:col-span-5 xl:col-span-10"
            >
              <Nav />
              <div
                className="w-full flex flex-col gap-6 py-6"
              >
                {children}
              </div>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
};
