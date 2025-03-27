import { Request, Response } from 'express';
import { AuthHelper, ResponseHelper } from '../helpers';
import { AuthService } from '../services/auth.service';
import { HttpStatusCode } from '../constants/http.enum';

export class AuthController {
  constructor(private authService: AuthService) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await this.authService.login(res, email, password);

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      'Login successful',
      data
    );
  }

  async register(req: Request, res: Response) {
    const { email, username, password, confirm_password } = req.body;
    await this.authService.register(
      email,
      username,
      password,
      confirm_password
    );

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Created,
      'Register successful'
    );
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.jid;
    const data = await this.authService.refreshToken(res, refreshToken);

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      'Token has been refreshed',
      data
    );
  }

  async logout(req: Request, res: Response) {
    AuthHelper.sendRefreshToken(res, "");

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      'Logout successful'
    );
  }
}