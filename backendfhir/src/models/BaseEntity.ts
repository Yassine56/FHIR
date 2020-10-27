export default class BaseEntity {
  public id: number;
  public created_at?: Date;

  constructor(entityValues: Partial<BaseEntity>) {
    Object.assign(this, entityValues);
  }
}
