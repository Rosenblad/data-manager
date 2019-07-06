import parseUrl from "./parseUrl";

describe("parseUrl", () => {
  it("works", () => {
    expect(parseUrl("https://example.com/query?page=2")).toBeInstanceOf(URL);
  });

  it("throws if no url was provided", () => {
    const lie = undefined as unknown as string;
    expect(() => parseUrl(lie)).toThrow();
  });

  it('throws if an invalid url is provided', () => {
    const invalidUrl = 'jasmksd';
    expect(() => parseUrl(invalidUrl)).toThrow();
  });
});
