export interface IRepository<REQUEST_TYPE, RESPONSE_TYPE> {
	create(model: REQUEST_TYPE): Promise<RESPONSE_TYPE>;
	findAll(...args: any[]): Promise<RESPONSE_TYPE[]>;
	findById(id: number): Promise<RESPONSE_TYPE>;
	update(model: REQUEST_TYPE): Promise<RESPONSE_TYPE>;
	deleteAll(): Promise<void>;
	deleteAllByIds(ids: number[]): Promise<void>;
	deleteById(id: number): Promise<void>;
}
