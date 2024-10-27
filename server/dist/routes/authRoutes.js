import { Router } from 'express';
import { registerSchema } from '../validation/authValidations.js';
import { ZodError } from 'zod';
import { formatError } from '../helper.js';
import bcrypt from 'bcrypt';
import prisma from '../config/database.js';
const router = Router();
router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        });
        if (user) {
            return res.status(422).json({
                email: 'Email already taken. plz use another'
            });
        }
        payload.password = await bcrypt.hash(payload.password, 10);
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password
            }
        });
        return res.json({
            message: 'Account created successfully'
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: 'Invalid Data', errors });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
export default router;
