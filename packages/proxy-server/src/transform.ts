export type Transformer = (data: unknown) => any[] | undefined;

export default function transform(
  transformer: Transformer,
  data: unknown
) {
  return transformer(data);
}
