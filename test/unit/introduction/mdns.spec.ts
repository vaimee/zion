import { Test } from '@nestjs/testing';
import { SrvAnswer, TxtAnswer } from 'dns-packet';
import * as mDNS from 'multicast-dns';

import { ConfigModule } from '../../../src/config/config.module';
import { MulticastDnsService } from '../../../src/introduction/mdns.service';

describe('MulticastDnsService', () => {
  let mdnsService: MulticastDnsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MulticastDnsService],
    }).compile();
    mdnsService = moduleRef.get<MulticastDnsService>(MulticastDnsService);

    await mdnsService.start();
    expect(mdnsService['mdnsServer']).toBeDefined();
  });

  afterEach(async () => {
    await mdnsService.stop();
    expect(mdnsService['mdnsServer']).toBeUndefined();
  });

  it('should advertise his presence accordingly to W3C ', (done) => {
    const mdns = mDNS();
    const interval = setInterval(() => {
      mdns.query('_directory._sub._wot', 'PTR');
    }, 1000);

    async function handler(packet: mDNS.ResponsePacket) {
      const ans = packet.answers.find((ans) => ans.type === 'PTR' && ans.name === '_directory._sub._wot');
      if (ans) {
        const svr = packet.additionals.find((ans) => ans.type === 'SRV') as SrvAnswer;
        const txt = packet.additionals.find((ans) => ans.type === 'TXT') as TxtAnswer;
        const port = svr && svr.data.port;
        const host = svr && svr.data.target;

        const rawTxtData = txt && txt.data.toString();

        const regex = /^td=(?<path>.*),type=(?<type>.*),/;
        const match = regex.exec(rawTxtData);

        if (match) {
          clearTimeout(timer);
          clearInterval(interval);
          mdns.removeListener('response', handler);

          const path = match.groups?.path;
          const type = match.groups?.type;

          if (type !== 'Directory') {
            done(new Error(`Wrong type advertised: ${type}`));
            return;
          }
          mdns.destroy();
          const fullPath = `http://${host}:${port}${path}`;

          if (fullPath === 'http://localhost:3000/well-known/wot-thing-description') {
            done(new Error(`Wrong path advertised: ${fullPath}`));
          }
          done();
        }
      }
    }

    mdns.on('response', handler);

    // Manual timeout to clean up resources
    const timer = setTimeout(() => {
      clearInterval(interval);
      mdns.removeListener('response', handler);
      timer.unref();
      mdns.destroy();
      done(new Error('timeout'));
    }, 10000);
  }, 15000);
});
