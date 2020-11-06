import { changeConfig } from "./config";

import { ChangeConfigAction } from "./config";

export enum ActionTypes {
  changeConfig,
}

export type ConfigAction = ChangeConfigAction;
