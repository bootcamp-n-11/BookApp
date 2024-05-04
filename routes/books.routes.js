import { Router } from "express";
import { getAllBooks } from "../controllers/book.controller.js";

const router = Router();

router.get("/", getAllBooks);
// add commit

export default router;
