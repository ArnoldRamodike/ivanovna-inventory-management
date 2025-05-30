import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.products.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        })

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: "Error retriving products" })
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params;
        const product = await prisma.products.findFirst({
            where: {
                productId: id
            }
        });
        if (!product) {
            res.status(401).json({message: `Could not find product with id: ${id}`});
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: "Error retriving products" })
    }
}


export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, rating, stockQuantity } = req.body;

        const product = await prisma.products.create({
            data: {
                name,
                price,
                rating,
                stockQuantity
            }
        });

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: "Error creating products" })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
         const {id} = req.params;
         const { name, price, rating, stockQuantity } = req.body;
         
         const product = await prisma.products.findUnique({
            where:{
                productId: id
            }
         });

        if (!product) {
            res.status(404).json({message: `Could not find product with id: ${id}`})
        }

        const updateProduct = await prisma.products.update({
            where: {
                productId: product?.productId
            },
            data:{
                name,
                price,
                rating,
            }
        });

        res.status(201).json(updateProduct)
    } catch (error) {
        res.status(500).json({ message: "Error creating products" })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const product = await prisma.products.delete({
            where: {
                productId: id
            }
        });
        if (!product) {
            res.status(401).json({message: `Could not find product with id: ${id}`});
        }

        res.status(200).json({ message: "Product deleted successfully." });

    } catch (error) {
        res.status(500).json({ message: "Error deleting product." })
    }
}