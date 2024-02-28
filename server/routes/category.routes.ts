import express, { Request, Response } from "express";
import db from "../utils/db";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result1: any = await db.execute(
      `SELECT DISTINCT c.*, p.product_id, m.*
        FROM category AS c
        LEFT JOIN product AS p ON c.category_id = p.category_id
        LEFT JOIN media AS m ON p.product_id = m.product_id
        ORDER BY c.category_id, p.product_id`
    );
    let result2 = await db.execute("SELECT * FROM category");
    const [rows1] = result1;
    const [rows2] = result2;
    res.status(200).json({ rows1, rows2 });
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let [data] = await db.execute(`SELECT * FROM \`order\`  WHERE user_id=?;`, [
      id,
    ]);
    res.json({
      mesage: "Get one success",
      data,
    });
  } catch (error) {
    res.json({
      mesage: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, description, banner } = req.body;
    let [data] = await db.execute(
      `INSERT INTO category (name, description, banner) VALUES (?, ?, ?)`,
      [name, description, banner]
    );
    res.json({
      mesage: "Create category success",
    });
  } catch (error) {
    res.json({
      mesage: error,
    });
  }
});

export default router;
