export interface IService<T> {
	create(model: T): Promise<T>;
	findAll(name: string): Promise<T[]>;
	findById(id: number): Promise<T>;
	update(model: T): Promise<T | null>;
	deleteAll(ids?: number[]): Promise<void>;
	deleteById(id: number): Promise<void>;
}
