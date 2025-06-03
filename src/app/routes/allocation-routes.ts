import express from 'express';
import { AllocationController } from '../controllers/allocation-controller';

const router = express.Router();

router.post('/allocations', AllocationController.create);
router.get('/allocations', AllocationController.findAll);
router.get('/allocations/course/:courseId', AllocationController.findAllByCourse);
router.get('/allocations/professor/:professorId', AllocationController.findAllByProfessor);
router.get('/allocations/:allocationId', AllocationController.findById);
router.put('/allocations/:allocationId', AllocationController.update);
router.delete('/allocations', AllocationController.deleteAll);
router.delete('/allocations/:allocationId', AllocationController.deleteById);

export default router;
