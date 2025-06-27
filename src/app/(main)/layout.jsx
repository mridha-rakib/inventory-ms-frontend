"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ASidebar } from "@/components/Asidebar";
import Header from "@/components/Header";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function layout({ children }) {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      redirect("/");
    }
  }, [userInfo]);

  return (
    <SidebarProvider>
      <ASidebar />
      <SidebarInset>
        <main>
          <Header />
          <NuqsAdapter>
            <div className="p-3">{children}</div>
          </NuqsAdapter>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
