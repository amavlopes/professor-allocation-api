export interface IService<REQUEST_TYPE, RESPONSE_TYPE> {
	create(model: REQUEST_TYPE): Promise<RESPONSE_TYPE>;
	findAll(name: string): Promise<RESPONSE_TYPE[]>;
	findById(id: number): Promise<RESPONSE_TYPE>;
	update(model: REQUEST_TYPE): Promise<RESPONSE_TYPE | null>;
	deleteAll(ids?: number[]): Promise<void>;
	deleteById(id: number): Promise<void>;
}
