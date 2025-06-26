"use client";

import InvAnalytics from "@/components/inv-dashboard/inventory-analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  AlertTriangleIcon,
  Package,
  Plus,
  UserCheck,
  Users,
} from "lucide-react";

export default function Home() {
  const stats = [
    {
      title: "CUSTOMERS",
      value: "0",
      icon: Users,
      color: "border-l-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "EMPLOYEES",
      value: "3",
      icon: UserCheck,
      color: "border-l-green-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      title: "PRODUCT",
      value: "267",
      icon: Package,
      color: "border-l-cyan-500",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-500",
    },
    {
      title: "SUPPLIER",
      value: "4",
      icon: Users,
      color: "border-l-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "OUT OF STOCKED PRODUCT",
      value: "0",
      icon: AlertTriangleIcon,
      color: "border-l-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Inventory system overview
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s an overview for this IMS!
          </p>
        </div>
        <Button>
          <Plus />
          Add Product
        </Button>
      </div>
      <InvAnalytics />
      <div className="mt-4">
        <Tabs defaultValue="projects" className="w-full border rounded-lg p-2">
          <TabsList className="w-full justify-start border-0 bg-gray-50 px-1 h-12">
            <TabsTrigger className="py-2" value="products">
              Recent added product
            </TabsTrigger>
            <TabsTrigger className="py-2" value="employee">
              Recent added employee
            </TabsTrigger>
            <TabsTrigger className="py-2" value="supplier">
              Recent add supplier
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <p>Resent add product</p>
          </TabsContent>
          <TabsContent value="employee">
            <p>New employee</p>
          </TabsContent>
          <TabsContent value="supplier">
            <p>New supplier company</p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
