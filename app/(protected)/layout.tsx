import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AuthProvider } from "@/providers/AuthProvider";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children : ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center bg-card gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-2">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  )
}
