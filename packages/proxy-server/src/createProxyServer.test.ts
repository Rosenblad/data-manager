import http from 'http';

import test from '../test';

import makeRequest from './makeRequest';
import createCache from './cache';
import transform, { Transformer } from './transform';
import createProxyServer from './createProxyServer';

jest.mock('./makeRequest');
jest.mock('./cache');
jest.mock('./transform');

describe('createProxyServer', () => {
  let server: http.Server;
  let cache: ReturnType<typeof createCache>;
  const route = 'http://localhost:3010/api/proxy/get';
  const mockApiRoute = 'http://example.com/';
  const routeWithQuery = `${route}?url=${mockApiRoute}`;

  function startProxyServer(transformer?: Transformer) {
    const proxy = createProxyServer(transformer);
    server = proxy.server;
    cache = proxy.cache;
  }

  afterEach(() => {
    server.close();
  });

  it('responds with error if no url was provided', (done) => {
    startProxyServer();

    http.get(route, (res) => {
      const { statusCode } = res;
      expect(statusCode).toBe(400);

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        expect(chunk).toBe('url is required');
      });

      res.on('end', () => {
        done();
      });
    });
  });

  it('works', (done) => {
    startProxyServer();

    http.get(routeWithQuery, (res) => {
      const { statusCode } = res;
      expect(statusCode).toBe(200);
      expect(makeRequest).toHaveBeenCalledWith(new URL(mockApiRoute));

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        expect(chunk).toBe(JSON.stringify(test.mockData));
      });

      res.on('end', () => {
        done();
      });
    });
  });

  it('transforms responses if a transformer is provided', (done) => {
    const transformer = jest.fn().mockReturnValue('hello');
    startProxyServer(transformer);

    http.get(routeWithQuery, (res) => {
      expect(res.statusCode).toBe(200);

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        expect(transform).toHaveBeenCalledWith(
          transformer,
          test.mockData,
        );

        expect(chunk).toBe('hello');
      });

      res.on('end', () => {
        done();
      })
    })
  });

  describe('caching', () => {
    it('caches request results', (done) => {
      startProxyServer();

      http.get(routeWithQuery, (res) => {
        const { statusCode } = res;
        expect(statusCode).toBe(200);

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          expect(cache.set).toHaveBeenCalledWith(mockApiRoute, JSON.parse(chunk));
        });

        res.on('end', () => {
          done();
        });
      });
    });

    it('returns cached request results', (done) => {
      startProxyServer();
      cache.set(mockApiRoute, test.mockData);

      http.get(routeWithQuery, (res) => {
        expect(res.statusCode).toBe(304);

        res.on('data', (chunk) => {
          expect(chunk).toBe(test.mockData);
        });

        res.on('end', done);
      });
    });
  });

  it('catches errors from makeRequest', (done) => {
    startProxyServer();

    (makeRequest as any).mockRejectedValueOnce(new Error('error'));

    http.get(routeWithQuery, (res) => {
      const { statusCode } = res;
      expect(statusCode).toBe(500);

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        expect(chunk).toBe('Failed to make request: error');
      });

      res.on('end', () => {
        done();
      });
    });
  });

  it('catches errors in makeRequest.then', (done) => {
    startProxyServer();

    (cache.set as any).mockImplementationOnce(() => {
      throw new Error('error');
    });

    http.get(routeWithQuery, (res) => {
      const { statusCode } = res;
      expect(statusCode).toBe(500);

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        expect(chunk).toBe('Failed to handle response: error');
      });

      res.on('end', () => {
        done();
      });
    });
  });
});
