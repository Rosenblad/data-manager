export interface ParamsFieldValue {
  key: string;
  value: string;
}

export type FieldNames = keyof ParamsFieldValue;

export type ChangeSet = { key: keyof ParamsFieldValue; value: string };