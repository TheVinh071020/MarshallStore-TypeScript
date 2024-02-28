import express, { Request, Response } from "express";
import {
  findAll,
  findOne,
  create,
  update,
  findOneByEmail,
} from "../controllers/users.controller";
import { isAuth } from "../middlewares/auth.middleware";
import { pagination } from "../middlewares/user.middlewares";

const router = express.Router();

// Khởi tạo route (endpoint) theo đúng các vụ C/R/U/D
router.get("/", pagination, findAll);

router.get("/:id", findOne);

router.get("/email/:email", findOneByEmail);

router.post("/", isAuth, create);

router.patch("/:id", update);

export default router;
