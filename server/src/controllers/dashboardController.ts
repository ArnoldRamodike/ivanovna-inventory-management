import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async( 
    req: Request, res: Response 
): Promise<void> => {
    try {
        const popularProducts = await prisma.products.findMany({
           take: 15,
           orderBy: {
            stockQuantity: 'desc'
           } 
        });

        const salesSummury = await prisma.salesSummary.findMany({
           take: 5,
           orderBy: {
            date: 'desc'
           } 
        });
        const purchaseSummury = await prisma.purchaseSummary.findMany({
           take: 5,
           orderBy: {
            date: 'desc'
           } 
        });
        const expenseSummury = await prisma.expenseSummary.findMany({
           take: 5,
           orderBy: {
            date: 'desc'
           } 
        });
        const expenseByCategorySummuryRaw = await prisma.expenseByCategory.findMany({
           take: 5,
           orderBy: {
            date: 'desc'
           } 
        });

        const expenseByCategory = expenseByCategorySummuryRaw.map(
            (item) => ({
                ...item,
                amount: item.amount.toString()
            })
        );

        res.json({
            popularProducts,
            salesSummury,
            purchaseSummury,
            expenseByCategory,
            expenseSummury,
        });
    } catch (error) {
        res.status(500).json({message: "Erro retrieving dashboard metrics"})
    }
}