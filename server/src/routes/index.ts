import { Router } from 'express'
import AuthRoutes from './authRoutes.js'
import PasswordRoutes from './passwordRoutes.js'
import ClashRoutes from './clashRoutes.js'
import authMiddleware from '../middleware/AuthMiddleware.js'
const router = Router()

router.use('/api/auth',AuthRoutes)
router.use('/api/auth',PasswordRoutes)
router.use('/api/clash' ,ClashRoutes )
export default router



