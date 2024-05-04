import { Router } from "express";
import { getAllAdmins,} from "../controllers/admin.controller.js";
import { getOneAdmin,} from "../controllers/admin.controller.js";
import { createAdmin} from "../controllers/admin.controller.js";
import {editAdmin} from "../controllers/admin.controller.js";
import {deleteAdmin} from "../controllers/admin.controller.js";





const router = Router();

router.get("/", getAllAdmins);
router.get("/:id", getOneAdmin);
router.post('/',createAdmin)
router.put("/:id", editAdmin);
router.delete("/:id", deleteAdmin);



export default router;
