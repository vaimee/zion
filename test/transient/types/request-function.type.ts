import { AxiosResponse } from 'axios';

export type RequestFunction = RequestPost | RequestGenericFunction;
type RequestPost = () => Promise<AxiosResponse>;
type RequestGenericFunction = (url: string) => Promise<AxiosResponse>;
