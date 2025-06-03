import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { Container, Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";
import AuthProvider from "./auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "An example app to deal with issues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <AuthProvider>
          <Theme accentColor="green" grayColor="sand" radius="large">
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
