import "./globals.css";

import Sidebar from "../components/Sidebar/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Админ панель</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Sidebar content={children} />
      </body>
    </html>
  );
}
