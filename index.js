import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/url.routes.js";
import { authenticateuser } from "./middleware/auth.middleware.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

// ✅ PUBLIC ROUTES
app.use("/user", userRouter);

// ✅ PROTECTED ROUTES
app.use("/", authenticateuser, urlRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
