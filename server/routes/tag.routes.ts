import express, { Request, Response } from "express";
import db from "../utils/db";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const [result] = await db.execute("SELECT * FROM tag");
    const rows: any[] = result as any[];
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const tagId = req.params.id;
  try {
    const [rows]: any = await db.execute("SELECT * FROM tag WHERE tag_id = ?", [
      tagId,
    ]);

    if (rows.length === 0) {
      res.status(404).json({
        message: "Không tìm thấy tag với ID đã cho",
      });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi truy vấn dữ liệu" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    let { wattage, frequency, size, weight } = req.body;
    let data = await db.execute(
      `INSERT INTO tag (wattage, frequency, size, weight) VALUE(?, ?, ?, ?)`,
      [wattage, frequency, size, weight]
    );
    res.json({
      message: "Add new tag",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { wattage, frequency, size, weight } = req.body;
  try {
    let result = await db.execute(
      "UPDATE tag SET wattage = ?, frequency = ?, size = ?, weight = ? WHERE tag_id = ?",
      [wattage, frequency, size, weight, id]
    );
    console.log(result);
    res.status(200).json({
      status: "Success",
      message: "Update Product",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
