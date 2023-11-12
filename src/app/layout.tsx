"use client";
import "./globals.css";

import Sidebar from "../components/Sidebar/Sidebar";
import { store } from "@/store/store";
import { Provider } from "react-redux";

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
        <Provider store={store}>
          <Sidebar content={children} />
        </Provider>
      </body>
    </html>
  );
}
