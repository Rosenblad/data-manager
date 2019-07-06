import { Transformer } from '../transform';

const transform = jest
  .fn()
  .mockImplementation((transformer: Transformer, data: unknown) => {
    return transformer(data);
  });

export default transform;
