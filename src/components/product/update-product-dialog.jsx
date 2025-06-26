import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import UpdateProductForm from "./update-product-form";

const UpdateProductDialog = ({ productId, isOpen, onOpenChange }) => {
  const onClose = () => {
    onOpenChange(false);
  };

  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6">
              <UpdateProductForm onClose={onClose} productId={productId} />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProductDialog;
