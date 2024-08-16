"use client";

import React from "react";
import CardPoularProducts from "./CardPopularProducts";
import CardSalesSummury from "./CardSalesSummury";
import CardPurchaseSummury from "./CardPurchaseSummury";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPoularProducts />
      <CardSalesSummury />
      <CardPurchaseSummury />
      <div className="row-span-3 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
    </div>
  );
};

export default Dashboard;
