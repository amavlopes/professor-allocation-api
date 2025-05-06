import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ErrorResponse } from '../models/error-response';
import { HttpStatusEnum } from '../enums/http-status';
import { DepartmentService } from '../services/department-service';

export class DepartmentController {
	static async create(request: Request, response: Response): Promise<void> {
		/*
			#swagger.tags = ['Department']
			#swagger.description = 'Creates a department'
		*/

		/*  #swagger.requestBody = {
			required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/DepartmentRequest"
						}  
					}
				}
			} 
		*/
		const name = request.body.name as string;

		try {
			const departmentService = container.resolve(DepartmentService);
			const department = await departmentService.create({ name });

			/*  
				#swagger.responses[201] = {
						content: {
							"application/json": {
								schema:{
										$ref: "#/components/schemas/DepartmentCreateResponse"
								}
							}           
						}
				}   
			*/
			response.status(HttpStatusEnum.CREATED).json({ department });
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
			#swagger.tags = ['Department']
			#swagger.description = 'Finds all departments or finds departments that contains a name if a query parameter name is defined'
		*/

		const name = request.query.name as string;
		/*  
			#swagger.parameters['name'] = {
				in: 'query',
				description: '',
				type: 'string',
				example: 'ciências humanas'
			} 
		*/

		const departmentService = container.resolve(DepartmentService);
		const departments = await departmentService.findAll(name);

		/*  
			#swagger.responses[200] = {
					description: "",
					content: {
						"application/json": {
							schema:{
									$ref: "#/components/schemas/DepartmentListResponse"
							}
						}           
					}
			}   
		*/
		response.status(HttpStatusEnum.OK).json({ departments });
	}

	static async findById(request: Request, response: Response): Promise<void> {
		/*
			#swagger.tags = ['Department']
			#swagger.description = 'Finds a department by its id'
		*/

		const { department_id } = request.params;
		const id = Number(department_id);
		/*  
			#swagger.parameters['department_id'] = {
				in: 'path',
				description: '',
				type: 'number',
				example: 1
			} 
		*/

		const departmentService = container.resolve(DepartmentService);
		const department = await departmentService.findById(id);

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
									$ref: "#/components/schemas/DepartmentResponse"
							}
						}           
					}
			}   
		*/
		if (!department) response.status(HttpStatusEnum.NOT_FOUND).send();
		else response.status(HttpStatusEnum.OK).json({ department });
	}

	static async update(request: Request, response: Response): Promise<void> {
		/*
			#swagger.tags = ['Department']
			#swagger.description = 'Updates a department by its id'
		*/

		/*  #swagger.requestBody = {
			required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/DepartmentRequest"
						}  
					}
				}
			} 
		*/
		const { department_id } = request.params;
		const id = Number(department_id);
		/*  
			#swagger.parameters['department_id'] = {
				in: 'path',
				description: '',
				type: 'number',
				example: 1
			} 
		*/

		const name = request.body.name as string;

		try {
			const departmentService = container.resolve(DepartmentService);
			const department = await departmentService.update({ id, name });

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
										$ref: "#/components/schemas/DepartmentResponse"
								}
							}           
						}
				}   
			*/
			if (!department) response.status(HttpStatusEnum.NOT_FOUND).send();
			else response.status(HttpStatusEnum.OK).json({ department });
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
			#swagger.tags = ['Department']
			#swagger.description = 'Deletes all departments or deletes departments by its ids if a comma separated id list is provided'
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

		const departmentService = container.resolve(DepartmentService);
		await departmentService.deleteAll(arrayIds);

		/*  
			#swagger.responses[204] = {
					description: "",
			}   
		*/
		response.status(HttpStatusEnum.NO_CONTENT).send();
	}

	static async deleteById(request: Request, response: Response): Promise<void> {
		/*
			#swagger.tags = ['Department']
			#swagger.description = 'Deletes a department by its id'
		*/

		const { department_id } = request.params;
		const id = Number(department_id);
		/*  
			#swagger.parameters['department_id'] = {
				in: 'path',
				description: '',
				type: 'number',
				example: 1
			} 
		*/

		try {
			const departmentService = container.resolve(DepartmentService);
			await departmentService.deleteById(id);

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
