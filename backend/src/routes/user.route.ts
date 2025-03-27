import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { AuthMiddleware, ValidationMiddleware } from '../middlewares';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';


export class UserRoute implements Routes {
  public router = Router();
  private userService = new UserService();
  private userController = new UserController(this.userService);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/self', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.exceptionGuard(this.userController.getSelfData)
    );
  }
}
