import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

interface IUser {
  id: string;
  name: string;
  email: string;
}

const usersMemory: IUser[] = [];

export const userIndex = async (req: Request, res: Response) => {
  res.json(usersMemory);
};

export const userCreate = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const id = randomUUID();

  const user: IUser = {
    id,
    name,
    email,
  };

  usersMemory.push(user);

  res.json(user);
};

export const userShow = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  const user = usersMemory.find((user) => user.id === user_id);

  res.json(user);
};

export const userDelete = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  const userIndex = usersMemory.findIndex((user) => user.id === user_id);

  usersMemory.splice(userIndex, 1);

  res.json({ message: 'User deleted' });
};
