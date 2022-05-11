import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
// Create
router.post("/", createUser);

// });
// Update
router.put("/:id", verifyUser, updateUser);

// Delete
router.delete("/:id", verifyUser, deleteUser);

// Get
router.get("/find/:id", verifyUser, getUser);

// Get All
router.get("/", verifyAdmin, getUsers);

export default router;
