import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';



@ApiTags("Auth")
@Controller('auth')
@UseGuards(AuthGuard("facebook"))
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("login/facebook")
    facebookLogin() {
      return this.authService.facebookLogin();
    }

    @Get('callback')
    async facebookLoginCallback(@Req() req: Request, @Res() res: Response) {
      const result = await this.authService.facebookLoginCallback(req, res);
      res.json(result)
    }

    @Get('success')
    async facebookLoginSuccess(@Req() req: Request, @Res() res: Response) {
      if (req.user) {
        const userInfo = {
          id: req.user['facebookId'],
          displayName: req.user['name'],
          provider: 'facebook',
          accessToken: req.user['accessToken'],
        };
        res.json(userInfo);
        
        res.render('fb-github-success', { user: userInfo });
      } else {
        res.redirect('/auth/facebook/error');
      }
    }

    @Get('error')
    facebookLoginError(@Res() res: Response) {
      res.send('Error logging in via Facebook.');
    }

//   @Get('signout')
//   async signOut(@Req() req: Request, @Res() res: Response) {
//     req.logout((err) => {
//       if (err) {
//         return res.status(400).send({ message: 'Failed to sign out fb user' });
//       }
//       req.session.destroy((err) => {
//         if (err) {
//           console.log('Failed to destroy session');
//         } else {
//           console.log('Session destroyed.');
//         }
//         res.render('auth'); // Or redirect to a different page
//       });
//     });
//   }
}




