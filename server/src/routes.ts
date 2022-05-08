import express from 'express';

import { SubmitFeedbackController } from './controllers/submitFeedbackController';
import { GetAllFedabcksController } from './controllers/getAllFeedbacksController';
import { SubmitUserController } from './controllers/submitUserController';
import { UserLoginController } from './controllers/userLoginController';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ensureAdmin } from './middlewares/ensureAdmin';

export const routes = express.Router();

const submitFeedbackController = new SubmitFeedbackController();
const getAllFeedbacksController = new GetAllFedabcksController();
const submitUserController = new SubmitUserController();
const userLoginController = new UserLoginController();

routes.post('/feedbacks', submitFeedbackController.handle);

routes.get('/feedbacks', ensureAuthenticated, ensureAdmin, getAllFeedbacksController.handle);

routes.post('/users', submitUserController.handle);

routes.post('/login', userLoginController.handle);
