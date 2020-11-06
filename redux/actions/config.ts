import { ActionTypes } from "./type";
import { imageConfig } from "../../utils/default-config";

export interface ChangeConfigAction {
  type: ActionTypes.changeConfig;
  payload: imageConfig;
}

export const changeConfig = (imgConfig: imageConfig): ChangeConfigAction => {
  return {
    type: ActionTypes.changeConfig,
    payload: imgConfig,
  };
};
