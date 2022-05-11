import express from "express";
import { router as userRouter } from "./routes/users.route";
import { router as loginRouter } from "./routes/login.route";

const app = express();

const PORT = 5001;

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.listen(PORT, () => {
  console.log(`App rodando na porta \nhttp://localhost:${PORT}`);
});
