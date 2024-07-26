import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';



@ApiTags("Auth")
@Controller('auth')
@UseGuards(AuthGuard("facebook"))
export class AuthController {}

@Get("login/facebook")
const facebookLogin() => {
    return "facebook login";
}


