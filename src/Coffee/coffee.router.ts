import { Router } from "express";
import { createCoffee } from "./coffee.controller";

const coffeeRouter = Router();

coffeeRouter.post("/", createCoffee);

export default coffeeRouter;