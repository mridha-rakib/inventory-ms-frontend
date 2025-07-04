"use client";

import CreateProductDialog from "@/components/product/create-product-dialog";
import ProductTable from "@/components/product/product-table";
import React, { Suspense } from "react";

const ProductListContent = () => {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Products</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of products!
          </p>
        </div>
        <CreateProductDialog />
      </div>
      <div>
        <ProductTable />
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductListContent />
    </Suspense>
  );
};

export default page;
