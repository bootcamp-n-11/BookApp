import { Router } from "express";
import { getAllBooks } from "../controllers/book.controller.js";
import { editBook } from "../controllers/book.controller.js";
import { deleteBook } from "../controllers/book.controller.js";

const router = Router();

router.get("/", getAllBooks);
router.put('/:id',editBook);
router.delete('/:id',deleteBook)
// add commit

export default router;
