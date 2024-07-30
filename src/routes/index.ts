import { Hono } from 'hono'
import { insurance } from './insurance'
import { auth } from './auth'
import { authMiddleware } from '../middlewares/auth'

const router = new Hono()

router.route('/auth', auth) // public

router.use('/insurances', authMiddleware)

router.route('/insurances', insurance) // protected


export default router