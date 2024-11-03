import { Router } from 'express'
import AuthRoutes from './authRoutes.js'
import PasswordRoutes from './passwordRoutes.js'
const router = Router()

router.use('/api/auth',AuthRoutes)
router.use('/api/auth',PasswordRoutes)

export default router



