import express from "express";
import userRouter from "./User/user.router";
import authRouter from "./Auth/auth.router";
import cookieParser from "cookie-parser";
import coffeeRouter from "./Coffee/coffee.router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use("/api/users", userRouter);
app.use("/api/coffees", coffeeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});