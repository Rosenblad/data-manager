import https from 'https';

export default function makeRequest(url: URL): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url.href,
      (res): void => {
        res.on('data', (data) => {
          resolve(JSON.parse(data.toString()));
        })
      }
    );

    request.on('error', (error) => {
      reject(error);
    });
  });
}