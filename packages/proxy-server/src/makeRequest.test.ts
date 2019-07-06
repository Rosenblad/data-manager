import https from 'https';

import test from '../test';

import makeRequest from './makeRequest';

const mockHttps = https as unknown as any;

jest.mock('https');

const mockOnData = test.createMockOn('data', '{"mock": "chunk"}');
const mockOnError = test.createMockOn('error', new Error('mock error'));
const dataMockStream = test.createMockStream(mockOnData);
const errorMockStream = test.createMockStream(mockOnError);

describe('makeRequest', () => {
  const url = new URL('https://example.com');

  it('resolves with request response as json', async () => {
    mockHttps.__setMockStream(dataMockStream);
    const data = await makeRequest(url);
    expect(data).toMatchObject({ mock: 'chunk' });
  });

  it('rejects on errors', async () => {
    mockHttps.__setMockStream(errorMockStream);
    try {
      await makeRequest(url);
    } catch (error) {
      expect(error.message).toBe('mock error');
    }
  });
});
