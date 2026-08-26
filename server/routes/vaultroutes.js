import express from "express"

import { createVaultItem,
  getVaultItems,
  getVaultItem,
  updateVaultItem,
  deleteVaultItem,} from "../controllers/vaultcontroller.js";


import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

// Add password
router.post("/", protect, createVaultItem);

// Get all passwords
router.get("/", protect, getVaultItems);

// Get one password
router.get("/:id", protect, getVaultItem);

// Update password
router.put("/:id", protect, updateVaultItem);

// Delete password
router.delete("/:id", protect, deleteVaultItem);

export default router;

