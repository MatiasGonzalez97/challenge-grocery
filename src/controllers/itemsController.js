import Router from "express";
const route = Router();
import { handleValidationErrors, itemRules } from '../middleware/validationMiddleware.js';
import authMiddleware from "../middleware/authMiddleware.js";
import itemsService from "../services/itemsService.js";

route.post(
  '/items',
  authMiddleware,
  itemRules,
  handleValidationErrors,
  async (req, res) => {
    const { name, quantity, store } = req.body;
    const userId = req.userId;
    const response = await itemsService.create(name,quantity, store, userId);
    return res.status(response.status).json({res: response.res});
  }
);

route.get('/items', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const response = await itemsService.getItems(userId);
    return res.status(response.status).json({res: response.res}); 
});

route.put(
  '/items/:id',
  authMiddleware,
  itemRules,
  handleValidationErrors,
  async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const { name, quantity, store } = req.body;
    const response = await itemsService.updateItem(userId, id, name, quantity, store);
    return res.status(response.status).json({res: response.res});
  }
);

route.delete('/items/:id', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const response = await itemsService.removeItem(id,userId);
    return res.status(response.status).json({res: response.res});
});

export {route}