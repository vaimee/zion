import { AxiosResponse } from 'axios';

export type requestFunction = (url?: string) => Promise<AxiosResponse>;
