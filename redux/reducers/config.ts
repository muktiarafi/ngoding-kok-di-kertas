import { ActionTypes, ConfigAction } from "../actions";
import { imageConfig, defaultConfig } from "../../utils/default-config";

export const configReducers = (
  state: imageConfig = defaultConfig[0],
  action: ConfigAction
) => {
  switch (action.type) {
    case ActionTypes.changeConfig:
      return action.payload;
    default:
      return state;
  }
};
