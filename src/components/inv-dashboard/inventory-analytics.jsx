"use client";

import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";
import { AnalyticsCard } from "./common/analytics-card";
import { useGetTotalUserQuery } from "@/redux/slices/usersApiSlice";

const InvAnalytics = () => {
  const filters = "";
  const pageNumber = undefined;
  const pageSize = 10;
  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetProductsQuery({
      filters,
      pageNumber,
      pageSize,
    });

  const totalCount = data?.data?.pagination?.totalCount || 0;

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <AnalyticsCard
        isLoading={isLoading}
        title="Total product"
        value={totalCount}
      />
      <AnalyticsCard isLoading={isLoading} title="Employees" value={13} />
      <AnalyticsCard isLoading={isLoading} title="Supplier" value={20} />
      <AnalyticsCard
        isLoading={isLoading}
        title="Out of stocked product"
        value={3}
      />
      <AnalyticsCard isLoading={isLoading} title="Customer" value={130} />
    </div>
  );
};

export default InvAnalytics;
