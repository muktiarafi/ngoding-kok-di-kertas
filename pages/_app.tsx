import "../styles/tailwind.css";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <div className="bg-gray-800 p-8 h-full">
      <Component {...pageProps} />
    </div>
  );
};

export default AppComponent;
