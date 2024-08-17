import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface Products {
    productId :    String     
    name  :        String
    price  :     number
    rating?  :    number
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
    expenseSummaryId:  String;             
    totalExpenses:   number;
    date: string;
  }
  
  export interface ExpenseByCategorySummury {
    expenseByCategoryId :String  ;     
    category           : String;
    amount              : string;
    date            :    string;
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
    tagTypes: ["DashboardMetrics"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"]
        })
    }),
});

export const {useGetDashboardMetricsQuery} = api