import { Router } from "express";
import { getAllBooks, getOneBooks } from "../controllers/book.controller.js";

const router = Router();

router.get("/books", getAllBooks);
router.get("/books/:id",getOneBooks)

export default router;
