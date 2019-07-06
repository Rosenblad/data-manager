export default function parseUrl(url: string): URL {
  if (url) {
    try {
      return new URL(url);
    } catch {
      throw new Error('Failed to parse url');
    }
  }

  throw new Error('url is required');
}
