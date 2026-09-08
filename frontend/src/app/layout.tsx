import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suman B.K. — Software Engineer",
  description:
    "Software Engineer specialising in React.js, Next.js and TypeScript, with 3+ years of hands-on experience shipping production features.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Nepal"],
  openGraph: {
    title: "Suman B.K. — Software Engineer",
    description:
      "Software Engineer specialising in React.js, Next.js,TypeScript and Node.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
