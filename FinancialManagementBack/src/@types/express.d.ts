import { userProps } from '../modules/users/controllers/UsersController';

declare global {
  namespace Express {
    export interface Request {
      user: Partial<userProps>;
    }
  }
}
