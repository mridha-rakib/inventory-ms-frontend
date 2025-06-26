import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

const InventoryDashboard = () => {
  <main className="flex flex-1 flex-col py-4 md:pt-3">
    <div className="flex items-center justify-between space-y-2 mb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Workspace Overview
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview for this workspace!
        </p>
      </div>
      <Button onClick={onOpen}>
        <Plus />
        Add Product
      </Button>
    </div>
  </main>;
};
