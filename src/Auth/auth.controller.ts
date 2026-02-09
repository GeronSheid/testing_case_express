import type { Request, Response } from 'express';
import { login, logout, refresh, register } from './auth.service';
import prisma from '~/db';

export async function registerController(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const {user, accessToken, refreshToken} = await register({ name, email, password });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000, 
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ user });

  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }

}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const {user, accessToken, refreshToken} = await login(email, password);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000, 
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function refreshController(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is missing" });
    }
    const result = await refresh(refreshToken);
    if (!result) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const { accessToken } = result;
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000, 
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await logout(refreshToken);
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: "Failed to logout" });
  }
}

export async function getMeController(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}