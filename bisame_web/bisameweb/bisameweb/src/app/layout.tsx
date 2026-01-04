import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import NotificationBar from "./components/Headers/NotificationBar";
import TopNav from "./components/Headers/TopNav";
import MiddleNav from "./components/Headers/MiddleNav";
import BottomNav from "./components/Headers/BottomNav";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import ConditionalNavigation from "./components/Layout/ConditionalNavigation";
import { SWRProvider } from "./api/auth/swrConfig";
import FormContext from "./components/Forms/Foods/context/FormContext";
import { AuthProvider } from "@/lib/context/AuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Bisame Web",
  description: "We connect your business to customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SpeedInsights />
          <NotificationBar />
          <ConditionalNavigation>
            <TopNav />
            <MiddleNav />
            <BottomNav />
          </ConditionalNavigation>
          <SWRProvider>{children}</SWRProvider>
          <Toaster position="top-right" />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import NotificationBar from "./components/Headers/NotificationBar";
// import TopNav from "./components/Headers/TopNav";
// import MiddleNav from "./components/Headers/MiddleNav";
// import BottomNav from "./components/Headers/BottomNav";
// import Footer from "./components/Footer/Footer";
// import { Toaster } from "react-hot-toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Bisame Web",
//   description: "We connect your business to customers",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <NotificationBar />
//         <TopNav />
//         <MiddleNav />
//         <BottomNav />
//         {children}
//         <Toaster position="top-right" />
//         <Footer />
//       </body>
//     </html>
//   );
// }
