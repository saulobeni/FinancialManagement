import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwtConfig';
import prisma from '../../config/clientPrisma';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token =
      authHeader.toLowerCase().indexOf('bearer') > -1 ? authHeader.split(' ')[1] : authHeader;

    jwt.verify(token, jwtConfig.secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const validateMiddleware = async (
  req: Request,
  res: Response
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: 'Não autorizado.' });
    }

    const token = authorization.indexOf(' ') > -1 ? authorization.split(' ')[1] : authorization;
    console.log(jwt.verify(token, jwtConfig.secret) as { data: { id: number }; },);
    const { id } = jwt.verify(token, jwtConfig.secret) as { id: number };

    const findUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!findUser) {
      return res.status(401).send({ message: 'Não autorizado.' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...loggedUser } = findUser;

    req.user = loggedUser;

    return res.status(200).send({ message: 'Autorizado.', user: loggedUser });
  } catch (error) {
    const typedError = error as Error;
    return res
      .status(500)
      .send({ message: 'Erro interno do servidor.', error: typedError.message });
  }
};



