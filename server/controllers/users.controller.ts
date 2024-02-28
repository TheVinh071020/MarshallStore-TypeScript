import { Request, Response } from "express";
import db from "../utils/db";
import * as usersService from "../services/users.service";

export const findAll = async (req: Request, res: Response) => {
  try {
    let data: any = await usersService.findAll();
    let [rows] = data;
    res.json({
      status: "success",
      users: rows,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    let data: any = await usersService.findOne(id);
    let [rows] = data;
    if (rows.length === 0) {
      res.json({
        message: "User not found",
      });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const findOneByEmail = async (req: Request, res: Response) => {
  let { email } = req.params;

  try {
    let data: any = await usersService.findOneByEmail(email);
    let [rows] = data;
    if (rows.length === 0) {
      res.json({
        message: "User not found",
      });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  let { name, email, password } = req.body;
  // validate email, password

  try {
    await usersService.create(name, email, password);
    res.json({
      message: "Create user successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  let { id } = req.params;
  let { status } = req.body;
  try {
    let [updateUser]: any = await db.execute(
      `SELECT * FROM user WHERE user_id = ?`,
      [id]
    );
    let rowUser = updateUser[0];
    if (rowUser.length === 0) {
      res.json({
        message: `Users với id = ${id} không tồn tại`,
      });
    } else {
      await db.execute(`UPDATE user SET status = ? WHERE user_id = ?`, [
        status,
        id,
      ]);
      res.json({
        message: "Update user success",
      });
    }
  } catch (error) {
    res.json({
      message: "Update not success",
    });
  }
};
