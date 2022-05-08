import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLoad { 
  email: string;  
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if(!authToken) return res.status(401).end();

  const [, token] = authToken.split(' ');

  try {
    const { email } = verify(token, '4dd693a45f2fdff00dc174e586a31202') as IPayLoad;

    req.user_email = email;

    console.log(req.user_email);

    return next();
  } catch(err) {
    return res.status(401).end();
  }
}
