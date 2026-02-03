import express, {type Request, type Response} from "express";
import { createUser, getAllUsers } from "./User/user.controller";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = await createUser(user);
  res.status(201).json(newUser);
});

app.get("/", async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});