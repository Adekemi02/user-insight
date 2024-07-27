import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { User } from "src/users/entities/user.entity";
import { UserRepository } from "src/users/repositories/users..repository";



@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
    constructor() {
        super({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/v1/auth/callback",
            scope: "email",
            profileFields: ['name', 'email'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: Function,
      ): Promise<any> {
        const profileJson = profile._json;
        const id = profileJson.id;
        const firstName = profileJson.first_name || profileJson.name?.givenName || '';
        const lastName = profileJson.last_name || profileJson.name?.familyName || '';
        const email = profileJson.email || '';
        const friendsCount = profileJson.friends?.summary?.total_count || 0;
        const pictureUrl = profileJson.picture?.data?.url || '';
    
        const user = {
          facebookId: id,
          name: `${firstName} ${lastName}`,
          email: email,
          friendsCount: friendsCount,
          photoUrl: pictureUrl,
          accessToken,
        };
       
        done(null, user);

    }
}