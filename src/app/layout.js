import { Toaster } from "react-hot-toast";
import "./globals.css";
import { UserProvider } from "../context/UserContext";

export const metadata = {
  title: "BCS CMS",
  description: "Credentialing Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="font-custom">
          <Toaster position="top-center" />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
