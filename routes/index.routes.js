import { Router } from "express";
import bookRoutes from "./books.routes.js";
import authorsRoutes from "./authors.routes.js";
import adminsRoutes from "./admins.routes.js";

const router = Router();

router.use("/books", bookRoutes);
router.use("/author", authorsRoutes);
router.use("/admin", adminsRoutes);

export default router;
