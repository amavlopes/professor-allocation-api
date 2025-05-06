import express from 'express';
import { ProfessorController } from '../controllers/professor-controller';

const router = express.Router();

router.post('/professors', ProfessorController.create);
router.get('/professors', ProfessorController.findAll);
router.get('/professors/department/:department_id', ProfessorController.findAllByDepartment);
router.get('/professors/:professor_id', ProfessorController.findById);
router.put('/professors/:professor_id', ProfessorController.update);
router.delete('/professors', ProfessorController.deleteAll);
router.delete('/professors/:professor_id', ProfessorController.deleteById);

export default router;
