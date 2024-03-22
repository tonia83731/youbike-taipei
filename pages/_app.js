import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@/styles/globals.css";
import { registerLocale } from "react-datepicker";
import zhTW from "date-fns/locale/zh-TW";

import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";

import { ToastContextProvider } from "@/context/ToasterContext";

registerLocale("zh-TW", zhTW);

export default function App({ Component, pageProps }) {
  return (
    <ToastContextProvider>
      <div className="container">
        <Header />
        <main className="pt-[140px] lg:pt-[110px] h-full">
          <Component {...pageProps} />
        </main>
        <div className="mt-auto mx-0">
          <Footer />
        </div>
      </div>
    </ToastContextProvider>
  );
}
