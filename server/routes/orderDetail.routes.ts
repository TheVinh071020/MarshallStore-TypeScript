import express from "express";
import db from "../utils/db";
import { Request, Response } from "express";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await db.execute(
      `SELECT DISTINCT od.order_id, od.email, od.order_name, od.phone,
          o.number, p.number as stock,
          p.name, p.price, p.sale, p.product_id,
          m.*
          FROM order_detail as o
          INNER JOIN \`order\` as od ON o.order_id = od.order_id
          INNER JOIN product as p ON o.product_id = p.product_id
          INNER JOIN media as m ON p.product_id = m.product_id
          WHERE o.order_id = ?`,
      [id]
    );
    let rows = data[0];
    res.json({
      mesage: "Get one success",
      rows,
    });
  } catch (error) {
    res.json({
      mesage: error,
    });
  }
});

export default router;
