import express from "express";
import cors from "cors";
import http from 'http';

import makeRequest from "./makeRequest";
import parseUrl from "./parseUrl";
import transform, { Transformer } from "./transform";
import createCache from "./cache";

interface CreateProxyServer {
  server: http.Server;
  cache: ReturnType<typeof createCache>;
}

export default function createProxyServer(
  transformer?: Transformer
): CreateProxyServer {
  const app = express();
  const cache = createCache();

  app.use(cors());

  app.get("/api/proxy/get", (req, res) => {
    const { url: providedUrl } = req.query;

    try {
      const url = parseUrl(providedUrl);
      const responseInCache = cache.get(url.href);

      if (responseInCache) {
        res.status(304).send(responseInCache);
        return;
      }

      makeRequest(url)
        .then(response => {
          try {
            const result = transformer
              ? transform(transformer, response)
              : response;
            cache.set(url.href, result);
            res.status(200).send(result);
            return;
          } catch (error) {
            res.status(500).send(`Failed to handle response: ${error.message}`);
          }
        })
        .catch(error => {
          res.status(500).send(`Failed to make request: ${error.message}`);
        });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  const server =  app.listen(3010, () => {
    console.log('Proxy server started on http://localhost:3010');
  });

  return { server, cache };
}
