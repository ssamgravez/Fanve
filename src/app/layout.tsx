import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fanvue App",
  description: "Fanvue OAuth 2.0 integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
