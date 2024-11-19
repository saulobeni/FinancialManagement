  import { Request, Response, NextFunction } from 'express';
  import jwt from 'jsonwebtoken';
  import { jwtConfig } from '../../config/jwtConfig';

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
