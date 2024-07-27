import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users..repository';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserInsights(accessToken: string): Promise<any> {
    try {
      const url = `https://graph.facebook.com/me?fields=id,name,friends.summary(true)&access_token=${accessToken}`;
      const response = await axios.get(url);
      const userData = response.data;

      let user = await this.userRepository.findOne({ where: { facebookId: userData.id } });

      if (!user) {
        user = this.userRepository.create({
          facebookId: userData.id,
          name: userData.name,
          email: userData.email || '',
          friendsCount: userData.friends?.summary?.total_count || 0,
          photoUrl: userData.picture?.data?.url || '',
        });

        await this.userRepository.save(user);
    
      } else {
          user.name = userData.name;
          user.email = userData.email || user.email;
          user.friendsCount = userData.friends?.summary?.total_count || user.friendsCount;
          user.photoUrl = userData.picture?.data?.url || user.photoUrl;
          await this.userRepository.save(user);
      }

      return userData;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new HttpException(error.response.data, error.response.status);
      }

      throw new HttpException('An error occurred while fetching user insights.', HttpStatus.INTERNAL_SERVER_ERROR);
    }   
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
