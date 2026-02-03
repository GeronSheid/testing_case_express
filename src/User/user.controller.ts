import type { Request, Response, NextFunction } from "express";
import * as userService from "./user.service.js";

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const user = await userService.getById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
} 

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const user = await userService.update(id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const user = await userService.remove(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };