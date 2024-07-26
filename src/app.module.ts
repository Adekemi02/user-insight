import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './cofig/data-source';
import { UtilModule } from './utils/utils.module';




@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule, 
    AuthModule,
    UtilModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
