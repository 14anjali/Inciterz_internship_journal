import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logoUploadDir = path.resolve(__dirname, "../../frontend/public");
if (!fs.existsSync(logoUploadDir)) {
  fs.mkdirSync(logoUploadDir, { recursive: true });
}

const MIME_EXT = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, logoUploadDir),
  filename: (req, file, cb) => {
    const rawType = String(req.body?.type || req.query?.type || "light").toLowerCase();
    const baseName = rawType === "dark" ? "logo-dark" : "logo-light";
    const ext = MIME_EXT[file.mimetype] || path.extname(file.originalname).toLowerCase() || ".webp";

    // Keep only one active file per logo type even if extension changes over time.
    const oldMatches = fs
      .readdirSync(logoUploadDir)
      .filter((name) => name.toLowerCase().startsWith(`${baseName}.`));
    /*
	for (const name of oldMatches) {
      try {
        fs.unlinkSync(path.join(logoUploadDir, name));
      } catch {
        // Best-effort cleanup; continue with upload.
      }
    }
	*/
	// The archival Process
	const changesDir = path.join(logoUploadDir, "changes");
	if (!fs.existsSync(changesDir)) {
	  fs.mkdirSync(changesDir, { recursive: true });
	}

	for (const name of oldMatches) {
	  try {
		const oldPath = path.join(logoUploadDir, name);
		const timestamp = Date.now();
		const ext = path.extname(name);
		const newName = `${baseName}-${timestamp}${ext}`; // e.g. logo-light-1709...png
		const newPath = path.join(changesDir, newName);
		
		fs.renameSync(oldPath, newPath); // Move instead of delete
	  } catch (err) {
		console.error("Error archiving old logo:", err);
		// Fallback to delete if move fails
		try { fs.unlinkSync(path.join(logoUploadDir, name)); } catch (e) {}
	  }
	}

    cb(null, `${baseName}${ext}`);
  },
});

function fileFilter(_req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
}

const logoUpload = multer({ storage, fileFilter });

export default logoUpload;
