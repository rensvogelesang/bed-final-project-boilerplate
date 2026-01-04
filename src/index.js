import express from "express";
import dotenv from "dotenv";

import loginRoutes from "./routes/login.routes.js";
import usersRoutes from "./routes/users.routes.js";
import hostsRoutes from "./routes/hosts.routes.js";
import propertiesRoutes from "./routes/properties.routes.js";
import bookingsRoutes from "./routes/bookings.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";

import { requestLogger } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

/**
 * GLOBAL MIDDLEWARE
 */
app.use(express.json());
app.use(requestLogger);

/**
 * ROUTES
 * 🚨 HIER NOOIT CONTROLLERS IMPORTEREN
 */
app.use("/login", loginRoutes);
app.use("/users", usersRoutes);
app.use("/hosts", hostsRoutes);
app.use("/properties", propertiesRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/reviews", reviewsRoutes);

/**
 * 404 FALLBACK
 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/**
 * ERROR HANDLER (ALTIJD LAATST)
 */
app.use(errorHandler);

/**
 * SERVER
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 SERVER RUNNING ON ${PORT}`);
});
