import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    // console.log('SessionGuard:', request.session);
    return !!request.session && !!request.session.user;
  }
}