import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
// Khởi tạo server
const server: Application = express();

// Require các routes
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import mediaRoutes from "./routes/media.routes";
import orderRoutes from "./routes/order.routes";
import productRoutes from "./routes/product.routes";
import tagRoutes from "./routes/tag.routes";
import userRoutes from "./routes/user.routes";
import orderDetail from "./routes/orderDetail.routes";

// Sử dụng các middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());

// Sử dụng các routes
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/categories", categoryRoutes);
server.use("/api/v1/media", mediaRoutes);
server.use("/api/v1/orders", orderRoutes);
server.use("/api/v1/order-details", orderDetail);
server.use("/api/v1/products", productRoutes);
server.use("/api/v1/tags", tagRoutes);
server.use("/api/v1/users", userRoutes);

// Lắng nghe trên một cổng
const port = 3000;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
