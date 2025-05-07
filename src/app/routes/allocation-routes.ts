import express from 'express';
import { AllocationController } from '../controllers/allocation-controller';

const router = express.Router();

router.post('/allocations', AllocationController.create);
router.get('/allocations', AllocationController.findAll);
router.get('/allocations/course/:course_id', AllocationController.findAllByCourse);
router.get('/allocations/professor/:professor_id', AllocationController.findAllByProfessor);
router.get('/allocations/:allocation_id', AllocationController.findById);
router.put('/allocations/:allocation_id', AllocationController.update);
router.delete('/allocations', AllocationController.deleteAll);
router.delete('/allocations/:allocation_id', AllocationController.deleteById);

export default router;
