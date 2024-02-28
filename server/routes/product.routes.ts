import express, { Request, Response } from "express";
import db from "../utils/db";
import { upload } from "../utils/multer";
import uploadToCloudinary from "../utils/cloudinary";
import {
  filterByCategory,
  pagination,
} from "../middlewares/product.middlewares";

const router = express.Router();

router.get(
  "/",
  filterByCategory,
  pagination,
  async (req: Request, res: Response) => {
    try {
      let result: any = await db.execute(
        `SELECT p.*, c.description,
            SUBSTRING_INDEX(GROUP_CONCAT(m.source ORDER BY m.media_id ASC), ',', 1) AS media_source
            FROM product AS p
            INNER JOIN category AS c ON c.category_id = p.category_id
            LEFT JOIN media AS m ON p.product_id = m.product_id
            GROUP BY p.product_id `
      );

      let [rows] = result;
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({
        error,
      });
      console.log(error);
    }
  }
);

router.get("/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    let result: any = await db.execute(
      `SELECT p.*, m.source, m.media_id, c.description, c.banner, t.wattage, t.frequency, t.size, t.weight, t.tag_id
            FROM product AS p
            INNER JOIN media AS m ON p.product_id = m.product_id
            INNER JOIN category AS c ON p.category_id = c.category_id
            LEFT JOIN tag_product AS tp ON p.product_id = tp.product_id
            LEFT JOIN tag AS t ON tp.tag_id = t.tag_id
            WHERE p.product_id = ?`,
      [id]
    );
    let [rows] = result;

    if (rows.length === 0) {
      let result2: any = await db.execute(
        `SELECT p.*, c.description
        FROM product as p
        inner join category as c on p.category_id = c.category_id
        WHERE p.product_id = ?`,
        [id]
      );
      let [rows2] = result2;
      res.status(200).json(rows2[0]);
    } else {
      let sources: any = [];
      let product = rows.reduce((pre: any, cur: any) => {
        sources.push({ url: cur.source, media_id: cur.media_id });
        return { ...cur, sources: [...sources] };
      }, {});
      delete product.source;
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      number,
      price,
      sale,
      category_id,
      wattage,
      frequency,
      size,
      weight,
      source,
    } = req.body;

    const productInsertResult = await db.execute(
      `INSERT INTO product (name, number, price, sale, category_id) VALUES (?, ?, ?, ?, ?)`,
      [name, number, price, sale, category_id]
    );
    console.log("productInsertResult", productInsertResult);

    const productId = (productInsertResult[0] as any).insertId;

    if (Array.isArray(source) && source.length > 0) {
      for (const sourceItem of source) {
        const mediaInsertResult = await db.execute(
          "INSERT INTO media (product_id, source) VALUES (?, ?)",
          [productId, sourceItem]
        );
        console.log("mediaInsertResult", mediaInsertResult);
      }
    }

    const tagInsertResult = await db.execute(
      `INSERT INTO tag (wattage, frequency, size, weight) VALUES (?, ?, ?, ?)`,
      [wattage, frequency, size, weight]
    );

    const tagId = (tagInsertResult[0] as any).insertId;

    const tagProductInsertResult = await db.execute(
      `INSERT INTO tag_product (tag_id, product_id) VALUES (?, ?)`,
      [tagId, productId]
    );

    res.json({
      message: "Add new product, media, tag, and tag-product relationship",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  let { name, price, stock, sale, category_id, sources } = req.body;
  try {
    await db.execute(
      `UPDATE product SET name = ?, price = ?, number = ?, sale = ?, category_id = ?  WHERE product_id = ?`,
      [name, price, stock, sale, category_id, id]
    );

    if (Array.isArray(sources) && sources.length > 0) {
      for (const sourceItem of sources) {
        const mediaId = sourceItem.media_id;
        const newUrl = sourceItem.url;

        const mediaUpdateResult = await db.execute(
          "UPDATE media SET source = ? WHERE media_id = ?",
          [newUrl, mediaId]
        );
      }
    }

    res.status(200).json({
      status: "Success",
      message: "Update Product",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id/media/:mediaId", async (req: Request, res: Response) => {
  let { id, mediaId } = req.params;
  let result = await db.execute(
    "UPDATE media SET product_id = ? WHERE media_id = ?",
    [null, mediaId]
  );
  try {
    res.status(200).json({
      message: `delete image from product with id=${id} `,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Trước hết, xóa các bản ghi liên quan trong bảng 'tag_product' sử dụng product_id
    await db.execute("DELETE FROM tag_product WHERE product_id = ?", [id]);

    // Sau đó, xóa các bản ghi trong bảng 'media' sử dụng product_id
    await db.execute("DELETE FROM media WHERE product_id = ?", [id]);

    // Tiếp theo, xóa sản phẩm từ bảng 'product' sử dụng product_id
    await db.execute("DELETE FROM product WHERE product_id = ?", [id]);

    // Cuối cùng, xóa các bản ghi tag không còn liên kết với bất kỳ sản phẩm nào
    await db.execute(
      "DELETE FROM tag WHERE tag_id NOT IN (SELECT tag_id FROM tag_product)"
    );

    // Lấy danh sách sản phẩm sau khi xóa để trả về
    const data: any = await db.execute("SELECT * FROM product");
    const rows = data[0];

    res.json({
      message: "Đã xóa sản phẩm và liên quan thành công",
      rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Xóa không thành công",
      error: error,
    });
  }
});

export default router;
