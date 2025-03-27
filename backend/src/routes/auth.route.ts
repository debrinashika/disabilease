import { AuthController } from '../controllers/auth.controller';
import { loginSchema, registerSchema } from '../dtos/auth.dto';
import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { AuthMiddleware, ValidationMiddleware } from '../middlewares';
import { AuthService } from '../services/auth.service';

export class AuthRoute implements Routes {
  public router = Router();
  private authService = new AuthService();
  private authController = new AuthController(this.authService);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/login', 
      ValidationMiddleware.validate(loginSchema), 
      ValidationMiddleware.exceptionGuard(this.authController.login)
    );

    this.router.post(
      '/register', 
      ValidationMiddleware.validate(registerSchema), 
      ValidationMiddleware.exceptionGuard(this.authController.register)
    );

    this.router.post(
      '/refresh-token', 
      ValidationMiddleware.exceptionGuard(this.authController.refreshToken)
    );

    this.router.post(
      '/logout', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.exceptionGuard(this.authController.logout)
    );
  }
}
