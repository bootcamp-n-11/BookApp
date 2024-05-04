import { Router } from "express";
import {getAllBooks, getOneBooks ,appendBook } from "../controllers/book.controller.js";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id",getOneBooks)
router.post("/",appendBook)

export default router;
