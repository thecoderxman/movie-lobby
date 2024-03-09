import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { username } = payload;

    const user = await this.userModel.findOne({username : username}).lean();

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException('You do not have permission to access this endpoint.');
    }

    return user;
  }
}
