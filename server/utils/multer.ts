import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
//validate

export const upload = multer({
    storage: multer.memoryStorage(),
});
