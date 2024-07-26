import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
    ) {}

    async facebookLogin() {
        return HttpStatus.OK
    }
}
