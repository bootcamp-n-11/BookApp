import { Router } from "express";
import { getAllAuthors, getOneAuthor, delOneAuthor} from "../controllers/author.controller.js";

const router = Router();

router.get("/", getAllAuthors);
router.get("/:id", getOneAuthor);
router.delete("/:id", delOneAuthor);

export default router;
