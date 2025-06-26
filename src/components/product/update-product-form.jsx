"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
} from "@/redux/slices/productsApiSlice";
import { useRef } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function UpdateProductForm({ onClose, productId }) {
  const fileInputRef = useRef(null);
  const [showExistingImage, setShowExistingImage] = useState(true);

  const [isPending, startTransition] = useTransition();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetProductDetailsQuery({
      productId,
    });

  const product = data?.data;

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      redirect("/");
    }
  }, [userInfo]);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name cannot be more than 100 characters")
      .trim(),

    description: z
      .string()
      .min(1, "Description is required")
      .max(1000, "Description cannot be more than 1000 characters")
      .trim(),

    price: z
      .number()
      .min(0, "Price cannot be negative")
      .transform((val) => Math.round(val * 100) / 100),

    category: z.string().min(1, "Category is required").trim(),

    image: z
      .instanceof(File)
      .optional()
      .refine((file) => {
        if (product?.image && !file) return true;
        if (!product?.image && !file) return false;
        return true;
      }, "Image is required")
      .refine((file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024;
      }, "File size must be less than 5MB")
      .refine((file) => {
        if (!file) return true;
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        );
      }, "Only JPEG, PNG, and WebP images are allowed"),

    stock: z
      .number()
      .int("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .default(0),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
      category: "",
      price: 0,
      stock: 0,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name || "",
        description: product.description || "",
        image: undefined,
        category: product.category || "",
        price: product.price || 0,
        stock: product.stock || 0,
      });

      if (!product.image && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [product, form]);

  const onSubmit = (values) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price.toString());
        formData.append("category", values.category);
        formData.append("stock", values.stock.toString());
        if (values.image instanceof File) {
          formData.append("image", values.image);
        }

        const result = await updateProduct({
          id: productId,
          formData,
        }).unwrap();

        toast.success("Product updated successfully!");
        form.reset();
        onClose();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to update product");
        console.log("Error updating product:", error);
      }
    });
  };

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Toys",
    "Food & Beverages",
    "Health & Beauty",
  ];

  if (isLoading) {
    return (
      <div className="w-full h-auto max-w-full">
        <div className="h-full flex items-center justify-center">
          <Loader className="animate-spin" />
          <span className="ml-2">Loading product data...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-auto max-w-full">
        <div className="h-full flex items-center justify-center">
          <p className="text-red-500">Error loading product data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 pb-2 border-b">
          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1
           text-center sm:text-left"
          >
            Update Product
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Organize and manage product, supllier, and other's things
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Product Name */}
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Product Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="product name..."
                        className="!h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* {Description} */}
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Task description
                      <span className="text-xs font-extralight ml-2">
                        Optional
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={1} placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Price */}
            <div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Price ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="!h-[48px]"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Category */}
            <div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="!h-[48px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Image URL */}
            {product?.image && showExistingImage && (
              <div className="mb-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Current Image:
                </p>
                <div className="relative inline-block">
                  <img
                    src={product.image}
                    alt="Current product"
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowExistingImage(false)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a new image to replace this one
                </p>
              </div>
            )}
            <div>
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Image
                      {!product?.image && (
                        <span className="text-red-500">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        className="!h-[48px]"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file || undefined);
                        }}
                        {...field}
                        value={undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Stock */}
            <div>
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Stock Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="0"
                        className="!h-[48px]"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="flex place-self-end  h-[40px] text-white font-semibold"
              type="submit"
              disabled={isPending || isUpdating}
            >
              {(isPending || isUpdating) && (
                <Loader className="animate-spin mr-2" />
              )}
              Update Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
