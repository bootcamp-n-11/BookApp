import { Router } from "express";
import { getAllAuthors } from "../controllers/author.controller.js";

const router = Router();

router.get("/", getAllAuthors);

export default router;
