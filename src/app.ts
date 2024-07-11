import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/route";
import globalErrHandler from "./app/middleware/globalErrHandler";
import notFound from "./app/middleware/notFound";

const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://active-gear.netlify.app",
      "https://active-gear-frontend.vercel.app",
    ],
    credentials: true,
  })
);

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Active Gear Zone Server!");
});

app.use(globalErrHandler);
app.use(notFound);

export default app;
