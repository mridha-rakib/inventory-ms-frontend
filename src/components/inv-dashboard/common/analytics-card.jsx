import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Tag, Loader } from "lucide-react";

export const AnalyticsCard = ({ title, value, isLoading }) => {
  return (
    <Card className="shadow-none w-full border-l-blue-500">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
        <Tag strokeWidth={2.5} className="h-4 w-4  text-muted-foreground" />
      </CardHeader>
      <CardContent className="w-full">
        <div className="text-3xl font-bold">
          {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : value}
        </div>
      </CardContent>
    </Card>
  );
};
