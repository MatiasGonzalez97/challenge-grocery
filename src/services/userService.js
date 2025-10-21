import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
const userService = {
    register: async (email,password) => {
        try {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return {status: 400, res:{ message: 'User already exists' }};
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                email,
                password: hashedPassword,
                },
            });

            return {status: 201, res: { message: 'User created successfully', userId: user.id }};
        } catch (error) {
            return {status: 500, res: { message: 'Server error', error: error.message }};
        }
    },
    login: async(email, password) => {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return {status: 401, res: { message: 'Invalid credentials' }};
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {status: 401, res: { message: 'Invalid credentials' }};
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return {status: 200, res: { message: 'Login successful', token }};
        } catch (error) {
            return {status: 500, res: { message: 'Server error', error: error.message }};
        }
    }
}

export default userService;