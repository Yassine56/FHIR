import BaseEntity from "../models/BaseEntity";
import IGenericRepository from "./IGenericRepository";
import GenericRepository from "./GenericRepository";
import { FhirAuth } from "../models";

function buildRepository<T extends BaseEntity>(tableName: string): IGenericRepository<T> {
  return new GenericRepository<T>(tableName);
}

export default {
  buildFhirAuthRepository: () => buildRepository<FhirAuth>("fhirauth"),
};
