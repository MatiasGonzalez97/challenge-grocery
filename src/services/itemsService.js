import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const itemsService = {
    create: async(name, quantity, store, userId) => {
        try {
            const newItem = await prisma.item.create({
                data: {
                    name,
                    quantity,
                    store,
                    userId,
                },
            });
            return {status: 201, res: newItem };
        } catch (error) {
            return {status: 500, res: { message: 'Server error', error: error.message }};
        }
    },
    getItems: async(userId) => {
        try {
            const items = await prisma.item.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });
            return {status:200, res: items}
        } catch (error) {
            return {status: 500, res: { message: 'Server error', error: error.message }};
        }
    },
    updateItem: async(userId, id, name, quantity, store) => {
        try {
            const updatedItem = await prisma.item.updateMany({
                where: {
                    id: parseInt(id),
                    userId,
                },
                data: {
                    name,
                    quantity,
                    store,
                },
            });

            if (updatedItem.count === 0) {
                return {status: 404, res: { message: 'Item not found or user not authorized'}};
            }

            return {status:200, res: { message: 'Item updated successfully' }};
        } catch (error) {
            if (error.code === 'P2025') {
                return {status: 404, res: { message: 'Item not found' }};
            }
           return {status: 500, res: { message: 'Server error', error: error.message }};
        }
    },
    removeItem: async(id, userId) => {
          try {
            const deleteResult = await prisma.item.deleteMany({
            where: {
                id: parseInt(id),
                userId,
            },
            });

            if (deleteResult.count === 0) {
                return res.status(404).json({ message: 'Item not found or user not authorized' });
            }

            return {status:204, res:''}; 
        } catch (error) {
            return {status: 500, res: { message: 'Server error', error: error.message }}; 
        }
    }
}
export default itemsService;