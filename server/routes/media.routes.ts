import express, { Request, Response } from "express";
import db from "../utils/db";
import { upload } from "../utils/multer";
import uploadToCloudinary from "../utils/cloudinary";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "GET ALL MEDIA",
  });
});

router.post(
  "/",
  upload.array("image", 6),
  async (req: Request, res: Response) => {
    try {
      const pictureFiles: any = req.files;

      const result = pictureFiles?.map((picture: any) =>
        uploadToCloudinary(picture as any)
      );

      const imageRespone = await Promise.all(result);

      const imageList: any = imageRespone.reduce((acc: any, item: any) => {
        return acc.concat([item.url]);
      }, []);

      return res.status(201).json({
        imageList: imageList,
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
);

router.post(
  "/one",
  upload.array("image", 1),
  async (req: Request, res: Response) => {
    try {
      const pictureFiles: any = req.files;

      const result = pictureFiles?.map((picture: any) =>
        uploadToCloudinary(picture as any)
      );

      const imageRespone = await Promise.all(result);

      const imageList: any = imageRespone.reduce((acc: any, item: any) => {
        return acc.concat([item.url]);
      }, []);

      return res.status(201).json({
        imageList: imageList,
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
);

router.patch(
  "/:media_id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { media_id } = req.params;
      const { source } = req.body;

      if (req.file) {
        // Nếu có tệp hình ảnh được tải lên
        const picture = req.file;

        // Tải ảnh lên Cloudinary
        const imageResponse = await uploadToCloudinary(picture);

        // Lấy URL của ảnh từ Cloudinary
        const imageUrl = imageResponse.url;

        // Cập nhật URL ảnh trong cơ sở dữ liệu
        const updateMediaQuery = `UPDATE media SET source = ? WHERE media_id = ?`;
        await db.execute(updateMediaQuery, [imageUrl, media_id]);
      }

      res.status(200).json({ message: "Media updated successfully" });
    } catch (error) {
      console.error("Error updating media:", error);
      res.status(500).json({
        error,
        message: "Failed to update media",
      });
    }
  }
);

// router.patch("/:media_id", async (req: Request, res: Response) => {
//     try {
//         const { media_id } = req.params;
//         const { source } = req.body;

//         const updateMediaQuery = `UPDATE media SET source = ? WHERE media_id = ?`;

//         await db.execute(updateMediaQuery, [source, media_id]);

//         res.status(200).json({ message: "Media updated successfully" });
//     } catch (error) {
//         console.error("Error updating media:", error);
//         res.status(500).json({
//             error,
//             message: "Failed to update media",
//         });
//     }
// });

export default router;
