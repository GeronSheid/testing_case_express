import express, {type Request, type Response} from "express";
import { createUser, getAllUsers } from "./User/user.controller";
import userRouter from "./User/user.router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});