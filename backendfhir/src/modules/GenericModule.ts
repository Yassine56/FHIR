import IGenericRepository from "../repositories/IGenericRepository";
import { AppError } from "../errors/general.errors";
import BaseEntity from "../models/BaseEntity";

export default abstract class GenericModule<T extends BaseEntity> {
  protected readonly _repository: IGenericRepository<T>;

  constructor(repository: IGenericRepository<T>) {
    this._repository = repository;
  }

  async fetchAll(): Promise<T[]> {
    const instances = await this._repository.find({});
    if (!instances) {
      throw new AppError(`Unable to find records`);
    }

    return instances;
  }

  async fetchById(id: number): Promise<T> {
    const instance = await this._repository.findById(id);

    if (!instance) {
      throw new AppError(`Unable to find record with id: ${id}`);
    }

    return instance;
  }

  async fetchByQuery(query: Partial<T>, selectedFields?: string[]) {
    return this._repository.find(query, selectedFields);
  }

  async add(instance: T): Promise<T> {
    const addedInstance = await this._repository.create(instance);
    if (!addedInstance) {
      throw new AppError("Unable to add for unknown reason.");
    }

    return addedInstance;
  }

  public async update(id: number, instance: Partial<T>): Promise<T> {
    const updatedIntance = await this._repository.update(id, instance);
    if (!updatedIntance) {
      throw new AppError(` Unable to update record where id: ${id} `);
    }
    return updatedIntance;
  }
}
