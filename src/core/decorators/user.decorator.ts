import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Omit, ValuesType } from 'utility-types';

import { UserEntity } from '@/features/user/user.entity';

export type K = keyof Omit<UserEntity, 'hashed_password'>;
export type V = ValuesType<UserEntity>;

export const User = createParamDecorator(
  (data: K | undefined, ctx: ExecutionContext): V | UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserEntity;

    return data ? user[data] : user;
  },
);
