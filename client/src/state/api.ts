import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface Products {
    productId :    String     
    name  :        String
    price  :     number
    rating?  :    number
    stockQuantity: number
 
  }
  
  
  export interface SalesSummary {
    saleId :     String   
    productId:   String
    timestamp:   string
    quantity :   number
  }
  
  export interface PurchaseSummary {
    purchaseSummaryId: String   
    totalPurchased:  number
    changePercentagenumber?: number
    date:              string
  }
  
  export interface ExpenseSummary {
    expenseSummaryId:  String             
    totalExpenses:   number
    date      :        string
  }
  
  export interface ExpenseByCategorySummury {
    expenseByCategoryId :String       
    expenseSummaryId  :  String
    category           : String
    amount              : string
    date            :    string
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