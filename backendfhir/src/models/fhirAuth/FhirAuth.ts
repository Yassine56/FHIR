import BaseEntity from "../BaseEntity";

export default class FhirAuth extends BaseEntity {
  public code?: string;
  public refresh_token?: string;
  public access_token?: string;
  public token_type?: string;
  public expires_in?: number;
  public scope?: string;

  constructor(entityValues: Partial<FhirAuth>) {
    super(entityValues);
    Object.assign(this, entityValues);
  }
}
