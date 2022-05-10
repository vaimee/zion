export interface Writer<T> {
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface Reader<T> {
  find(item: Partial<T>): Promise<T[]>;
  findOne(id: string | Partial<T>): Promise<T>;
  exist(id: string | Partial<T>): Promise<boolean>;
}

export type Repository<T> = Writer<T> & Reader<T>;
