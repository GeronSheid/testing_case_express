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

export async function getAllCoffees(req: Request, res: Response) {
  try {
    const coffees = await coffeeService.getAll();
    res.json(coffees);
  } catch (error) {
    console.error("Error fetching coffees:", error);
    res.status(500).json({ error: "An error occurred while fetching coffees." });
  }
}

export async function getCoffeeById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const coffee = await coffeeService.getById(id);
    if (coffee) {
      res.json(coffee);
    } else {
      res.status(404).json({ message: "Coffee not found" });
    }
  } catch (error) {
    console.error("Error fetching coffee by ID:", error);
    res.status(500).json({ error: "An error occurred while fetching the coffee." });
  }
}

export async function updateCoffee(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data: Partial<CreateCoffeeDTO> = req.body;
    const coffee = await coffeeService.update(id, data);
    res.json(coffee);
  } catch (error) {
    console.error("Error updating coffee:", error);
    res.status(500).json({ error: "An error occurred while updating the coffee." });
  }
}

export async function deleteCoffee(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const coffee = await coffeeService.remove(id);
    res.json(coffee);
  } catch (error) {
    console.error("Error deleting coffee:", error);
    res.status(500).json({ error: "An error occurred while deleting the coffee." });
  }
}
