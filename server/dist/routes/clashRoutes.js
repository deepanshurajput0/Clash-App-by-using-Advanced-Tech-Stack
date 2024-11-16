import { Router } from 'express';
import { ZodError } from 'zod';
import { formatError, ImageValidator, removeImage, uploadedFile } from '../helper.js';
import { clashSchema } from '../validation/clashValidation.js';
import prisma from '../config/database.js';
import authMiddleware from '../middleware/AuthMiddleware.js';
const router = Router();
router.get('/', authMiddleware, async (req, res) => {
    try {
        const clash = await prisma.clash.findMany({
            where: {
                user_id: req.user?.id
            },
        });
        return res.json({ message: 'Clashed fetched successfully', data: clash });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: 'Invalid Data', errors });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const clash = await prisma.clash.findUnique({
            select: {
                image: true,
                id: true
            },
            where: {
                id: Number(id)
            },
        });
        if (clash)
            removeImage(clash?.image);
        await prisma.clash.delete({
            where: {
                id: Number(id)
            }
        });
        return res.json({ message: 'Clashed deleted successfully' });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: 'Invalid Data', errors });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const clash = await prisma.clash.findUnique({
            where: {
                id: Number(id)
            },
        });
        return res.json({ message: 'Clashed fetched successfully', data: clash });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: 'Invalid Data', errors });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const payload = clashSchema.parse(body);
        if (req.files?.image) {
            const image = req.files?.image;
            const validMsg = ImageValidator(image.size, image.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } });
            }
            payload.image = await uploadedFile(image);
        }
        else {
            return res.status(422).json({ errors: { image: 'Image field is required' } });
        }
        await prisma.clash.create({
            data: {
                ...payload,
                user_id: req.user?.id,
                expire_at: new Date(payload.expire_at)
            }
        });
        return res.json({ message: 'Clash Created successfully' });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: 'Invalid Data', errors });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = clashSchema.parse(body);
        if (req.files?.image) {
            const image = req.files?.image;
            const validMsg = ImageValidator(image.size, image.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } });
            }
            const clash = await prisma.clash.findUnique({
                select: {
                    image: true,
                    id: true
                },
                where: {
                    id: Number(id)
                }
            });
            if (clash)
                removeImage(clash?.image);
            payload.image = await uploadedFile(image);
        }
        await prisma.clash.update({
            where: {
                id: Number(id)
            },
            data: {
                ...payload,
                expire_at: new Date(payload.expire_at)
            }
        });
        return res.json({ message: 'Clash Updated successfully' });
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
