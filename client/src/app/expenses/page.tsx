"use client";

import {
  ExpenseByCategorySummury,
  useGetExpensesByCategoryQuery,
} from "@/state/api";
import React, { useMemo, useState } from "react";
import Header from "../(components)/Header";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};
type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const {
    data: expensesData,
    isError,
    isLoading,
  } = useGetExpensesByCategoryQuery();
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummury) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummury) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0 };
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    <div className="text-center text-red-500">
      Failed to fetch Expenses by Category
    </div>;
  }

  const ClassNames = {
    label: "block text-sm font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  };
  return (
    <div className="">
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          {" "}
          Visual represantatioon of expense over time.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Categoy and Date
          </h3>
          <div className="space-y-4">
            <div className="">
              <label htmlFor="category" className={ClassNames.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={ClassNames.selectInput}
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="">Office</option>
                <option value="">Professional</option>
                <option value="">Salaries</option>
              </select>
            </div>
            {/* Start Date */}
            <div className="">
              <label htmlFor="start-date" className={ClassNames.label}>
                Start Date
              </label>
              <input
                name="start-date"
                id="start-date"
                type="date"
                className={ClassNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/*  End Date */}
            <div className="">
              <label htmlFor="end-date" className={ClassNames.label}>
                End Date
              </label>
              <input
                name="end-date"
                id="end-date"
                type="date"
                className={ClassNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Chart */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width={"100%"} height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map((entry: AggregatedData, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === activeIndex ? "rgb(29, 78, 216" : entry.color
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
