export interface Writer<T> {
  create(item: Partial<T>): Promise<T>;
  update(args: UpdateArgs<T>): Promise<void>;
  delete(args: DeleteArgs<T>): Promise<void>;
}

export interface Reader<T> {
  find(args?: FindArgs<T>): Promise<T[]>;
  findOne(args: FindOneArgs<T>): Promise<T>;
  findFirst(args: FindFirstArgs<T>): Promise<T>;
  exist(args: ExistArgs<T>): Promise<boolean>;
}

export type Repository<T> = Writer<T> & Reader<T>;

export type WhereUniqueInput = {
  id?: number;
};

export type UpdateArgs<T> = {
  data: Partial<T>;
  where: WhereUniqueInput;
};

export type DeleteArgs<T> = {
  where: WhereUniqueInput;
};

export type FindArgs<T> = {
  where?: Partial<T>;
};

export type FindOneArgs<T> = {
  where: WhereUniqueInput;
};

export type FindFirstArgs<T> = {
  where: Partial<T>;
};

export type ExistArgs<T> = {
  where: Partial<T>;
};
