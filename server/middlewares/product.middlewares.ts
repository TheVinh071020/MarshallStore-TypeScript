import { Request, Response, NextFunction } from "express";
import db from "../utils/db";
import { format } from "mysql2";

export const filterByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { category, page_index, page_number } = req.query;
  try {
    if (!category) {
      next();
    } else {
      let sql = `
    SELECT
        p.product_id,
        p.name,
        p.number,
        p.price,
        p.sale,
        c.category_id,
        c.name as description_name,
        c.description,
        c.banner,
        IFNULL(media.media_source, '') as media_source
        FROM product as p
        INNER JOIN category as c ON p.category_id = c.category_id
        LEFT JOIN (
        SELECT product_id, GROUP_CONCAT(source ORDER BY media_id ASC) as media_source
        FROM media
        GROUP BY product_id
    ) as media ON p.product_id = media.product_id
    WHERE c.name = ?
    ${!page_number ? "" : "LIMIT ?"}
    ${!page_number ? "" : "OFFSET ?"}`;

      let inserted = [
        category,
        Number(page_number),
        Number(+(page_index as any) - 1) * Number(page_number) || 0,
      ];

      sql = format(sql, inserted);

      let result: any = await db.execute(sql);
      let result2: any = await db.execute(
        "SELECT COUNT(*) as count FROM product as p INNER JOIN category as c ON p.category_id = c.category_id WHERE c.name = ?",
        [category]
      );
      let [rows] = result;
      let [rows2] = result2;
      res.status(200).json({
        data: rows,
        length: rows2[0].count,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const pagination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { page_index, page_number } = req.query;
  try {
    if (!page_index || !page_number) {
      next();
    } else {
      let sql = `SELECT p.*, c.description from product AS p INNER JOIN category AS c ON c.category_id = p.category_id LIMIT ? OFFSET ?  `;
      let inserted = [
        Number(page_number),
        (Number(page_index) - 1) * Number(page_number),
      ];
      sql = format(sql, inserted);
      let result: any = await db.execute(sql);
      let result2: any = await db.execute(
        "SELECT COUNT(*) as count FROM product"
      );

      let [rows] = result;
      let [rows2] = result2;

      res.status(200).json({
        data: rows,
        length: rows2[0].count,
      });
    }
  } catch (error) {
    res.status(500).json({});
    console.log(error);
  }
};
