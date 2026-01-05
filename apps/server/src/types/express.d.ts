import { IUser } from '../db/models';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};
