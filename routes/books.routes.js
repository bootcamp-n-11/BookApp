import { Router } from "express";
import { appendBook, getAllBooks, getOneBooks } from "../controllers/book.controller.js";

const router = Router();

router.get("/books", getAllBooks);
router.get("/books/:id",getOneBooks)
router.post("/books",appendBook)

export default router;
