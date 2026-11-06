import { Router } from 'express'
import * as libroController from '../controllers/libro.controller.js'
import { validate, validateParams } from '../middlewares/validate.middleware.js'
import { libroCreateSchema, libroUpdateSchema } from '../validations/libro.validation.js'
import { idParamSchema } from '../validations/common.validation.js'
import { authenticate, authorize } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', libroController.getAll)
router.get('/:id', validateParams(idParamSchema), libroController.getById)
router.post('/', authenticate, authorize('ADMIN'), validate(libroCreateSchema), libroController.create)
router.put('/:id', authenticate, authorize('ADMIN'), validateParams(idParamSchema), validate(libroUpdateSchema), libroController.update)
router.delete('/:id', authenticate, authorize('ADMIN'), validateParams(idParamSchema), libroController.remove)

export default router
