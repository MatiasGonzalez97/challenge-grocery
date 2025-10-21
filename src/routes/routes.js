import { Router } from "express";
import {route as userController} from "../controllers/userController.js";
import {route as itemsController} from "../controllers/itemsController.js"; 
const router = Router();


router.use('/',userController);
router.use('/',itemsController);

export default router;