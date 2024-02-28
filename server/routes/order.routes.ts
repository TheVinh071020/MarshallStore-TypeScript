import express, { Request, Response } from "express";
import { getDate } from "../helpers";
import db from "../utils/db";
import { format } from "mysql2";
import { pagination } from "../middlewares/order.middleware";

const router = express.Router();

router.get("/", pagination, async (req: Request, res: Response) => {
  try {
    let [data] = await db.execute(`SELECT * FROM \`order\``);
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

router.get("/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    let sql = `SELECT od.order_id, od.email, od.order_name, od.phone,
                o.number, p.number as stock,
                p.name, p.price, p.sale, p.product_id FROM ?? as o 
                INNER JOIN ?? as od 
                ON o.order_id = od.order_id 
                INNER JOIN ?? as p 
                ON o.product_id = p.product_id
                WHERE o.order_id = ?`;

    let inserted = ["order_detail", "order", "product", id];
    sql = format(sql, inserted);
    console.log(sql);
    let result: any = await db.execute(sql);
    let row = result[0];
    res.json({
      row,
      message: "GET ALL ORDERS",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    let {
      name,
      user_id,
      email,
      phone,
      address,
      province,
      district,
      ward,
      cart,
    } = req.body;

    let sql = format(
      "INSERT INTO ?? (order_name, user_id, created_at, status, email, phone, address, province, district, ward) VALUE(?,?,?,?,?,?,?,?,?,?)",
      [
        "order",
        name,
        user_id,
        getDate(),
        "Chờ xác nhận",
        email,
        phone,
        address,
        province,
        district,
        ward,
      ]
    );
    let result: any = await db.execute(sql);

    let orderDetailSql = `INSERT INTO order_detail (number, order_id, product_id) VALUES`;
    let inserted: any[] = [];
    cart.forEach((element: any) => {
      orderDetailSql += ` (?, ?, ?),`;
      inserted.push(element.clickNumber);
      inserted.push(result[0].insertId);
      inserted.push(element.product_id);
    });
    let sqlQuery = orderDetailSql.slice(0, -1);

    sqlQuery = format(sqlQuery, inserted);

    let result2 = await db.execute(sqlQuery);
    res.status(201).json({
      message: "Đặt hàng thành công",
      orderId: result[0].insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  let { status } = req.body;
  try {
    let updateOrder = await db.execute(
      `UPDATE \`order\` SET status = ? WHERE order_id = ?`,
      [status, id]
    );
    res.json({
      message: "Update product success",
    });
  } catch (error) {
    res.json({
      messenge: "Update not success",
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM `order` WHERE order_id = ?", [id]);
    let data = await db.execute("SELECT * FROM `order`");
    let rows = data[0];
    let result2 = await db.execute(`SELECT COUNT(*) as count from \`order\``);
    let rows2: any = result2[0];
    res.json({
      message: "Đã delete order thành công",
      rows,
      length: rows2[0].count,
    });
  } catch (error) {
    res.json({
      message: "Delete not success",
    });
  }
});

export default router;
