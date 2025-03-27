
import { Response } from 'express';
import { ResponseHelper } from '../helpers';
import { RequestWithUser } from '../interfaces/auth.interface';
import { UserService } from '../services/user.service';
import { HttpStatusCode } from '../constants/http.enum';

export class UserController {
  constructor(private userService: UserService) {
    this.getSelfData = this.getSelfData.bind(this);
  }

  public async getSelfData(req: RequestWithUser, res: Response) {
    const selfData = await this.userService.getUserSelfDataById(req.user.user_id);

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      selfData
    );
  }
}
