import { clerkMiddleware } from "@clerk/express";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";

import { connectDB } from "./lib/db.js";
import adminRoutes from "./routes/admin.route.js";
import albumRoutes from "./routes/album.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import statRoutes from "./routes/stat.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(clerkMiddleware);
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // max 10mb file size
    },
  }),
);
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler

app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    });
});

app.listen(5000, () => {
  console.log(`Server is running on port: ` + `http://localhost:${PORT}`);
  connectDB();
});
