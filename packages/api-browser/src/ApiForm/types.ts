import { ParamsFieldValue, ChangeSet, FieldNames } from './ParamsField';

export type ExtendProps<P1, P2> = P1 & Omit<P2, keyof P1>;

export type OnChangeEvent = React.ChangeEvent<{ name: string; value: string }>;

export type OnChange = (name: string, changeSet: ChangeSet | string) => void;

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


export type FormState = {
  url: string;
  params: {
    [key: string]: ParamsFieldValue;
  };
};

export type ApiFormValues = FormState;

export enum ActionTypes {
  Add = 'add',
  Change = 'change',
  Delete = 'delete',
  Submit = 'submit',
  Reinitialize = 'reinitialize',
};

export type ChangePayload = {
  key: string;
  changeSet: ChangeSet | string;
}

export type Actions =
  | { type: ActionTypes.Add, payload: { key: string } }
  | { type: ActionTypes.Change, payload: ChangePayload }
  | { type: ActionTypes.Delete, payload: { key: string } }
  | { type: ActionTypes.Submit }
  | { type: ActionTypes.Reinitialize, payload: FormState };