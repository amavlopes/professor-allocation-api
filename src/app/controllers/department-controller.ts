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
										$ref: "#/components/schemas/DepartmentResponse"
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
			#swagger.description = 'Finds all departments'
		*/

		const name = request.query.name as string;

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
			#swagger.description = 'Updates a department'
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
			#swagger.description = 'Deletes all departments in batch'
		*/

		const { ids } = request.query;
		const arrayIds: number[] = (ids as string)?.split(',').map((id) => Number(id));

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
