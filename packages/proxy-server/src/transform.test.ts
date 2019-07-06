import transform from './transform';

describe('transform', () => {
  it('works', () => {
    const transformer = jest.fn();
    transform(transformer, {});
    expect(transformer).toHaveBeenCalledWith({});
  });
});
