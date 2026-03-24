import express from "express";
import {
  addSpecies,
  editSpecies,
  deleteSpecies,
  getSpeciesManagement,
  searchSpeciesManagement
} from "../controllers/manageSpecies.controller.js";
import { protectRoute, supportOrAdminRoute} from "../middleware/auth.middleware.js";
import speciesUpload from "../middleware/species_upload.middleware.js";
import { addPlant, updatePlant, deletePlant } from "../controllers/managePlants.controller.js";

const router = express.Router();

// Upload species image
router.post(
  "/species-management/upload-image",
  protectRoute,
  supportOrAdminRoute,
  speciesUpload.single("image"),
  (req, res) => {
    try {
		console.log("Upload request received");
      if (!req.file) {
		  console.log("No file received by multer");
        return res.status(400).json({ error: "No image file provided" });
      }
      
	   console.log("File saved to:", req.file.path);
      const imageUrl = `${req.protocol}://${req.get("host")}/api/public/species/images/${req.file.filename}`;
	  console.log("Generated URL:", imageUrl);
      
      return res.status(200).json({ 
        message: "Image uploaded successfully", 
        imageUrl 
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Failed to upload image" });
    }
  }
);

// Get all species for management
router.get(
  "/species-management",
  protectRoute,
  supportOrAdminRoute,
  getSpeciesManagement
);


// Add a new species
router.post(
  "/species-management/new",
  protectRoute,
  supportOrAdminRoute,
  addSpecies
);



// Edit species by ID
router.put(
  "/species-management/:fish_id",
  protectRoute,
  supportOrAdminRoute,
  editSpecies
);


// Delete species by ID
router.delete(
  "/species-management/:fish_id",
  protectRoute,
  supportOrAdminRoute,
  deleteSpecies
);

// Search species
router.get(
  "/species/search",
  protectRoute,
  supportOrAdminRoute,
  searchSpeciesManagement
);

// Aquatic Plants Management Routes
router.post(
  "/aquatic-plants/new", 
  protectRoute, 
  supportOrAdminRoute, 
  addPlant
);

router.put(
  "/aquatic-plants/:id", 
  protectRoute, 
  supportOrAdminRoute, 
  updatePlant
);

// Added Delete for Plants to support the speciesApi.deleteSpecies method
router.delete(
  "/aquatic-plants/:id", 
  protectRoute, 
  supportOrAdminRoute, 
  // You'll need to export deletePlant from managePlants.controller.js
  deletePlant 
);

export default router;
