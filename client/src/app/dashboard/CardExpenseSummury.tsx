import {
  ExpenseByCategorySummury,
  useGetDashboardMetricsQuery,
} from "@/state/api";
import { TrendingUp } from "lucide-react";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type ExpenseSums = {
  [category: string]: number;
};
const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const CardExpenseSummury = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const expenseSummary = dashboardMetrics?.expenceSummury;

  const expenseByCategorySummury =
    dashboardMetrics?.expenceByCategorySummury || [];

  const expenseSums = expenseByCategorySummury.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummury) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  console.log("initial", expenseByCategorySummury);
  console.log("formatted", expenseSummary);

  const expenseCategries = Object.entries(expenseSums).map(([name, value]) => ({
    name,
    value,
  }));

  const totalExpenses = expenseCategries.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );

  const formattedTotalExpenses = totalExpenses.toFixed(2);

  return (
    <div className="row-span-3 bg-white rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* Header */}
          <div className="">
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summury
            </h2>
            <hr />
          </div>
          {/* Body */}
          <div className="xl:flex justify-between pr-7">
            {/* Cahrt */}
            <div className="relative basis-3/5">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={expenseCategries}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategries.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5 ">
                <span className="font-bold text-xl">
                  {formattedTotalExpenses}
                </span>
              </div>
            </div>
            {/* Lalels */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {expenseCategries.map((entry, index) => (
                <li
                  key={`legend=${index}`}
                  className="flex items-center text-xs"
                >
                  <span
                    className=" mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
          {/* Footer */}
          <div className="">
            <hr />
            {expenseSummary && (
              <div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  <p className="text-xs">
                    Avarage:{" "}
                    <span className="font-semibold">
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-gray-500" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummury;
