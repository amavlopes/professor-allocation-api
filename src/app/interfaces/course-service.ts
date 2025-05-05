import ICourse from './course';

export default interface ICourseService {
	create(course: ICourse): Promise<ICourse>;
	findAll(name: string): Promise<ICourse[]>;
	findById(id: number): Promise<ICourse>;
	update(course: ICourse): Promise<ICourse | null>;
	deleteAll(ids?: number[]): Promise<void>;
	deleteById(id: number): Promise<void>;
}
