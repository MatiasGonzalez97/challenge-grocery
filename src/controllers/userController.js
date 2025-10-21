import Router from "express";
import userService from "../services/userService.js";
const route = Router();
import {
  registerRules,
  loginRules,
  handleValidationErrors,
} from '../middleware/validationMiddleware.js';

route.post('/register',
    registerRules,
    handleValidationErrors, async(req, res) => {
        const { email, password} = req.body;
        const response = await userService.register(email,password)
        return res.status(response.status).json({res: response.res});
    }
)

route.post('/login',
    loginRules, 
    handleValidationErrors, async (req, res) => {
        const { email, password } = req.body;
        const response = await userService.login(email,password)
        return res.status(response.status).json({res: response.res});
    }  
);
export { route };