export interface IRepository<T> {
	create(model: T): Promise<T>;
	findAll(): Promise<T[]>;
	findAllByName(query: string): Promise<T[]>;
	findById(id: number): Promise<T>;
	update(model: T): Promise<T | null>;
	deleteAll(): Promise<void>;
	deleteAllByIds(ids: number[]): Promise<void>;
	deleteById(id: number): Promise<void>;
}
