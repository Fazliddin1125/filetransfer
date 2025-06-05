import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-option";
import { redirect } from "next/navigation";
import ClientWrapper from "./ClientWrapper"; // Yangi yaratilgan komponentni import qiling
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "File transfer",
  description: "File",
  generator: "File",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  // // Agar sessiya bo‘lmasa yoki currentUser._id mavjud bo‘lmasa, login sahifasiga yo‘naltirish
  // if (!session || !session.currentUser?._id) {
  //   redirect("/login");
  // }

  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
        <Toaster/>
      </body>
    </html>
  );
}