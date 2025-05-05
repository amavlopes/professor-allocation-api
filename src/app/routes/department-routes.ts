import express from 'express';
import { DepartmentController } from '../controllers/department-controller';

const router = express.Router();

router.post('/departments', DepartmentController.create);
router.get('/departments', DepartmentController.findAll);
router.get('/departments/:department_id', DepartmentController.findById);
router.put('/departments/:department_id', DepartmentController.update);
router.delete('/departments', DepartmentController.deleteAll);
router.delete('/departments/:department_id', DepartmentController.deleteById);

export default router;
