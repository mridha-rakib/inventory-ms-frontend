import { apiSlice } from "./apiSlice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ filters = {}, pageNumber = 1, pageSize = 10 }) => {
        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(
            ([key, value]) =>
              value !== null &&
              value !== "" &&
              value !== undefined &&
              value !== "null"
          )
        );

        return {
          url: `${API_BASE_URL}/products`,
          params: {
            ...cleanFilters,
            pageNumber,
            pageSize,
          },
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProductDetails: builder.query({
      query: ({ productId }) => ({
        url: `${API_BASE_URL}/products/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${API_BASE_URL}/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${API_BASE_URL}/products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
        { type: "Product", id: "LIST" },
      ],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `${API_BASE_URL}/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
