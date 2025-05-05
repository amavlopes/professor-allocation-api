import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ErrorResponse } from '../models/error-response';
import { HttpStatusEnum } from '../enums/http-status';
import { CourseService } from '../services/course-service';

export class CourseController {
	static async create(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Course']
			#swagger.description = 'Creates a course'
    */

		/*  #swagger.requestBody = {
      required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CourseRequest"
            }  
          }
        }
      } 
    */
		const name = request.body.name as string;

		try {
			const courseService = container.resolve(CourseService);
			const course = await courseService.create({ name });

			/*  
        #swagger.responses[201] = {
            content: {
              "application/json": {
                schema:{
                    $ref: "#/components/schemas/CourseResponse"
                }
              }           
            }
        }   
      */
			response.status(HttpStatusEnum.CREATED).json({ course });
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
      #swagger.tags = ['Course']
      #swagger.description = 'Finds all courses'
    */

		const name = request.query.name as string;

		const courseService = container.resolve(CourseService);
		const courses = await courseService.findAll(name);

		/*  
      #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                  $ref: "#/components/schemas/CourseListResponse"
              }
            }           
          }
      }   
    */
		response.status(HttpStatusEnum.OK).json({ courses });
	}

	static async findById(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Course']
      #swagger.description = 'Finds a course by its id'
    */

		const { course_id } = request.params;
		const id = Number(course_id);

		const courseService = container.resolve(CourseService);
		const course = await courseService.findById(id);

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
                  $ref: "#/components/schemas/CourseResponse"
              }
            }           
          }
      }   
    */
		if (!course) response.status(HttpStatusEnum.NOT_FOUND).send();
		else response.status(HttpStatusEnum.OK).json({ course });
	}

	static async update(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Course']
      #swagger.description = 'Updates a course'
    */

		/*  #swagger.requestBody = {
      required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CourseRequest"
            }  
          }
        }
      } 
    */
		const { course_id } = request.params;
		const id = Number(course_id);
		const name = request.body.name as string;

		try {
			const courseService = container.resolve(CourseService);
			const course = await courseService.update({ id, name });

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
                    $ref: "#/components/schemas/CourseResponse"
                }
              }           
            }
        }   
      */
			if (!course) response.status(HttpStatusEnum.NOT_FOUND).send();
			else response.status(HttpStatusEnum.OK).json({ course });
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
      #swagger.tags = ['Course']
      #swagger.description = 'Deletes all courses in batch'
    */

		const { ids } = request.query;
		const arrayIds: number[] = (ids as string)?.split(',').map((id) => Number(id));

		const courseService = container.resolve(CourseService);
		await courseService.deleteAll(arrayIds);

		/*  
      #swagger.responses[204] = {
          description: "",
      }   
    */
		response.status(HttpStatusEnum.NO_CONTENT).send();
	}

	static async deleteById(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Course']
      #swagger.description = 'Deletes a course by its id'
    */

		const { course_id } = request.params;
		const id = Number(course_id);

		try {
			const courseService = container.resolve(CourseService);
			await courseService.deleteById(id);

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
