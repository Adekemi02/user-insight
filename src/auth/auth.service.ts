import { HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    async facebookLogin() {
        return HttpStatus.OK
    }

    async facebookLoginCallback(req: Request, res: Response) {
        const accessToken = req.user['accessToken'];
        
        const userData = await this.usersService.getUserInsights(accessToken);
        
        return {
            statusCode: 200,
            data: userData,
        };
    }
}
