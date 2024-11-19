import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../Repository/AuthRepository';
import { jwtConfig } from '../../../../config/jwtConfig';
import { IRegisterUser } from "../interfaces";

const repository = new AuthRepository();

export class AuthService {

  async login(username: string, password: string) {

    const user = await repository.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Usuário ou Senha Inválidos');
    }

    const token = jwt.sign( { id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

    return { token };
  }

  async register(userData: IRegisterUser) {

    const existingUser = await repository.findByUsername(userData.username);

    if (existingUser) {
        throw new Error('Usuário Já Existente');
    }

    const newUser = await repository.register(userData);
    return newUser;
}

}
