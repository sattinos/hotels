import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UserService) { }

  async canActivate(context: ExecutionContext, ): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const [request, response] = [
      httpContext.getRequest(),
      httpContext.getResponse()
    ];

    const un = request.body.un;
    const pw = request.body.pw;

    const user = await this.usersService.login(un, pw);
    if (user) {
      const session = request.session;
      if (session) {
        request.session.user = user;
        return true;
      } else {
        Logger.error(`failed to find session for request`);
        return false;
      }
    }
    return false;
  }
}
