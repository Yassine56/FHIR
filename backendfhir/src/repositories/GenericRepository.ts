import db from "../knex";
import { DatabaseError } from "../errors/general.errors";
import BaseEntity from "../models/BaseEntity";
import IGenericRepository from "./IGenericRepository";

export default class GenericRepository<T extends BaseEntity> implements IGenericRepository<T> {
  constructor(protected readonly _tableName: string) {}

  public async create(entity: T): Promise<T> {
    try {
      const [instance] = await db(this._tableName).returning("*").insert(entity);
      return instance;
    } catch (err) {
      console.log("instance", err);
      throw new DatabaseError();
    }
  }

  public async update(id: number, update: Partial<T>): Promise<T> {
    try {
      const [instance] = await db(this._tableName).returning("*").where({ id }).update(update);
      return instance;
    } catch (err) {
      console.log("error", err);
      throw new DatabaseError();
    }
  }

  public async updateByQuery(query: Partial<T>, update: Partial<T>): Promise<T[]> {
    try {
      const [instances] = await db(this._tableName).returning("*").where(query).update(update);
      return instances;
    } catch (err) {
      throw new DatabaseError();
    }
  }

  public async findById(id: number, selectedFields: string[] = []): Promise<T> {
    try {
      const [instance] = await db(this._tableName).returning("*").select(selectedFields).where({ id });
      return instance ? instance : {};
    } catch (err) {
      throw new DatabaseError();
    }
  }

  public async find(query: Partial<T>, selectedFields: string[] = []): Promise<T[]> {
    try {
      const instances = await db(this._tableName).returning("*").select(selectedFields).where(query);
      return instances;
    } catch (err) {
      console.log("err", err);
      throw new DatabaseError();
    }
  }

  public async removeById(id: number): Promise<T> {
    try {
      const [instance] = await db(this._tableName).returning("*").where({ id }).del();
      return instance;
    } catch (err) {
      throw new DatabaseError();
    }
  }

  public async executeRaw<R>(query: string, params: any[]): Promise<R[]> {
    try {
      let records = await db.raw(query, params);
      return records.rows as R[];
    } catch (err) {
      throw new DatabaseError();
    }
  }
}
