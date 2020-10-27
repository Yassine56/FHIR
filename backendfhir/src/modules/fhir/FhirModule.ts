import GenericModule from "../GenericModule";
import { FhirAuth } from "../../models";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import IGenericRepository from "../../repositories/IGenericRepository";
export default class FhirAuthModule extends GenericModule<FhirAuth> {
  constructor(repository: IGenericRepository<FhirAuth> = RepositoryFactory.buildFhirAuthRepository()) {
    super(repository);
  }
}
