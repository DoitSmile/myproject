// context.ts

import { Request, Response } from 'express';

export interface IAuthUser {
  user?: {
    email: string;
    id: string;
  };
  //?: 컬럼값이 필수적이지 않을 때 사용
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
