import { Router } from "express";
import bookRoutes from "./books.routes.js";

const router = Router();

router.use("/books", bookRoutes);

export default router;
