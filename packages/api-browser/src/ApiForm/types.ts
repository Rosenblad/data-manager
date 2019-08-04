import { ParamsFieldValue, ChangeSet, FieldNames } from './ParamsField';

export type ExtendProps<P1, P2> = P1 & Omit<P2, keyof P1>;

export type OnChangeEvent = React.ChangeEvent<{ name: string; value: string }>;

export type OnChange = (changeSet: ChangeSet) => void;

export type Field = {
  readonly name: string;
  readonly value: string;
  readonly dirty: boolean;
  readonly initialValue: string;
};

export type FieldProps = {
  name: FieldNames;
  value: string;
  onChange: (changeSet: ChangeSet) => void;
};

export type Param = ParamsFieldValue;
export type Params = ParamsFieldValue[];

export type FormState = {
  url: string;
  params: Params;
};

export type ApiBrowserValues = FormState;

export enum ActionTypes {
  Change = 'change',
  Delete = 'delete',
  Submit = 'submit',
  Reinitialize = 'reinitialize',
};

export type ChangePayload = {
  changeSet: ChangeSet;
}

export type Actions =
  | { type: ActionTypes.Change, payload: ChangePayload }
  | { type: ActionTypes.Delete, payload: { key: string } }
  | { type: ActionTypes.Submit }
  | { type: ActionTypes.Reinitialize, payload: FormState };