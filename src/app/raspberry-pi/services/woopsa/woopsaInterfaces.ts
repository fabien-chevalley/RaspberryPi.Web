import { WoopsaValueType } from './woopsaType';

export interface IWoopsaValue {
  asText: string;
  type: WoopsaValueType;
  timestamp: number;
}

export interface IWoopsaElement {
  owner: IWoopsaContainer;
  name: string;
}

export interface IWoopsaContainer extends IWoopsaElement {
  items: Iterable<IWoopsaContainer>;
}

export interface IWoopsaProperty extends IWoopsaElement {
  isReadOnly: boolean;
  type: WoopsaValueType;
  getValue(): Promise<IWoopsaValue>;
  setValue(value: IWoopsaValue);
}

export interface IWoopsaMethodArgumentInfo {
  name: string;
  type: WoopsaValueType;
}

export interface IWoopsaMethod extends IWoopsaElement {
  invoke(args: IWoopsaValue[]): IWoopsaValue;
  returnType: WoopsaValueType;
  argumentInfos: Iterable<IWoopsaMethodArgumentInfo>;
}

export interface IWoopsaObject extends IWoopsaContainer {
  properties: Iterable<IWoopsaProperty>;
  methods: Iterable<IWoopsaMethod>;
}