import { Router } from "express";
import { getAllAuthors } from "../controllers/admin.controller.js";

const router = Router();

router.get("/", getAllAuthors);

export default router;
