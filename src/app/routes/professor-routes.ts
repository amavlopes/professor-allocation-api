import express from 'express';
import { ProfessorController } from '../controllers/professor-controller';

const router = express.Router();

router.post('/professors', ProfessorController.create);
router.get('/professors', ProfessorController.findAll);
router.get('/professors/department/:departmentId', ProfessorController.findAllByDepartment);
router.get('/professors/:professorId', ProfessorController.findById);
router.put('/professors/:professorId', ProfessorController.update);
router.delete('/professors', ProfessorController.deleteAll);
router.delete('/professors/:professorId', ProfessorController.deleteById);

export default router;
