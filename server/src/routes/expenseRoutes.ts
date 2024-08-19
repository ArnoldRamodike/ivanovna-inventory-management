import { Router } from "express";
import { getExensesByCategory } from "../controllers/expenseController";

const router = Router();

router.get("/", getExensesByCategory);

export default router;