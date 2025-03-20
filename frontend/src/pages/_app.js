import { store } from "@/redux/store";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
        <Toaster position="top-right" />
    </Provider>
  );
}
