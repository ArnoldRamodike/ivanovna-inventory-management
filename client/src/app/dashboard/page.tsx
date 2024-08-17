"use client";

import React from "react";
import CardPoularProducts from "./CardPopularProducts";
import CardSalesSummury from "./CardSalesSummury";
import CardPurchaseSummury from "./CardPurchaseSummury";
import CardExpenseSummury from "./CardExpenseSummury";
import StatCard from "./StatCard";
import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPoularProducts />
      <CardSalesSummury />
      <CardPurchaseSummury />
      <CardExpenseSummury />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 size-6" />}
        dateRange="22 -29 october 2024"
        details={[
          {
            title: "Customer Growth",
            amount: 175.0,
            changePercentage: 151,
            IconComponent: TrendingUp,
          },
          {
            title: "Customer Expenses",
            amount: 10.0,
            changePercentage: -561,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Pending Orders"
        primaryIcon={<Tag className="text-blue-600 size-6" />}
        dateRange="22 -29 october 2024"
        details={[
          {
            title: "Delivered",
            amount: 175.0,
            changePercentage: 151,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending",
            amount: 10.0,
            changePercentage: -561,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Sales & Discounts"
        primaryIcon={<CheckCircle className="text-blue-600 size-6" />}
        dateRange="22 -29 october 2024"
        details={[
          {
            title: "Sales",
            amount: 175.0,
            changePercentage: 151,
            IconComponent: TrendingUp,
          },
          {
            title: "Discounts",
            amount: 10.0,
            changePercentage: -561,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;
