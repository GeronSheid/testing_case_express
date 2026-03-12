import { Router } from "express";
import { createCoffee, deleteCoffee, getAllCoffees, getCoffeeById, updateCoffee } from "./coffee.controller";

const coffeeRouter = Router();

coffeeRouter.post("/", createCoffee);
coffeeRouter.get("/", async (req, res) => {getAllCoffees(req, res)});
coffeeRouter.get("/:id", async (req, res) => {getCoffeeById(req, res)});
coffeeRouter.put("/:id", async (req, res) => {updateCoffee(req, res)});
coffeeRouter.delete("/:id", async (req, res) => {deleteCoffee(req, res)});

export default coffeeRouter;