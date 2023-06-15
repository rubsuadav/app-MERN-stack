import { Router } from "express";
import { getAllRoutes } from "../controllers/index.controller.js";

const router = Router();

router.get("/", getAllRoutes);

export default router;
