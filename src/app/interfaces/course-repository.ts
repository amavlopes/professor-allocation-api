import ICourse from './course';

export default interface ICourseRepository {
	create(course: ICourse): Promise<ICourse>;
	findAll(): Promise<ICourse[]>;
	findAllByName(query: string): Promise<ICourse[]>;
	findById(id: number): Promise<ICourse>;
	update(course: ICourse): Promise<ICourse | null>;
	deleteAll(): Promise<void>;
	deleteAllByIds(ids: number[]): Promise<void>;
	deleteById(id: number): Promise<void>;
}
