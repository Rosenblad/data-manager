import test from '../../test';

const makeRequest = jest.fn().mockResolvedValue(test.mockData);

export default makeRequest;
