import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from './users/users.service';
import { UserDocument } from './users/models/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: UserDocument, done: Function) {
    done(null, user._id);
  }

  async deserializeUser(email: string, done: Function) {
    const user = await this.usersService.findByEmail(email);
    done(null, user);
  }
}
