import express, { Application } from "express";
import { errorHandler } from "./common/middleware/errorHandler.js";
import { notFound } from "./common/middleware/notFound.js";
import authRoutes from "./modules/auth/auth.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import indexRouter from "./routes/index.js";

const app: Application = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", indexRouter);

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

export default app;
