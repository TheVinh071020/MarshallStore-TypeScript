import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as usersService from "../services/users.service";

export const signup = async (req: Request, res: Response) => {
  let { name, email, password, role, status } = req.body;
  try {
    const findEmail: any = await usersService.findOneByEmail(email);
    const [rows] = findEmail;
    const existingUser = rows.find((user: any) => user.email === email);
    if (existingUser) {
      return res.json({
        status: 400,
        message: "Email đã tồn tại",
      });
    }
    await authService.signup(name, email, password, 0, 0);
    res.json({
      status: 200,
      message: "Đăng ký thành công",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password, role, status } = req.body;
  try {
    const result = await authService.signin(email, password, role, status);

    res.json(result);
  } catch (error) {
    res.json({
      error,
    });
  }
};
