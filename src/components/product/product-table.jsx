"use client";

import useProductTableFilter from "@/hooks/use-product-table";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getColumns } from "./table/columns";
import { DataTable } from "./table/table";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useProductTableFilter();

  const columns = getColumns();

  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) =>
        value !== null &&
        value !== "" &&
        value !== undefined &&
        value !== "null" &&
        String(value).trim() !== ""
    )
  );

  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetProductsQuery({
      filters: cleanFilters,
      pageNumber,
      pageSize,
    });
  // data.products
  const products = data?.data?.products || [];
  const paginationData = data?.data?.pagination;
  const totalCount = paginationData?.totalCount || 0;

  console.log("Hit Products: ", products);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPageNumber(1);
  };

  console.log("Filters:", filters);
  console.log("Clean Filters:", cleanFilters);
  console.log("API Response:", data);
  console.log("Products:", products);

  return (
    <div className="w-full relative">
      <DataTable
        isLoading={isLoading}
        data={products}
        columns={columns}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
        filtersToolbar={
          <DataTableFilterToolbar
            isLoading={isLoading}
            filters={filters}
            setFilters={setFilters}
          />
        }
      />
    </div>
  );
};

const DataTableFilterToolbar = ({ isLoading, filters, setFilters }) => {
  const hasActiveFilters = Object.values(filters).some(
    (value) =>
      value !== null &&
      value !== "" &&
      value !== undefined &&
      value !== "null" &&
      String(value).trim() !== ""
  );

  return (
    <div className="flex flex-col lg:flex-row w-full items-start space-y-2 mb-2 lg:mb-0 lg:space-x-2  lg:space-y-0">
      <Input
        placeholder="Filter products..."
        value={filters.keyword || ""}
        onChange={(e) =>
          setFilters({
            keyword: e.target.value,
          })
        }
        className="h-8 w-full lg:w-[250px]"
      />

      {hasActiveFilters && (
        <Button
          disabled={isLoading}
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() =>
            setFilters({
              keyword: null,
              status: null,
              priority: null,
              projectId: null,
              assigneeId: null,
            })
          }
        >
          Reset
          <X />
        </Button>
      )}
    </div>
  );
};

export default ProductTable;
