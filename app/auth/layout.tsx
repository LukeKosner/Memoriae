import Footer from "@/components/footer.tsx";
import Header from "@/components/header.tsx";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-grow flex-col max-h-[100vh] bg-[url('/dome.jpg')]">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center">
        {children}
      </main>
      <div className="p-3">
        <Footer isChat={false} />
      </div>
    </div>
  );
}
