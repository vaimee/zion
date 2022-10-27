import { promisify } from 'util';

import { Injectable } from '@nestjs/common';
import * as MDNS from 'multicast-dns';

import { ConfigService } from '../config/config.service';

@Injectable()
export class MulticastDnsService {
  private mdnsServer?: MDNS.MulticastDNS;

  public constructor(private readonly config: ConfigService) {}

  public async start() {
    if (this.mdnsServer) {
      return;
    }

    const server = MDNS();
    server.on('query', (query) => {
      const question = query.questions.find((question) => question.name === '_directory._sub._wot');
      if (question) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        server.respond({
          answers: [
            {
              name: '_directory._sub._wot',
              type: 'PTR',
              data: `${this.config.introduction.mdns.name}._wot`,
            },
          ],
          additionals: [
            {
              name: `${this.config.introduction.mdns.name}._wot`,
              type: 'SRV',
              data: {
                port: this.config.app.port,
                target: this.config.app.host,
              },
            },
            {
              name: `${this.config.introduction.mdns.name}._wot`,
              type: 'TXT',
              data: [`td=${this.config.introduction.mdns.toPath}`, 'type=Directory', 'tls=1'],
            },
          ],
        });
      }
    });

    await new Promise((resolve, reject) => {
      server.once('ready', resolve);
      server.once('error', reject);
    });

    this.mdnsServer = server;
  }

  public async stop() {
    if (!this.mdnsServer) {
      throw new Error('Multicast DNS Service not started');
    }
    await promisify(this.mdnsServer.destroy)();
    this.mdnsServer = undefined;
  }
}
