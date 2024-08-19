import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Products {
  productId: String
  name: String
  price: number
  rating?: number
  stockQuantity: number

}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: String;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummury {
  expenseByCategoryId: String;
  category: String;
  amount: string;
  date: string;
}

export interface User{
  userId: string;
  name: string;
  email: string;
}

export interface DashboardMetrics {
  popularProducts: Products[];
  salesSummury: SalesSummary[];
  expenceSummury: ExpenseSummary[];
  expenceByCategorySummury: ExpenseByCategorySummury[];
  purchaseSummury: PurchaseSummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"]
    }),
    getProducts: build.query<Products[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {}
      }),
      providesTags: ["Products"]
    }),
    createProduct: build.mutation<Products, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct
      }),
      invalidatesTags: ["Products"]
    }),
    getUsers: build.query<User[], string | void>({
      query: () => "/users",
      providesTags: ["Users"]
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummury[], string | void>({
      query: () => "/expenses",
      providesTags: ["Expenses"]
    }),
  }),
});

export const { 
  useGetDashboardMetricsQuery, useGetProductsQuery, 
  useCreateProductMutation, useGetUsersQuery, 
  useGetExpensesByCategoryQuery } = api