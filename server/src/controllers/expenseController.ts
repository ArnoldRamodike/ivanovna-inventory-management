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

        res.json(expenseByCategorySummury);
    } catch (error) {
        res.status(500).json({ message: "Error retieving Expenses by Category" })
    }
}