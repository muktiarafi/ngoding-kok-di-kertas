import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducers } from "../redux/reducers";
import "../styles/tailwind.css";
import "../styles/style.css";

const AppComponent = ({ Component, pageProps }) => {
  const store = createStore(reducers);
  return (
    <Provider store={store}>
      <div className="bg-gray-800 p-8 h-screen">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
};

export default AppComponent;
