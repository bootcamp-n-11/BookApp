import { Router } from "express";
import { getAllAuthors, createAuthor, editAuthorData } from "../controllers/author.controller.js";

const router = Router();

router.get("/", getAllAuthors);
router.put("/:id", editAuthorData)
router.post("/", createAuthor)

export default router;
