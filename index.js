import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectDB from "./mongodb/connect.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import webhookRouter from "./routes/webhook.routes.js";
import userRouter from "./routes/user.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import firstTimerRouter from "./routes/firstTimers.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

// Create an HTTP server instance
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send({ message: "Server Running!!!" });
});

app.use("/api/v1/webhook", webhookRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/first_timer", firstTimerRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // connect to database
    connectDB(process.env.MONGODB_URL);

    server.listen(PORT, () =>
      console.log(`server has started on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
