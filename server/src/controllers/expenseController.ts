import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getExensesByCategory = async (req: Request, res: Response) => {
    try {
        const expensesByCategoryRaw = await prisma.expenseByCategory.findMany({
            orderBy: {
                date: "desc"
            }
        });

        const expenseByCategorySummury = expensesByCategoryRaw.map(
            (item) => ({
                ...item,
                amount: item.amount.toString()
            })
        );

        res.status(200).json(expenseByCategorySummury);
    } catch (error) {
        res.status(500).json({ message: "Error retieving Expenses by Category" })
    }
}

export const createExpense = async (req: Request, res: Response) => {
    try {
        const { amount, category, expenseId } = req.body;

        const product = await prisma.expenses.create({
            data: {
                amount,
                category,
                timestamp: Date.now().toString(),
                expenseId
            }
        });

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: "Error creating Expense" })
    }
}