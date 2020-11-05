import "../styles/tailwind.css";
import "../styles/style.css";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <div className="bg-gray-800 p-8 h-screen">
      <Component {...pageProps} />
    </div>
  );
};

export default AppComponent;
