import jwt, { JwtPayload } from 'jsonwebtoken';
import { compare, genSalt, hash } from 'bcryptjs';
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserService } from './user.service';
import { HttpException } from '../exceptions/http.exception';
import { HttpStatusCode } from '../constants/http.enum';
import { AuthHelper } from '../helpers';
import { AssessmentResultService } from './assessment.result.service';
import { TaskCategoryService } from './task.category.service';
import { REFRESH_TOKEN_SECRET } from '../config';

export class AuthService {
  private userService = new UserService();
  private userModel = new PrismaClient().user;

  async login(res: Response, email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    // Check user
    if (!user) {
      throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
    }

    // Password validation
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
    }

    // User is valid
    // Make refresh token
    const refreshToken = AuthHelper.createRefreshToken(user);

    // Send it to cookie
    AuthHelper.sendRefreshToken(res, refreshToken);

    // Make acess token
    const accessToken = AuthHelper.createAccessToken(user);

    const assessmentResultService = new AssessmentResultService();

    return {
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        already_test: await assessmentResultService.isUserHasTakenTest(user.user_id) != null
      },
      token: accessToken,
    };
  }

  async register(
    email: string,
    username: string,
    password: string,
    confirm_password: string
  ) {
    const errors: Record<string, string[]> = {};

    // Check confirm password
    if (password !== confirm_password) {
      errors.confirm_password = ["Confirm password doesn't match password"];
    }

    const isUsernameExists = await this.userService.getUserByUsername(username);
    const isEmailExists = await this.userService.getUserByEmail(email);

    // Check uniqueness
    if (isUsernameExists) {
      errors.username = ["Username already exists"];
    }

    if (isEmailExists) {
      errors.email = ["Email already exists"];
    }

    if (Object.keys(errors).length > 0) {
      throw new HttpException(
        HttpStatusCode.Conflict, 
        'Invalid request', 
        errors
      );
    }

    const hashedPassword = await hash(password, await genSalt());
    const newUser = await this.userModel.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword
      },
    });

    const taskCategoryService = new TaskCategoryService();
    await taskCategoryService.createInitialTaskCategories(newUser.user_id);

    return;
  }

  async refreshToken(res: Response, refreshToken: string | null) {
    if (!refreshToken) {
      throw new HttpException(
        HttpStatusCode.Unauthorized, 
        'Invalid credentials'
      );
    }

    let payload: string | JwtPayload | undefined;

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
      }

      payload = decoded;
    });

    // Token is valid
    if (typeof payload !== 'string' && payload && 'user_id' in payload) {
      const user = await this.userService.getUserById(payload.user_id);

      if (!user) {
        throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
      }

      // User is valid
      // Refresh the token
      const newRefreshToken = AuthHelper.createRefreshToken(user);

      // Send it to cookie
      AuthHelper.sendRefreshToken(res, newRefreshToken);

      // Make acess token
      const accessToken = AuthHelper.createAccessToken(user);

      return {
        token: accessToken,
      };
    } else {
      throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
    }
  }
}