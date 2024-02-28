import db from "../utils/db";

export const findAll = () => {
  return db.execute("SELECT * FROM user where role = 0");
};

export const findOne = (id: string) => {
  return db.execute("SELECT * FROM user WHERE user_id = ?", [id]);
};

export const findOneByEmail = (email: string) => {
  return db.execute("SELECT * FROM user WHERE email = ?", [email]);
};

export const create = (
  name: string,
  email: string,
  password: string,
  role?: number,
  status?: number
) => {
  return db.execute(
    "INSERT INTO user (name, email, password, role, status) VALUES (?, ?, ?, ? ,?)",
    [name, email, password, role, status]
  );
};
