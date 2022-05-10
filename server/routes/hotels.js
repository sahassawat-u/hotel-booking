import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/", verifyUser, createHotel);

// Update
router.put("/:id", verifyUser, updateHotel);

// Delete
router.delete("/:id", verifyUser, deleteHotel);

// Get
router.get("/find/:id", verifyUser, getHotel);

// Get All
router.get("/", verifyAdmin, getHotels);

export default router;
