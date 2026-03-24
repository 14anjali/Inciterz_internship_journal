import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure directory exists
const uploadDir = path.join(process.cwd(), "public/species/images");
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/species/images/")
    },
    filename: function(req, file, cb){
        // Sanitize filename or use timestamp to avoid conflicts
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});

function fileFilter(req, file, cb){
    // Allow images and webp explicitly if needed, though webp usually has image/webp mimetype
    if(file.mimetype.startsWith("image/") || file.mimetype === 'application/octet-stream'){
        cb(null, true);
    }
    else{
         console.log("Rejected file type:", file.mimetype);
        cb(new Error(`Only images are allowed. Got ${file.mimetype}`), false);
    }
}

const speciesUpload = multer({
    storage, 
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export default speciesUpload;
