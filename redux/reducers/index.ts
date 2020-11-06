import { combineReducers } from "redux";
import { configReducers } from "./config";
import { imageConfig } from "../../utils/default-config";

export interface StoreState {
  config: imageConfig;
}

export const reducers = combineReducers<StoreState>({
  config: configReducers,
});
