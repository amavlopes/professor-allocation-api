import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ErrorResponse } from '../models/error-response';
import { HttpStatusEnum } from '../enums/http-status';
import { ProfessorService } from '../services/professor-service';
import { IProfessorParams } from '../interfaces/professor-params';

export class ProfessorController {
	static async create(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Professor']
      #swagger.description = 'Creates a professor'
    */

		/*  #swagger.requestBody = {
      required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ProfessorRequest"
            }  
          }
        }
      } 
    */
		const name = request.body.name;
		const cpf = request.body.cpf;
		const departmentId = Number(request.body.departmentId);

		try {
			const professorService = container.resolve(ProfessorService);
			const professor = await professorService.create({ name, cpf, departmentId });

			/*  
        #swagger.responses[201] = {
            content: {
              "application/json": {
                schema:{
                    $ref: "#/components/schemas/ProfessorCreateResponse"
                }
              }           
            }
        }   
      */
			response.status(HttpStatusEnum.CREATED).json({ professor });
		} catch (e: any) {
			/*  
        #swagger.responses[400] = {
            content: {
              "application/json": {
                schema:{
                    $ref: "#/components/schemas/Error"
                }
              }           
            }
        }   
      */
			response.status(HttpStatusEnum.BAD_REQUEST).json(new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e));
		}
	}

	static async findAll(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Professor']
      #swagger.description = 'Finds all professors or professors by name if a query parameter name is defined'
    */

		const name = request.query.name as string;
		/*  
			#swagger.parameters['name'] = {
				in: 'query',
				description: '',
				type: 'string',
				example: 'Paulo Menezes'
			} 
		*/
		const departmentId = (request.query.departmentId as string) ? Number(request.query.departmentId) : undefined;
		/*  
			#swagger.parameters['departmentId'] = {
				in: 'query',
				description: 'Id do departamento',
				type: 'number',
				example: '1'
			} 
		*/

		const params: IProfessorParams = {
			name,
			departmentId,
		};

		const professorService = container.resolve(ProfessorService);
		const professors = await professorService.findAll(params);

		/*  
      #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                  $ref: "#/components/schemas/ProfessorListResponse"
              }
            }           
          }
      }   
    */
		response.status(HttpStatusEnum.OK).json({ professors });
	}

	static async findAllByDepartment(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Professor']
      #swagger.description = 'Finds professors by department id'
    */

		const { departmentId } = request.params;
		/*  
			#swagger.parameters['departmentId'] = {
				in: 'path',
				description: '',
				type: 'number',
				example: 1
			} 
		*/

		const professorService = container.resolve(ProfessorService);
		const professors = await professorService.findAllByDepartment(Number(departmentId));

		/*  
      #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                  $ref: "#/components/schemas/ProfessorListResponse"
              }
            }           
          }
      }   
    */
		response.status(HttpStatusEnum.OK).json({ professors });
	}

	static async findById(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Professor']
      #swagger.description = 'Finds a professor by its id'
    */

		const { professorId } = request.params;
		/*  
			#swagger.parameters['professorId'] = {
				in: 'path',
				description: '',
				type: 'number',
				example: 1
			} 
		*/

		const professorService = container.resolve(ProfessorService);
		const professor = await professorService.findById(Number(professorId));

		/*  
      #swagger.responses[404] = {
          description: "",
      }   
    */

		/*  
      #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                  $ref: "#/components/schemas/ProfessorResponse"
              }
            }           
          }
      }   
    */
		if (!professor) response.status(HttpStatusEnum.NOT_FOUND).send();
		else response.status(HttpStatusEnum.OK).json({ professor });
	}

	static async update(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Professor']
      #swagger.description = 'Updates a professor'
    */

		/*  #swagger.requestBody = {
      required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ProfessorUpdateRequest"
            }  
          }
        }
      } 
    */
		const { professorId } = request.params;
		const id = Number(professorId);
		/*  
			#swagger.parameters['professorId'] = {
				in: 'path',
				description: '',
				type: 'number',
				example: 1
			} 
		*/

		const name = request.body.name as string;
		const cpf = request.body.cpf as string;
		const departmentId = Number(request.body.departmentId as string);

		try {
			const professorService = container.resolve(ProfessorService);
			const professor = await professorService.update({ id, name, cpf, departmentId });

			/*  
        #swagger.responses[404] = {
            description: "",
        }   
      */

			/*  
        #swagger.responses[200] = {
            description: "",
            content: {
              "application/json": {
                schema:{
                    $ref: "#/components/schemas/ProfessorResponse"
                }
              }           
            }
        }   
      */
			if (!professor) response.status(HttpStatusEnum.NOT_FOUND).send();
			else response.status(HttpStatusEnum.OK).json({ professor });
		} catch (e: any) {
			/*  
        #swagger.responses[400] = {
            content: {
              "application/json": {
                schema:{
                    $ref: "#/components/schemas/Error"
                }
              }           
            }
        }   
      */
			response.status(HttpStatusEnum.BAD_REQUEST).json(new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e));
		}
	}

	static async deleteAll(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Professor']
      #swagger.description = 'Deletes all professors or deletes professors by its ids if a comma separated id list is provided'
    */

		const { ids } = request.query;
		const arrayIds: number[] = (ids as string)?.split(',').map((id) => Number(id));
		/*  
			#swagger.parameters['ids'] = {
				in: 'query',
				description: '',
				type: 'string',
				example: '1,2,3'
			} 
		*/

		const professorService = container.resolve(ProfessorService);
		await professorService.deleteAll(arrayIds);

		/*  
      #swagger.responses[204] = {
          description: "",
      }   
    */
		response.status(HttpStatusEnum.NO_CONTENT).send();
	}

	static async deleteById(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Professor']
      #swagger.description = 'Deletes a professor by its id'
    */

		const { professorId } = request.params;
		const id = Number(professorId);
		/*  
			#swagger.parameters['professorId'] = {
				in: 'path',
				description: '',
				type: 'number',
				example: 1
			} 
		*/

		try {
			const professorService = container.resolve(ProfessorService);
			await professorService.deleteById(id);

			/*  
        #swagger.responses[204] = {
            description: "",
        }   
      */
			response.status(HttpStatusEnum.NO_CONTENT).send();
		} catch (e: any) {
			/*  
        #swagger.responses[400] = {
            content: {
              "application/json": {
                schema:{
                    $ref: "#/components/schemas/Error"
                }
              }           
            }
        }   
      */
			response.status(HttpStatusEnum.BAD_REQUEST).json(new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e));
		}
	}
}
