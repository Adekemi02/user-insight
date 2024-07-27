import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('insights')
  async userInsight(@Query('accessToken') accessToken: string, @Res() res: Response) {
    const data = await this.usersService.getUserInsights(accessToken);
    
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  
}
