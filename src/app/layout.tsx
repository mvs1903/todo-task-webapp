import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import "./components.css";
import { TaskProvider } from "./context/TaskContext";

export const metadata: Metadata = {
  title: "Advanced To-Do App",
  description: "A feature-rich to-do application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
