export interface Writer<T> {
  create(item: T): Promise<T>;
  update(id: number, item: Partial<T>): Promise<void>;
  delete(id: number): Promise<void>;
}

export interface Reader<T> {
  find(item: Partial<T>): Promise<T[]>;
  findOne(id: number | Partial<T>): Promise<T>;
  exist(id: number | Partial<T>): Promise<boolean>;
}

export type Repository<T> = Writer<T> & Reader<T>;
