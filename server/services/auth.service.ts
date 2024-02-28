import bcrypt from "bcrypt";
import * as usersService from "./users.service";
import jwt from "jsonwebtoken";

export const signup = (
  name: string,
  email: string,
  password: string,
  role: any,
  status: any
) => {
  console.log("signupService", name, email, password, role, status);

  const salt = bcrypt.genSaltSync(10);

  const hashPassword = bcrypt.hashSync(password, salt);

  return usersService.create(name, email, hashPassword, 0, 0);
};

export const signin = async (
  email: string,
  password: string,
  role: number,
  status: number
) => {
  try {
    const findUser: any = await usersService.findOneByEmail(email);
    const [rows] = findUser;

    if (rows.length === 0) {
      return {
        status: 404,
        message: "User not found",
      };
    } else {
      const hashPassword = rows[0].password;

      const compare = bcrypt.compareSync(password, hashPassword);

      if (!compare) {
        return {
          status: 404,
          message: "Password is incorrect",
        };
      } else {
        const access_token = jwt.sign(
          { data: { id: rows[0].id, email: rows[0].email } },
          process.env.TOKEN_SECRET as string
          // { expiresIn: 1200 }
        );

        return {
          status: 200,
          info: {
            name: rows[0].name,
            role: rows[0].role,
            access_token,
            status: rows[0].status,
          },
          message: "Sign in successfully",
        };
      }
    }
  } catch (error) {
    return error;
  }
};
