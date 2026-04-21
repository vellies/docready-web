import "./globals.css";

export const metadata = {
  title: "DocReady -  Document Formatter",
  description: "Upload, process, and download government-ready documents in seconds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
