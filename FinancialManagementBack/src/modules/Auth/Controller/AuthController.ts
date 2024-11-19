import { Request, Response } from 'express';
import { AuthService } from '../Service/AuthService';
import { Prisma } from '@prisma/client';

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const { token } = await service.login( username, password );
      res.json({ token });
    } catch (error) {
      const typedError = error as Prisma.PrismaClientKnownRequestError;
      res.status(401).json({
        message: 'Usuário ou Senha Inválido',
        error: typedError.message,
      });
    }
  }

  async register(req: Request, res: Response) {
    const userData = req.body;
    try {
        await service.register(userData);
        res.status(201).json("Usuário criado co sucesso!");
    } catch (error) {
        const typedError = error as Prisma.PrismaClientKnownRequestError;
        res
            .status(400)
            .json({ message: 'Erro ao criar usuário!', error: typedError.message });
    }
}
  
}
