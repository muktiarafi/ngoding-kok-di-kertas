import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { StoreState } from "../reducers";
import { reducers } from "../reducers";

const makeStore = () => {
  return createStore(reducers);
};

export const wrapper = createWrapper<StoreState>(makeStore);
