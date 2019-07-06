let mockStream: any;
function __setMockStream(newMockStream: any) {
  mockStream = newMockStream;
}

function get(_url: string, cb: (res: any) => void) {
  cb(mockStream);

  return mockStream;
}

export default {
  get,
  __setMockStream,
};
