import express from 'express';
import { DepartmentController } from '../controllers/department-controller';

const router = express.Router();

router.post('/departments', DepartmentController.create);
router.get('/departments', DepartmentController.findAll);
router.get('/departments/:departmentId', DepartmentController.findById);
router.put('/departments/:departmentId', DepartmentController.update);
router.delete('/departments', DepartmentController.deleteAll);
router.delete('/departments/:departmentId', DepartmentController.deleteById);

export default router;
