import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  // UserService is exported by UserModule
  // constructor(private readonly userService: UserService) {}
  canActivate(context: ExecutionContext): boolean {
    // context.getArgs()[0].user.sub contains the user's auth0 id
    // NOTE: an 'attacker' cannot change the id becase the signature guarantees integrity
    // return !!(await this.userService.getUser(context.getArgs()[0].user.sub));
    return true;
  }
}
