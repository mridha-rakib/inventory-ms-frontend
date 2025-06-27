import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/reusable/confirm-dialog";
import { useDeleteProductMutation } from "@/redux/slices/productsApiSlice";
import { useState } from "react";
import { toast } from "sonner";
import UpdateProductDialog from "../update-product-dialog";
import { useSelector } from "react-redux";
import PermissionsGuard from "@/components/reusable/permissions-guard";

export function DataTableRowActions({ row }) {
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo?.isAdmin || false;

  const productId = row.original._id;
  const productName = row.original.name || row.original.title || "this product";

  const handleConfirm = async () => {
    try {
      const result = await deleteProduct({ id: productId }).unwrap();

      toast.success(result.message || "Product deleted successfully");

      setTimeout(() => setOpenDialog(false), 100);
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.message || "Failed to delete product");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <PermissionsGuard requiredPermission="user">
            <DropdownMenuItem
              className={`!text-destructive cursor-pointer`}
              onClick={() => setOpenUpdateDialog(true)}
            >
              Update product
              <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
            </DropdownMenuItem>
          </PermissionsGuard>
          <PermissionsGuard requiredPermission="admin">
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className={`!text-destructive cursor-pointer`}
              onClick={() => setOpenDialog(true)}
            >
              Delete Product
              <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </PermissionsGuard>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateProductDialog
        productId={productId}
        isOpen={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
      />

      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={isDeleting}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        title="Delete Product"
        description={`Are you sure you want to delete ${productName}`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
