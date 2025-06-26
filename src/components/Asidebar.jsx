"use client";
import { useSelector } from "react-redux";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Settings,
  Star,
  Users,
  BarChart3,
  User,
  Package,
  List,
  Boxes,
  PackageX,
  InfoIcon,
  User2,
  Users2,
  Truck,
  FileBarChart,
  Building2,
  EllipsisIcon,
  LogOut,
  Loader,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import LogoutDialog from "./logout-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

const menuItems = [
  {
    title: "Product",
    icon: Package,
    subItems: [
      {
        title: "Product List",
        url: "/product-list",
        icon: List,
      },
      {
        title: "Inventory",
        url: "/inventory-list",
        icon: Boxes,
      },
      {
        title: "Out of stock",
        icon: PackageX,
      },
    ],
  },
  {
    title: "Info",
    icon: InfoIcon,
    subItems: [
      {
        title: "Customer",
        icon: User2,
      },
      {
        title: "Employee",
        url: "/user-list",
        icon: Users2,
      },
      {
        title: "Supplier",
        icon: Truck,
      },
    ],
  },
  {
    title: "Orders",
    icon: InfoIcon,
    subItems: [],
  },
  {
    title: "Report",
    icon: FileBarChart,
    subItems: [
      {
        title: "Sales Report",
        icon: FileBarChart,
      },
      {
        title: "Inventory Report",
        icon: FileBarChart,
      },
      {
        title: "Out of stocked product",
        icon: FileBarChart,
      },
    ],
  },
];

export function ASidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useSidebar();

  const { userInfo, isLoading } = useSelector((state) => state.auth);

  const user = userInfo?.data?.user;

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="!pt-0 dark:bg-background mt-5 ml-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Logo />
              </div>
              {open && (
                <Link href="/home">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Inventory</span>
                    <span className="truncate text-xs text-muted-foreground">
                      System
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="dark:bg-background">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.title === "product"}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  {subItem.icon && <subItem.icon />}
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="dark:bg-background">
          <SidebarMenu>
            <SidebarMenuItem>
              {isLoading ? (
                <Loader
                  size="24px"
                  className="place-self-center self-center animate-spin"
                />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={user?.profilePicture || ""} />
                        <AvatarFallback className="rounded-full border border-gray-500">
                          {user?.name?.split(" ")?.[0]?.charAt(0)}
                          {user?.name?.split(" ")?.[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                      <EllipsisIcon className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side={"bottom"}
                    align="start"
                    sideOffset={4}
                  >
                    <DropdownMenuGroup></DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
