import type { Request, Response } from "express";
import * as coffeeService from "./coffee.service.js";
import type { CreateCoffeeDTO } from "./coffee.dto";

export async function createCoffee(req: Request, res: Response) {
  try {
    const data: CreateCoffeeDTO = req.body;
    const coffee = await coffeeService.create(data);
    res.status(201).json(coffee);
  } catch (error) {
    console.error("Error creating coffee:", error);
    res.status(500).json({ error: "An error occurred while creating the coffee." });
  }
}