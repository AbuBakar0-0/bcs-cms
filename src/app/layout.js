import "./globals.css";

export const metadata = {
  title: "BCS CMS",
  description: "Credentialing Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-custom">{children}</body>
    </html>
  );
}
