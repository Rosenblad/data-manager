const mockData = {
  "hello": "world",
};

type MockEvent = 'data' | 'error';

function createMockOn(
  callEvent: MockEvent,
  listenerArg: any,
) {
  return jest
    .fn()
    .mockImplementation((
      event: MockEvent,
      listener: (arg: any) => void
    ) => {
      if (callEvent === event) {
        listener(listenerArg);
      }
    });
}

function createMockStream(mockOn: ReturnType<typeof createMockOn>) {
  return { on: mockOn };
}

export default {
  createMockOn,
  createMockStream,
  mockData,
}