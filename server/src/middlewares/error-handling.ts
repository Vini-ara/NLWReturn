import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../models/custom-error-model';

export function errorHandling(
  err: TypeError | CustomError,
  _: Request, 
  res: Response,
  __: NextFunction
) {
  let customError = err;

  if(!(err instanceof CustomError)) {
    customError = new CustomError(
      'Server Error'
    );
  } 

  res.status((customError as CustomError).status).json(customError);
}
