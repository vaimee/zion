import axios, { AxiosResponse } from 'axios';

import { getUniqueEmail } from '../utils/data';
import { asyncAppendFile } from '../utils/file-manager';
import { randomInt } from '../utils/random';
import * as validAnonymousThingDescription from '../utils/tds/validAnonymous.td.json';
import { RequestMode } from './request-mode';
import { requestFunction } from './types/request-function.type';

export class PoollingRequest {
  private defaultAccessToken: string | undefined;
  private totalIssues = 0;
  private url: string;

  public constructor(url = `http://localhost:3000`) {
    this.url = url;
  }

  private async initialize() {
    await this.authenticate();
    const thingLocation = await this.createThing();
    return thingLocation;
  }

  public async startShortPoolling(poolingInterval = 1000) {
    console.log(`Initializing...`);
    const thingLocation = await this.initialize();
    setInterval(async () => {
      await this.makeRequest('GET', thingLocation);
    }, poolingInterval);
  }

  public async startInactivityMode(mode: string, inactivityTimeInMinutes: number, verbose = true) {
    console.log(`Initializing...`);
    const thingLocation = await this.initialize();
    console.log(`waiting for ${inactivityTimeInMinutes}m`);
    for (let i = 0; i < inactivityTimeInMinutes; i++) {
      await this.sleep(1000 * 60);
      if (verbose) console.log(`${i + 1} minutes passed - ${((i + 1) / inactivityTimeInMinutes) * 100}%`);
    }
    await this.makeRequest(mode, thingLocation);
  }

  private async authenticate() {
    const email = getUniqueEmail();
    const user = {
      email,
      password: 'test123',
    };
    console.log(`creating unique user ${user.email}`);
    const { data } = await axios.post(`${this.url}/auth/register`, user);
    if (!data.accessToken) throw new Error('Error creating user');
    console.log(`user created sucessfully! Access Token: ${data.accessToken}`);
    this.defaultAccessToken = data.accessToken;
  }

  private async createThing(): Promise<string> {
    const { status, headers } = await this.request[RequestMode.POST]();
    if (status !== 201) throw new Error('could not create Thing');
    console.log(`created thing sucesfully at ${headers.location}`);
    return headers.location;
  }

  private async makeRequest(mode: string, url: string) {
    console.log(`Performing a ${mode} request at ${url}...`);
    const retrieveResponse = await this.request[mode](url); //axios.get(url);
    if (retrieveResponse.status > 300) return this.errorHandler(retrieveResponse);
    const date = new Date();
    console.log(
      `[${date.toLocaleString()}] Sucessfully retrieved TD - status ${retrieveResponse.status} - issues ${
        this.totalIssues
      }`,
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private errorHandler(retrieveResponse: AxiosResponse) {
    if (retrieveResponse.status === 401) {
      console.log('Authorization error - we do not care about those errors...');
      return this.authenticate();
    }
    const date = new Date();
    console.log(`**************************************************************************************`);
    console.error(`[${date.toLocaleString()}] new error - we got a ${retrieveResponse.status} error`);
    console.error(retrieveResponse.data);
    console.log(`**************************************************************************************`);
    this.totalIssues++;
    const dataLog = `${Date.now()};${retrieveResponse.status};${JSON.stringify(retrieveResponse.data)}\n`;
    asyncAppendFile('error.log', dataLog);
  }

  private request: { [key: string]: requestFunction } = {
    GET: async (url: string): Promise<AxiosResponse> => await axios.get(url),
    POST: async (): Promise<AxiosResponse> =>
      await axios.post(`${this.url}/things`, validAnonymousThingDescription, {
        headers: { Authorization: `Bearer ${this.defaultAccessToken}` },
      }),
    PUT: async (url: string): Promise<AxiosResponse> => {
      const updatedThingDescription = { ...validAnonymousThingDescription, newField: randomInt() };
      return await axios.put(url, updatedThingDescription, {
        headers: { Authorization: `Bearer ${this.defaultAccessToken}` },
      });
    },
    RANDOM: async (url: string): Promise<AxiosResponse> => {
      const keys = Object.keys(this.request);
      const randomPosition = randomInt(0, keys.length);
      const randomKey = keys[randomPosition];
      console.log(`RANDOM choise is ${randomKey}`);
      return await this.request[randomKey](url);
    },
  };
}
