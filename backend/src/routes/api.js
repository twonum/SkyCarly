import { Router } from "express";
import userRoutes from "./user.route.js";
import adminRoutes from "./admin.route.js";
import authRoutes from "./auth.route.js";
import songRoutes from "./song.route.js";
import albumRoutes from "./album.route.js";
import statRoutes from "./stat.route.js";

const router = Router();

// Attach routes
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);
router.use("/songs", songRoutes);
router.use("/albums", albumRoutes);
router.use("/stats", statRoutes);

export default router; 
