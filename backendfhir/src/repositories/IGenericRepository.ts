export default interface IGenericRepository<T> {
  create(entity: T): Promise<T>;
  update(id: number, update: Partial<T>): Promise<T>;
  updateByQuery(query: Partial<T>, update: Partial<T>): Promise<T[]>;
  findById(id: number, selectedFields?: string[]): Promise<T>;
  find(query: Partial<T>, selectedFields?: string[]): Promise<T[]>;
  removeById(id: number): Promise<T>;
  executeRaw<R>(query: string, params: any[]): Promise<R[]>;
}
