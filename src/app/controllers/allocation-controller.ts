import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ErrorResponse } from '../models/error-response';
import { HttpStatusEnum } from '../enums/http-status';
import { AllocationService } from '../services/allocation-service';
import { IAllocationParams } from '../interfaces/allocation-params';

export class AllocationController {
	static async create(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Allocation']
      #swagger.description = 'Creates an allocation'
    */

		/*  #swagger.requestBody = {
      required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AllocationRequest"
            }  
          }
        }
      } 
    */
		const day = request.body.day;
		const startHour = request.body.startHour;
		const endHour = request.body.endHour;
		const courseId = Number(request.body.courseId);
		const professorId = Number(request.body.professorId);

		try {
			const allocationService = container.resolve(AllocationService);
			const allocation = await allocationService.create({ day, startHour, endHour, courseId, professorId });

			/*  
        #swagger.responses[201] = {
            content: {
              "application/json": {
                schema:{
                    $ref: "#/components/schemas/AllocationResponse"
                }
              }           
            }
        }   
      */
			response.status(HttpStatusEnum.CREATED).json({ allocation });
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
      #swagger.tags = ['Allocation']
      #swagger.description = 'Finds all allocations'
    */

		const day = (request.query.day as string) ? Number(request.query.day) : undefined;
		/*  
			#swagger.parameters['day'] = {
				in: 'query',
				description: '',
				type: 'number',
				example: '1'
			} 
		*/
		const courseId = (request.query.courseId as string) ? Number(request.query.courseId) : undefined;
		/*  
			#swagger.parameters['courseId'] = {
				in: 'query',
				description: '',
				type: 'number',
				example: '1'
			} 
		*/

		const professorId = (request.query.professorId as string) ? Number(request.query.professorId) : undefined;
		/*  
			#swagger.parameters['professorId'] = {
				in: 'query',
				description: '',
				type: 'number',
				example: '1'
			} 
		*/

		const parametros: IAllocationParams = {
			day,
			courseId,
			professorId,
		};

		const allocationService = container.resolve(AllocationService);
		const allocations = await allocationService.findAll(parametros);

		/*  
      #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                  $ref: "#/components/schemas/AllocationListResponse"
              }
            }           
          }
      }   
    */
		response.status(HttpStatusEnum.OK).json({ allocations });
	}

	static async findAllByCourse(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Allocation']
      #swagger.description = 'Finds allocations by course id'
    */

		const courseId = Number(request.params.courseId);
		/*  
      #swagger.parameters['courseId'] = {
        in: 'path',
        description: '',
        type: 'number',
        example: 1
      } 
    */

		const allocationService = container.resolve(AllocationService);
		const allocations = await allocationService.findAllByCourse(courseId);

		/*  
      #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                  $ref: "#/components/schemas/AllocationListResponse"
              }
            }           
          }
      }   
    */
		response.status(HttpStatusEnum.OK).json({ allocations });
	}

	static async findAllByProfessor(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Allocation']
      #swagger.description = 'Finds allocations by professor id'
    */

		const professorId = Number(request.params.professorId);
		/*  
      #swagger.parameters['professorId'] = {
        in: 'path',
        description: '',
        type: 'number',
        example: 1
      } 
    */

		const allocationService = container.resolve(AllocationService);
		const allocations = await allocationService.findAllByProfessor(professorId);

		/*  
      #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                  $ref: "#/components/schemas/AllocationListResponse"
              }
            }           
          }
      }   
    */
		response.status(HttpStatusEnum.OK).json({ allocations });
	}

	static async findById(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Allocation']
      #swagger.description = 'Finds an allocation by its id'
    */

		const { allocationId } = request.params;
		const id = Number(allocationId);
		/*  
      #swagger.parameters['allocationId'] = {
        in: 'path',
        description: '',
        type: 'number',
        example: 1
      } 
    */

		const allocationService = container.resolve(AllocationService);
		const allocation = await allocationService.findById(id);

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
                  $ref: "#/components/schemas/AllocationResponse"
              }
            }           
          }
      }   
    */
		if (!allocation) response.status(HttpStatusEnum.NOT_FOUND).send();
		else response.status(HttpStatusEnum.OK).json({ allocation });
	}

	static async update(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Allocation']
      #swagger.description = 'Updates an allocation'
    */

		/*  #swagger.requestBody = {
      required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AllocationUpdateRequest"
            }  
          }
        }
      } 
    */
		const id = Number(request.params.allocationId);
		/*  
      #swagger.parameters['allocationId'] = {
        in: 'path',
        description: '',
        type: 'number',
        example: 1
      } 
    */

		const day = request.body.day;
		const startHour = request.body.startHour;
		const endHour = request.body.endHour;
		let courseId = request.body.courseId;
		if (courseId) courseId = Number(request.body.courseId);
		let professorId = request.body.professorId;
		if (professorId) professorId = Number(request.body.professorId);

		try {
			const allocationService = container.resolve(AllocationService);
			const allocation = await allocationService.update({ id, day, startHour, endHour, courseId, professorId });

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
                    $ref: "#/components/schemas/AllocationResponse"
                }
              }           
            }
        }   
      */
			if (!allocation) response.status(HttpStatusEnum.NOT_FOUND).send();
			else response.status(HttpStatusEnum.OK).json({ allocation });
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
      #swagger.tags = ['Allocation']
      #swagger.description = 'Deletes all allocations or deletes allocations by its ids if a comma separated id list is provided'
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

		const allocationService = container.resolve(AllocationService);
		await allocationService.deleteAll(arrayIds);

		/*  
      #swagger.responses[204] = {
          description: "",
      }   
    */
		response.status(HttpStatusEnum.NO_CONTENT).send();
	}

	static async deleteById(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Allocation']
      #swagger.description = 'Deletes an allocation by its id'
    */

		const { allocationId } = request.params;
		const id = Number(allocationId);
		/*  
      #swagger.parameters['allocationId'] = {
        in: 'path',
        description: '',
        type: 'number',
        example: 1
      } 
    */

		try {
			const allocationService = container.resolve(AllocationService);
			await allocationService.deleteById(id);

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
